import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '@/src/lib/constants';
import { Terminal, Sparkles, Wallet } from 'lucide-react';
import { ScrollReveal } from '@/src/components/ScrollReveal';
import { TiltCard } from '@/src/components/TiltCard';
import { StaggerReveal } from '@/src/components/StaggerReveal';

const iconMap: Record<string, React.ElementType> = {
  Terminal,
  Sparkles,
  Wallet,
};

export function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-bg-primary relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-text-primary">
            How I Can Help
          </h2>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <TiltCard
                key={service.title}
                className="group relative rounded-3xl p-10 border border-border-subtle bg-bg-elevated transition-all duration-500 hover:bg-bg-hover hover:border-blue-500/30"
                tiltStrength={8}
              >
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />

                <motion.div
                  className="mb-8 p-4 bg-bg-deepest rounded-2xl inline-block border border-border-subtle group-hover:border-blue-500/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {Icon && <Icon className="h-8 w-8 text-blue-400" />}
                </motion.div>

                <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </TiltCard>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
