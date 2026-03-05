import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROJECTS } from '@/src/lib/constants';
import { Badge } from '@/src/components/ui/Badge';
import { ExternalLink } from 'lucide-react';
import { TiltCard } from '@/src/components/TiltCard';
import { StaggerReveal } from '@/src/components/StaggerReveal';
import { ScrollReveal } from '@/src/components/ScrollReveal';
import { cn } from '@/src/lib/utils';

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div ref={ref} className="relative overflow-hidden aspect-video w-full bg-bg-deepest">
      <motion.img
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        style={{ y }}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated to-transparent opacity-60" />
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="py-32 px-6 bg-bg-primary relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-text-primary">
            Selected Work
          </h2>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
          {PROJECTS.map((project) => (
            <TiltCard
              key={project.id}
              className={cn(
                'group relative rounded-3xl overflow-hidden border border-border-subtle bg-bg-elevated transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,118,255,0.1)]',
                project.featured ? 'md:col-span-2 lg:col-span-2 row-span-2' : ''
              )}
              tiltStrength={6}
            >
              <a href={project.link} className="block h-full flex flex-col">
                <ProjectImage src={project.image} alt={project.title} />

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-text-primary group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink className="h-5 w-5 text-text-tertiary group-hover:text-blue-400 transition-colors" />
                  </div>

                  <p className="text-text-secondary text-base leading-relaxed mb-8 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-bg-deepest border-border-subtle">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </a>
            </TiltCard>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
