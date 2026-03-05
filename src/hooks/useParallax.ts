import { useScroll, useTransform, MotionValue } from 'motion/react';
import { RefObject } from 'react';

interface ParallaxOptions {
  target?: RefObject<HTMLElement | null>;
  offset?: [string, string];
  speed?: number;
}

export function useParallax({
  target,
  offset = ['start end', 'end start'],
  speed = 0.5,
}: ParallaxOptions = {}): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: target ?? undefined,
    offset: offset as any,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  return y;
}
