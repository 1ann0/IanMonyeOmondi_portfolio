import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ScrollReveal } from '@/src/components/ScrollReveal';
import { StaggerReveal } from '@/src/components/StaggerReveal';

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-32 px-6 bg-bg-deepest relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-8 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                About
              </h2>

              <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-medium">
                <p>
                  I grew up between countries — Mozambique, Kenya, Ethiopia, Eswatini.
                  That taught me to adapt fast and build for different contexts.
                </p>
                <p>
                  Now I'm based in Nairobi, building at the intersection of
                  AI, fintech, and the businesses that power East Africa's economy.
                </p>
                <p>
                  When I'm not shipping code, I'm probably on a basketball court
                  working on my vertical — because the same mindset that pushes
                  you toward a dunk is the same one that ships products at midnight.
                </p>
              </div>

              <StaggerReveal
                className="grid grid-cols-2 gap-8 pt-8 border-t border-border-subtle"
                staggerDelay={0.1}
              >
                <div>
                  <p className="text-sm text-text-tertiary font-mono uppercase tracking-wider mb-2">Location</p>
                  <p className="font-semibold text-text-primary">Nairobi, Kenya</p>
                </div>
                <div>
                  <p className="text-sm text-text-tertiary font-mono uppercase tracking-wider mb-2">Education</p>
                  <p className="font-semibold text-text-primary">KCA University (IT)</p>
                </div>
                <div>
                  <p className="text-sm text-text-tertiary font-mono uppercase tracking-wider mb-2">Athletics</p>
                  <p className="font-semibold text-text-primary">D2 Basketball | 6'1"</p>
                </div>
                <div>
                  <p className="text-sm text-text-tertiary font-mono uppercase tracking-wider mb-2">Certifications</p>
                  <p className="font-semibold text-text-primary">Anthropic AI, Google Prompt Design</p>
                </div>
              </StaggerReveal>
            </div>
          </ScrollReveal>

          <div ref={imageRef}>
            <ScrollReveal direction="right" delay={200}>
              <motion.div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden group"
                style={{ y: imageY }}
              >
                <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
                <img
                  src="/profile.jpg"
                  alt="Ian Monye Omondi"
                  className="object-cover w-full h-full grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Basketball Easter Egg */}
                <div className="absolute bottom-8 right-8 z-20 bg-bg-elevated/80 backdrop-blur-md p-4 rounded-2xl border border-border-subtle shadow-xl transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-mono text-blue-400">Vertical: Loading...</p>
                  <p className="text-xs text-text-tertiary mt-1">The approach matters more than the jump.</p>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
