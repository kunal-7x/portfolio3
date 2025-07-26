import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Calendar, MapPin, Award, Code2, Brain, Heart, Settings } from 'lucide-react';
// Removed react-tilt due to compatibility issues

const timeline = [
  { year: '2022...', title: 'Building...', description: 'Building Something Matter...', icon: Settings },

   { year: '2023...', title: 'Full-Stack Web Development', description: 'Mastered React, Node.js & databases', icon: Code2 },
  { year: '2023...', title: 'AI/ML and Data Tools', description: 'Built data-powered applications', icon: Brain },
  { year: '2024 - 2028 ', title: 'Started BS in Data Science @ IIT Madras', description: 'Began my journey in data science', icon: Calendar },

  { year: '2025', title: 'Completed McKinsey Forward Learning Program', description: 'Open to Internships', icon: Award },
];

const Counter = ({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [motionValue, to, isInView]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container-padding max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About Me
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am Kunal Kumar, a student at IIT Madras pursuing a BS in Data Science. I'm passionate about logic, 
                problem-solving, and building data-driven products. From web development to AI automation, I've completed 
                20+ projects and solved 200+ DSA problems.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I build data-powered systems using tools like Python, ML, SQL, and visual analytics. I'm open to 
                internships and data roles where I can contribute to meaningful data-driven solutions.
              </p>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Available Remotely</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Open to Opportunities</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { label: 'Projects Completed', value: 20, suffix: '+' },
                { label: 'DSA Problems Solved', value: 200, suffix: '+' },
                { label: 'Technologies Learned', value: 10, suffix: '+' },
                { label: 'Hackathon Wins', value: 2, suffix: '' },
              ].map((stat, index) => (
                <div key={stat.label} className="glass-card text-center">
                  <div className="text-2xl font-bold gradient-text">
                    <Counter from={0} to={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Photo & Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Photo */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div 
                  className="w-80 h-80 glass rounded-3xl p-6 relative overflow-hidden cursor-pointer group"
                  onClick={() => {
                    const popup = document.createElement('div');
                    popup.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
                    popup.innerHTML = `
                      <div class="bg-background rounded-xl p-6 max-w-md w-full glass">
                        <h3 class="text-xl font-space font-semibold mb-4">About KK Kunal Kumar</h3>
                        <p class="text-muted-foreground leading-relaxed">
                          I am Kunal Kumar, currently pursuing a BS in Data Science at IIT Madras. I build data-powered systems using tools like Python, ML, SQL, and visual analytics. I'm open to internships and data roles.
                        </p>
                        <button onclick="this.parentElement.parentElement.remove()" class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg">Close</button>
                      </div>
                    `;
                    document.body.appendChild(popup);
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl font-bold gradient-text">KK</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-3xl" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-space font-semibold text-lg">KK Kunal Kumar</h3>
                    <p className="text-muted-foreground text-sm">Data Science Student at IIT Madras</p>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </motion.div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-xl font-space font-semibold">My Journey</h3>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-primary">{item.year}</span>
                        <div className="h-px bg-border flex-1" />
                      </div>
                      <h4 className="font-medium text-foreground mt-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};