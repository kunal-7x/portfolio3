import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Trophy, Target, Zap, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dsaStats = [
  {
    label: 'Problems Solved',
    value: '200+',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    label: 'Favorite Topic',
    value: 'Dynamic Programming',
    icon: Target,
    color: 'from-purple-500 to-pink-500'
  },
 
  {
    label: 'Languages Used',
    value: 'C++, Python',
    icon: Zap,
    color: 'from-green-500 to-teal-500'
  }
];

const topicProgress = [
  { name: 'Arrays & Strings', progress: 85, problems: 60 },
  { name: 'Dynamic Programming', progress: 80, problems: 45 },
  { name: 'Trees & Graphs', progress: 75, problems: 50 },
  
  { name: 'Backtracking', progress: 70, problems: 30 },
];

export const DSASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dsa" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
        
        {/* Code Pattern Background */}
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"
        />
      </div>

      <div className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">🧠 DSA & Competitive Programming</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Kunal has solved over 200+ DSA problems on LeetCode and other platforms. Skilled in recursion, 
            DP, and structured problem solving to strengthen analytical thinking.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {dsaStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="glass-card text-center group hover:bg-glass/60 transition-all duration-300"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-space font-semibold mb-2">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Topic Progress */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl font-space font-semibold mb-8">Topic Mastery</h3>
            <div className="space-y-6">
              {topicProgress.map((topic, index) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="glass-card"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">{topic.name}</span>
                    <span className="text-sm text-muted-foreground">{topic.problems} problems</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${topic.progress}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
                    </motion.div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-primary font-medium">{topic.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Goal & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-card">
              <h3 className="text-2xl font-space font-semibold mb-6">My Goal</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  🏁 <strong>Master System Design + Competitive Programming</strong>
                </p>
                <p>
                  I believe that strong algorithmic thinking is the foundation of great software engineering. 
                  Every complex system can be broken down into fundamental data structures and algorithms.
                </p>
                <p>
                  My approach focuses on understanding patterns, optimizing solutions, and applying 
                  these concepts to real-world problems in my development projects.
                </p>
              </div>
            </div>

            <div className="glass-card">
              <div className="flex items-center justify-center mb-4">
                <Code2 className="w-8 h-8 text-accent" />
              </div>
              <blockquote className="text-center text-muted-foreground italic mb-4">
                "Code is poetry written in logic. Every algorithm tells a story of efficiency and elegance."
              </blockquote>
              <cite className="text-sm font-medium text-primary block text-center">- My Coding Philosophy</cite>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};