import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 1,
    title: 'MedFlow – Smart Hospital System',
    description: 'A real-time dashboard and patient management system built for hospital operations.',
    longDescription: 'A comprehensive hospital management system with real-time dashboard, patient management, appointment scheduling, and AI-powered analytics. Built with React.js and advanced AI integrations for optimal healthcare operations.',
    image: "/med1.png",
    tags: ['React.js', 'AI', 'Dashboard', 'Healthcare'],
    category: 'AI',
    github: '#',
    live: 'https://medflow-seven.vercel.app/',
    featured: true,
    screenshots: ['/med1.png', '/api/placeholder/800/600', '/api/placeholder/800/600']
  },
  {
    id: 2,
    title: 'HabitVerse – Productivity OS',
    description: 'A fully featured productivity tool with AI, habits, goals, and squad support.',
    longDescription: 'A comprehensive productivity operating system that combines habit tracking, goal setting, AI-powered insights, and team collaboration features. Features include streak tracking, productivity analytics, and social challenges.',
    image: '/Screenshot 2025-07-26 031540.png',
    tags: ['React.js', 'AI', 'Productivity', 'Social'],
    category: 'Productivity',
    github: '#',
    live: 'https://habitverse-os.vercel.app/',
    featured: true,
    screenshots: ['/Screenshot 2025-07-26 031540.png', '/api/placeholder/800/600', '/api/placeholder/800/600']
  }
];

const categories = ['All', 'AI', 'Productivity', 'Creative', 'Social'];

const ProjectModal = ({ project, isOpen, onClose }: { project: any; isOpen: boolean; onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 glass rounded-3xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-2xl font-space font-bold">{project.title}</h2>
                  <p className="text-muted-foreground">{project.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                      <img
                        src={project.screenshots[currentImageIndex]}
                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {project.screenshots.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    
                    {/* Thumbnail Navigation */}
                    {project.screenshots.length > 1 && (
                      <div className="flex space-x-2 overflow-x-auto">
                        {project.screenshots.map((screenshot: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                              index === currentImageIndex ? 'border-primary' : 'border-transparent'
                            }`}
                          >
                            <img
                              src={screenshot}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">About This Project</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button 
                        className="btn-primary flex-1"
                        onClick={() => window.open(project.github, '_blank')}
                        disabled={project.github === '#'}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                      <Button 
                        variant="outline" 
                        className="btn-secondary flex-1"
                        onClick={() => window.open(project.live, '_blank')}
                        disabled={project.live === '#'}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        className={`relative group cursor-pointer ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
        onClick={() => setSelectedProject(project)}
      >
        <div className="glass-card overflow-hidden h-full hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-primary/10 hover:border-primary/30">
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center backdrop-blur-sm">
              <div className="text-6xl font-display font-bold gradient-text drop-shadow-2xl">
                {project.title[0]}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="text-center space-y-3">
                <div className="bg-primary/20 backdrop-blur-sm rounded-full p-4 inline-block">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <div className="font-display font-semibold text-foreground">View Project</div>
              </div>
            </div>
            {project.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-accent text-accent-foreground">Featured</Badge>
              </div>
            )}
          </div>
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-display font-semibold text-xl group-hover:gradient-text transition-all duration-300">
                {project.title}
              </h3>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                {project.category}
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.slice(0, 3).map((tag: string) => (
                <div key={tag} className="px-3 py-1 bg-muted/30 text-muted-foreground text-xs rounded-lg border border-muted/50 font-medium">
                  {tag}
                </div>
              ))}
              {project.tags.length > 3 && (
                <div className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-lg border border-accent/20 font-medium">
                  +{project.tags.length - 3}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button 
                className="p-3 glass rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:shadow-glow"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, '_blank');
                }}
                disabled={project.github === '#'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.button>
              <motion.button 
                className="p-3 glass rounded-xl hover:bg-accent/10 hover:text-accent transition-all duration-300 hover:shadow-glow"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.live, '_blank');
                }}
                disabled={project.live === '#'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Luxury Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject?.id === project.id}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my best work, from AI-powered applications to productivity tools 
            that solve real-world problems.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "btn-primary" : "btn-secondary"}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="btn-secondary">
            <Github className="w-4 h-4 mr-2" />
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};