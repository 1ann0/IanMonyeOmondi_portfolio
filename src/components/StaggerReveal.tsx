import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.1,
  direction = 'up',
  distance = 30,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
    }
  };

  const getAnimate = () => {
    if (!isInView) return getInitial();
    return { opacity: 1, x: 0, y: 0 };
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={getInitial()}
          animate={getAnimate()}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
