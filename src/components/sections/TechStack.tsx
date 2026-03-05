import React from 'react';
import { motion } from 'motion/react';
import { TECH_STACK, CERTIFICATIONS } from '@/src/lib/constants';
import { ScrollReveal } from '@/src/components/ScrollReveal';
import { StaggerReveal } from '@/src/components/StaggerReveal';

export function TechStack() {
  return (
    <section className="py-32 px-6 bg-bg-deepest relative border-y border-border-subtle">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-16 items-start justify-between">
            <div className="w-full md:w-1/3">
              <h2 className="text-3xl font-bold tracking-tight mb-8 text-text-primary">
                Certifications
              </h2>
              <StaggerReveal className="space-y-4" staggerDelay={0.1}>
                {CERTIFICATIONS.map((cert) => (
                  <motion.div
                    key={cert}
                    className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle flex items-center gap-4 hover:border-blue-500/30 transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-text-primary">{cert}</span>
                  </motion.div>
                ))}
              </StaggerReveal>
            </div>

            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold tracking-tight mb-8 text-text-primary">
                Tech Stack
              </h2>
              <StaggerReveal className="flex flex-wrap gap-4" staggerDelay={0.05}>
                {TECH_STACK.map((tech) => (
                  <motion.div
                    key={tech}
                    className="px-6 py-3 rounded-full bg-bg-elevated border border-border-subtle text-text-secondary font-mono text-sm hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-default"
                    whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(59, 118, 255, 0.15)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
