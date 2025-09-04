import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';

const achievements = [

  {
    title: '• Adobe India Hackathon 2024',
    description:  ' Successfully participated in Round 1 as part of Team Algoverse',

    icon: Star,
    color: 'from-green-500 to-teal-500',
    year: '2024'
  }
];

export const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" ref={ref} className="section-padding bg-muted/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        
        {/* Floating stars */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-1/5 left-1/5 w-4 h-4"
        >
          <Star className="w-4 h-4 text-accent/30" />
        </motion.div>
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
          className="absolute bottom-1/5 right-1/5 w-3 h-3"
        >
          <Star className="w-3 h-3 text-primary/30" />
        </motion.div>
      </div>

      <div className="container-padding max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">🏆 Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6" />
          {/* <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recognition for building innovative solutions and competing with the best developers worldwide.
          </p> */}
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="glass-card hover:bg-glass/60 transition-all duration-500 text-center h-full">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2, type: "spring", bounce: 0.4 }}
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}
                >
                  <achievement.icon className="w-10 h-10 text-white relative z-10" />
                  
                  {/* Shine effect */}
                  <motion.div
                    animate={{ 
                      x: [-100, 200]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut'
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                      {achievement.year}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-space font-semibold text-foreground group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Badge effect */}
                  <div className="flex justify-center pt-4">
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: 'easeInOut'
                      }}
                      className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                    >
                      <Award className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${achievement.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Inspiration Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <blockquote className="text-lg italic text-muted-foreground">
              "Every achievement is a stepping stone to the next challenge. 
              I compete not just to win, but to grow and inspire others."
            </blockquote>
            <cite className="text-sm font-medium text-primary mt-4 block">- My Competitive Philosophy</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};