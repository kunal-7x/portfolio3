import { motion } from 'framer-motion';
import { ArrowUp, Heart, Coffee, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Github, href: 'https://github.com/kunalkumar', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kunalkumar/', label: 'LinkedIn' },
  
  { icon: Mail, href: 'mailto:kunalkumar13790@gmail.com', label: 'Email' },
];

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-space text-2xl font-bold gradient-text mb-2">
                  kunal.dev
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building data-powered systems that extract insights from numbers. 
                  Always learning, always building, always excited about the next data challenge.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Coffee className="w-4 h-4" />
                <span>Fueled by curiosity and coffee</span>
              </div>
 
            </motion.div>

            {/* Quick Links */}
            <motion.div
               
            >
              
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="font-semibold text-lg">Let's Connect</h4>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Ready to collaborate on something amazing? I'm always open to discussing 
                  new opportunities and interesting projects.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Available for opportunities
                  </span>
                </div>
              </div>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary"
              >
                Get In Touch
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <span>© 2024 Kunal Kumar. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>using React, Tailwind & Framer Motion</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <span className="text-sm text-muted-foreground">
                Designed & Built by Kunal
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="hover:bg-primary/10 group"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
    </footer>
  );
};