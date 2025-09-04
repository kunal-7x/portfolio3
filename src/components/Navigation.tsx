import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MusicPlayer } from '@/components/MusicPlayer';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  // { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass backdrop-blur-xl py-1' : 'bg-transparent py-1'
        }`}
      >
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center space-x-2"
            >
              <img 
                src="/logo3.png" 
                alt="Kunal Logo" 
                className="w-20 h-20 rounded-lg object-cover m-0 p-0"
              />
              <span className="font-space text-3xl font-bold gradient-text">
                Partik.dev
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex rounded items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium   ml-3 transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'text-primary  '
                      : 'text-muted-foreground   over:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/5  rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Music Player */}
              <MusicPlayer />
              
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="hidden ml-3 rounded-2xl pr-5 pl-5 p-5 sm:flex glass hover:bg-muted/20"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Button
                size="sm"
                onClick={() => window.open('/resume.pdf', '_blank')}
                className="hidden rounded-2xl pr-5 pl-5 sm:flex btn-primary"
                title="Download Kunal's Resume (PDF)"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden glass"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-xl z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed top-0 right-0 h-full w-80 glass z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-space text-xl font-bold gradient-text">
                    Menu
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-4 flex-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left p-4 rounded-xl hover:bg-muted/20 transition-colors text-lg font-medium"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>

                <div className="flex flex-col space-y-3 pt-6 border-t border-border">
                  <Button
                    onClick={() => setDarkMode(!darkMode)}
                    className="btn-secondary justify-start"
                  >
                    {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                  <Button 
                    className="btn-primary justify-start"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};