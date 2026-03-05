import React from 'react';
import { motion } from 'motion/react';
import { SITE_DATA } from '@/src/lib/constants';
import { Github, Linkedin, Award } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-bg-deepest border-t border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-text-secondary font-medium">
          &copy; {currentYear} {SITE_DATA.name}
        </div>

        <div className="flex items-center space-x-8 text-sm font-medium text-text-tertiary">
          <a href="#work" className="hover:text-text-primary transition-colors">Work</a>
          <a href="#about" className="hover:text-text-primary transition-colors">About</a>
          <a href="#services" className="hover:text-text-primary transition-colors">Services</a>
          <a href="#contact" className="hover:text-text-primary transition-colors">Contact</a>
        </div>

        <div className="flex items-center space-x-6 text-text-tertiary">
          <motion.a
            href={SITE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </motion.a>
          <motion.a
            href={SITE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </motion.a>
          <motion.a
            href={SITE_DATA.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Award className="h-5 w-5" />
            <span className="sr-only">Credly</span>
          </motion.a>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-text-tertiary font-mono uppercase tracking-widest opacity-50">
        Built from Nairobi
      </div>
    </footer>
  );
}
