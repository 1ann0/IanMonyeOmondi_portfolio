import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface BeamButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  children: React.ReactNode;
  className?: string;
  beamColor?: string;
}

export function BeamButton({ children, className, beamColor, ...props }: BeamButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        className
      )}
      {...props}
    >
      {/* Spinning beam gradient */}
      <span
        className="absolute inset-[-200%] beam-spin"
        style={{
          background: beamColor || 'conic-gradient(from 0deg, transparent 0%, #3b76ff 10%, transparent 20%, transparent 50%, #5b95ff 60%, transparent 70%)',
        }}
      />

      {/* Inner button content */}
      <span className="relative z-10 flex items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 w-full">
        {children}
      </span>
    </motion.button>
  );
}
