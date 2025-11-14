'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { getReducedMotionConfig } from '@/lib/utils/accessibility';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function AnimatedCard({
  children,
  delay = 0,
  className = '',
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={getReducedMotionConfig({ opacity: 0, y: 20 }, { opacity: 0 })}
      animate={getReducedMotionConfig({ opacity: 1, y: 0 }, { opacity: 1 })}
      transition={getReducedMotionConfig({ duration: 0.6, delay }, { duration: 0 })}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default React.memo(AnimatedCard);
