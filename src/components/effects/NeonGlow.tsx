"use client";

import { motion } from 'framer-motion';

interface NeonGlowProps {
  color: string;
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function NeonGlow({ color, children, className = '', intensity = 'medium' }: NeonGlowProps) {
  const glowIntensity = {
    low: '0 0 10px',
    medium: '0 0 20px',
    high: '0 0 40px',
  };

  return (
    <motion.span
      className={`relative ${className}`}
      animate={{
        textShadow: [
          `${glowIntensity[intensity]} ${color}80, 0 0 40px ${color}40`,
          `${glowIntensity[intensity]} ${color}, 0 0 60px ${color}60`,
          `${glowIntensity[intensity]} ${color}80, 0 0 40px ${color}40`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}

interface NeonBorderProps {
  color: string;
  children: React.ReactNode;
  className?: string;
}

export function NeonBorder({ color, children, className = '' }: NeonBorderProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `0 0 5px ${color}40, inset 0 0 5px ${color}20`,
          `0 0 20px ${color}80, inset 0 0 10px ${color}40`,
          `0 0 5px ${color}40, inset 0 0 5px ${color}20`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ border: `1px solid ${color}` }}
    >
      {children}
    </motion.div>
  );
}

export function ScanlineEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
        }}
      />
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-white/10"
        animate={{ top: ['-2px', '100%'] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
