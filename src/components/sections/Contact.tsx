import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'motion/react';
import { ScrollReveal } from '@/src/components/ScrollReveal';
import { BeamButton } from '@/src/components/ui/BeamButton';
import { SITE_DATA } from '@/src/lib/constants';
import { Mail, Github, Linkedin, Award, ExternalLink, Loader2, CheckCircle, XCircle } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = formData.get('from_name') as string;
    const email = formData.get('from_email') as string;
    const message = formData.get('message') as string;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.text || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-bg-deepest relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 text-text-primary">
                Let's build something together.
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-md">
                Whether it's a full-stack project, AI integration, or just a conversation — I'm always open to connecting.
              </p>

              <div className="flex flex-col space-y-6">
                <a
                  href={`mailto:${SITE_DATA.email}`}
                  className="flex items-center text-xl font-medium text-text-primary hover:text-blue-400 transition-colors group"
                >
                  <Mail className="mr-4 h-6 w-6 text-text-tertiary group-hover:text-blue-400 transition-colors" />
                  {SITE_DATA.email}
                </a>

                <div className="flex items-center space-x-6 pt-4">
                  <motion.a
                    href={SITE_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-tertiary hover:text-text-primary transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </motion.a>
                  <motion.a
                    href={SITE_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-tertiary hover:text-text-primary transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href={SITE_DATA.credly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-tertiary hover:text-text-primary transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Award className="h-6 w-6" />
                    <span className="sr-only">Credly</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <div className="bg-bg-elevated p-8 rounded-3xl border border-border-subtle">
              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-text-secondary">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    className="w-full bg-bg-deepest border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    className="w-full bg-bg-deepest border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-text-secondary">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-bg-deepest border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <BeamButton
                  type="submit"
                  className="w-full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  {status === 'success' && (
                    <CheckCircle className="mr-2 h-5 w-5" />
                  )}
                  {status === 'error' && (
                    <XCircle className="mr-2 h-5 w-5" />
                  )}
                  {status === 'idle' && 'Send Message'}
                  {status === 'sending' && 'Sending...'}
                  {status === 'success' && 'Message Sent!'}
                  {status === 'error' && 'Failed to Send'}
                </BeamButton>

                {status === 'error' && errorMessage && (
                  <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                )}
                {status === 'success' && (
                  <p className="text-green-400 text-sm text-center">Thanks! I'll get back to you soon.</p>
                )}
              </form>

              <div className="mt-8 pt-8 border-t border-border-subtle text-center">
                <p className="text-text-secondary mb-4">Or book a call directly:</p>
                <a
                  href={SITE_DATA.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors"
                >
                  Schedule on Calendly
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
