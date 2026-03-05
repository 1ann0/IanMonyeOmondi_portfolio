import React from 'react';
import { Navigation } from '@/src/components/Navigation';
import { Hero } from '@/src/components/sections/Hero';
import { Projects } from '@/src/components/sections/Projects';
import { About } from '@/src/components/sections/About';
import { Services } from '@/src/components/sections/Services';
import { TechStack } from '@/src/components/sections/TechStack';
import { AIPlayground } from '@/src/components/sections/AIPlayground';
import { Blog } from '@/src/components/sections/Blog';
import { Contact } from '@/src/components/sections/Contact';
import { Footer } from '@/src/components/sections/Footer';
import { CursorGlow } from '@/src/components/CursorGlow';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-deepest text-text-primary font-sans selection:bg-blue-500/30 selection:text-blue-50">
      <CursorGlow />
      <Navigation />
      
      <main>
        <Hero />
        <Projects />
        <About />
        <Services />
        <TechStack />
        <AIPlayground />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
