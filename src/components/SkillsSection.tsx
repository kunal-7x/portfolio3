import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code2, Database, Palette, Brain, 
  Globe, Server, Smartphone, Cloud,
  GitBranch, Terminal, Cpu, Zap
} from 'lucide-react';

const skillCategories = [
 
  {
    title: 'Tools',
    icon: Terminal,
    skills: [
      { name: 'Git', level: 95, color: 'from-orange-500 to-red-500' },
      { name: 'GitHub', level: 95, color: 'from-gray-700 to-gray-500' },
      { name: 'VS Code', level: 90, color: 'from-blue-600 to-blue-400' },]
  },
  {
    title: 'Databases & Querying',
    icon: Database,
    skills: [
      { name: 'SQL', level: 90, color: 'from-blue-600 to-blue-400' },
      { name: 'PostgreSQL', level: 85, color: 'from-blue-700 to-blue-500' },
      { name: 'MongoDB', level: 80, color: 'from-green-500 to-green-300' },
      // { name: 'Firebase', level: 75, color: 'from-yellow-500 to-orange-500' },
    ]
  },
  {
    title: 'Languages',
    icon: Code2,
    skills: [
      { name: 'Python', level: 90, color: 'from-blue-600 to-blue-400' },
      { name: 'JavaScript', level: 85, color: 'from-yellow-500 to-yellow-300' },
      { name: 'C++', level: 80, color: 'from-blue-700 to-blue-500' },
      { name: 'Java', level: 75, color: 'from-red-500 to-orange-500' },
      // { name: 'SQL', level: 90, color: 'from-purple-500 to-purple-300' },
      // { name: 'Solidity', level: 60, color: 'from-gray-600 to-gray-400' },
    ]
  },
  {
    title: 'Frontend',
    icon: Globe,
    skills: [
      { name: 'HTML5', level: 95, color: 'from-orange-500 to-red-500' },
      { name: 'CSS3', level: 90, color: 'from-blue-600 to-blue-400' },
      { name: 'React.js', level: 90, color: 'from-blue-500 to-cyan-500' },
      { name: 'Tailwind CSS', level: 85, color: 'from-teal-500 to-cyan-500' },
    ]
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 80, color: 'from-green-600 to-green-400' },
      { name: 'Express.js', level: 75, color: 'from-gray-600 to-gray-400' },
     ]
  }
];

const SkillBar = ({ skill, index }: { skill: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCard = ({ category, index }: { category: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="glass-card hover:bg-glass/60 transition-all duration-300 h-full">
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.8 }}
            className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl"
          >
            <category.icon className="w-6 h-6 text-primary" />
          </motion.div>
          <h3 className="text-xl font-space font-semibold">{category.title}</h3>
        </div>
        
        <div className="space-y-4">
          {category.skills.map((skill: any, skillIndex: number) => (
            <SkillBar key={skill.name} skill={skill} index={skillIndex} />
          ))}
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  );
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="section-padding bg-muted/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
        
        {/* Animated Grid */}
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"
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
          <h2 className="mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit built through years of learning, building, and experimenting 
            with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          {/* <h3 className="text-xl font-space font-semibold mb-6">Also Experienced With</h3> */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              // 'Kaggle', 'CodeChef', 'OOP', 'DSA', 'Problem-solving', 'Communication', 'Collaboration'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 glass rounded-full text-sm font-medium hover:bg-primary/10 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-card max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <blockquote className="text-lg italic text-muted-foreground">
              "I believe in continuous learning and staying curious. Every new technology 
              is an opportunity to build something amazing."
            </blockquote>
            <cite className="text-sm font-medium text-primary mt-4 block">- My Learning Philosophy</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};