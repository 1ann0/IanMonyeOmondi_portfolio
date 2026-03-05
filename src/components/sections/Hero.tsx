import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MeshGradient } from '@/src/components/MeshGradient';
import { BeamButton } from '@/src/components/ui/BeamButton';
import { Button } from '@/src/components/ui/Button';
import { MagneticWrapper } from '@/src/components/MagneticWrapper';
import { FloatingParticles } from '@/src/components/FloatingParticles';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <MeshGradient className="w-full h-full opacity-80" />
        <div className="absolute inset-0 bg-bg-deepest/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8L3N2Zz4=')] opacity-30" />
      </motion.div>

      {/* Floating Particles */}
      <FloatingParticles count={35} />

      {/* Content with parallax fade */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold tracking-tighter leading-[1.1] text-white mb-8">
              Building what's next <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 animated-gradient-text">
                from Nairobi to the world.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xl sm:text-2xl text-text-secondary font-medium max-w-2xl mb-12 leading-relaxed">
              Full-stack developer · AI automation · Fintech · Founder of LocalWebAI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <MagneticWrapper>
              <BeamButton
                className="w-full sm:w-auto"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </BeamButton>
            </MagneticWrapper>
            <MagneticWrapper>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Talk
              </Button>
            </MagneticWrapper>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs font-mono text-text-tertiary mb-2 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="text-text-secondary h-5 w-5" />
      </motion.div>
    </section>
  );
}
