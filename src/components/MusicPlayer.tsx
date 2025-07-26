import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Volume1 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
  const animationRef = useRef<number>();
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize audio context
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyserNode = context.createAnalyser();
    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;
    const data = new Uint8Array(bufferLength);
    
    setAudioContext(context);
    setAnalyser(analyserNode);
    setDataArray(data);

    // Set up audio element
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
      audioRef.current.muted = false;
    }

    return () => {
      if (context) {
        context.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && audioContext && analyser && dataArray) {
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    }
  }, [audioContext, analyser, dataArray]);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (audioContext?.state === 'suspended') {
        await audioContext.resume();
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleVolumeSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, x / rect.width));
    handleVolumeChange(newVolume);
  };

  const handleVolumeSliderDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const rect = volumeSliderRef.current?.getBoundingClientRect();
      if (rect) {
        const x = moveEvent.clientX - rect.left;
        const newVolume = Math.max(0, Math.min(1, x / rect.width));
        handleVolumeChange(newVolume);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const animateWaveform = () => {
    if (!analyser || !dataArray) return;

    analyser.getByteFrequencyData(dataArray);
    animationRef.current = requestAnimationFrame(animateWaveform);
  };

  useEffect(() => {
    if (isPlaying) {
      animateWaveform();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying]);

  const getWaveformHeight = (index: number) => {
    if (!dataArray || isMuted) return 2;
    const value = dataArray[index] || 0;
    return Math.max(2, (value / 255) * 24);
  };

  return (
    <>
      <audio ref={audioRef} src="/music1.mp3" preload="metadata" />
      
      <motion.div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Main Button */}
        <Button
          onClick={togglePlay}
          variant="primary"
          size="sm"
          className="relative h-10 w-10 rounded-full music-player-glass transition-all duration-300 group-hover:scale-105"
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Music className="w-4 h-4 text-primary" />
                
                {/* Animated Ripple Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Music className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Waveform Visualizer */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-full ml-4 top-1/2 -translate-y-1/2 music-player-glass rounded-2xl p-4 min-w-[200px]"
            >
              <div className="flex flex-col space-y-3">
                {/* Waveform Bars */}
                <div className="flex items-end justify-center space-x-1 h-8">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-1.5 waveform-bar rounded-full"
                      animate={{
                        height: getWaveformHeight(index),
                      }}
                      transition={{ duration: 0.05 }}
                    />
                  ))}
                </div>

                {/* Volume Controls */}
                <div className="flex items-center space-x-3">
                  {/* Mute Toggle */}
                  <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full glass hover:bg-white/5 transition-all duration-200"
                  >
                    <AnimatePresence mode="wait">
                      {isMuted ? (
                        <motion.div
                          key="muted"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <VolumeX className="w-3 h-3 text-muted-foreground" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="unmuted"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Volume2 className="w-3 h-3 text-primary" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>

                  {/* Volume Slider */}
                  <div 
                    ref={volumeSliderRef}
                    className="flex-1 relative cursor-pointer"
                    onClick={handleVolumeSliderClick}
                    onMouseDown={handleVolumeSliderDrag}
                  >
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                        style={{ width: `${volume * 100}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${volume * 100}%` }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg pointer-events-none"
                        style={{ left: `${volume * 100}%` }}
                        initial={{ left: 0 }}
                        animate={{ left: `${volume * 100}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Volume Icon */}
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Volume1 className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>

                {/* Status Text */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs text-muted-foreground text-center"
                >
                  {isPlaying ? (isMuted ? 'Muted' : 'Playing') : 'Paused'} • {Math.round(volume * 100)}%
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Ring for Playing State */}
        {isPlaying && !isMuted && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/60 pointer-events-none"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    </>
  );
}; 