import React from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from '@/src/components/ScrollReveal';
import { TiltCard } from '@/src/components/TiltCard';
import { StaggerReveal } from '@/src/components/StaggerReveal';
import { ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    title: "Building AI-Powered Websites for SMEs in Nairobi",
    date: "Oct 12, 2025",
    excerpt: "How LocalWebAI is bridging the digital divide for small businesses using generative AI and modern web frameworks.",
    readTime: "5 min read",
    category: "Business",
  },
  {
    title: "Integrating M-Pesa with Next.js: A Practical Guide",
    date: "Sep 28, 2025",
    excerpt: "A deep dive into the Daraja API and how to securely process mobile money payments in a modern React application.",
    readTime: "8 min read",
    category: "Engineering",
  },
  {
    title: "The Developer Athlete: Lessons from the Court",
    date: "Aug 15, 2025",
    excerpt: "Why the mindset required to increase your vertical jump translates perfectly to shipping complex software products.",
    readTime: "4 min read",
    category: "Personal",
  },
];

export function Blog() {
  return (
    <section className="py-32 px-6 bg-bg-primary relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              Thoughts & Writing
            </h2>
            <a href="#" className="hidden md:flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors">
              View all posts
              <motion.span
                className="inline-block ml-2"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </a>
          </div>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {BLOG_POSTS.map((post) => (
            <TiltCard
              key={post.title}
              className="group relative rounded-3xl overflow-hidden border border-border-subtle bg-bg-elevated transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,118,255,0.05)]"
              tiltStrength={6}
            >
              <a href="#" className="block h-full p-8 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider px-3 py-1 bg-blue-500/10 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-text-tertiary font-mono">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-text-secondary leading-relaxed mb-8 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border-subtle">
                  <span className="text-sm text-text-tertiary">
                    {post.date}
                  </span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <ArrowRight className="h-5 w-5 text-text-tertiary group-hover:text-blue-400 transition-colors" />
                  </motion.div>
                </div>
              </a>
            </TiltCard>
          ))}
        </StaggerReveal>

        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors">
            View all posts
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
