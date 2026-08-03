'use client';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeIn' | 'slideUp' | 'zoomIn' | 'slideInLeft';
}

const variantMap = { fadeIn, slideUp, zoomIn, slideInLeft };

export function Reveal({ children, className, delay = 0, variant = 'slideUp' }: RevealProps) {
  const v = variantMap[variant];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: v.hidden,
        visible: { ...v.visible, transition: { ...(v.visible as { transition?: object }).transition, delay } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={slideUp} className={cn(className)}>
      {children}
    </motion.div>
  );
}
