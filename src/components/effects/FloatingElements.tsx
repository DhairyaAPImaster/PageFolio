"use client";

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
  shapes?: ('circle' | 'square' | 'triangle' | 'ring')[];
}

export function FloatingElements({ 
  count = 15,
  colors = ['#8b5cf6', '#06b6d4', '#ec4899'],
  shapes = ['circle', 'square', 'ring']
}: FloatingElementsProps) {
  const elements = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })),
  [count, colors, shapes]);

  const renderShape = (shape: string, color: string, size: number) => {
    switch (shape) {
      case 'circle':
        return (
          <div 
            className="rounded-full"
            style={{ width: size, height: size, backgroundColor: color, opacity: 0.2 }}
          />
        );
      case 'square':
        return (
          <div 
            className="rotate-45"
            style={{ width: size, height: size, backgroundColor: color, opacity: 0.2 }}
          />
        );
      case 'triangle':
        return (
          <div 
            style={{ 
              width: 0, 
              height: 0, 
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              opacity: 0.2,
            }}
          />
        );
      case 'ring':
        return (
          <div 
            className="rounded-full"
            style={{ 
              width: size, 
              height: size, 
              border: `2px solid ${color}`,
              opacity: 0.3,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderShape(el.shape, el.color, el.size)}
        </motion.div>
      ))}
    </div>
  );
}

interface GradientMeshProps {
  colors: string[];
}

export function GradientMesh({ colors }: GradientMeshProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -inset-[100%]"
        style={{
          background: `
            radial-gradient(at 20% 30%, ${colors[0]}40 0%, transparent 50%),
            radial-gradient(at 80% 20%, ${colors[1]}40 0%, transparent 50%),
            radial-gradient(at 40% 80%, ${colors[2] || colors[0]}40 0%, transparent 50%),
            radial-gradient(at 90% 70%, ${colors[0]}30 0%, transparent 50%)
          `,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
