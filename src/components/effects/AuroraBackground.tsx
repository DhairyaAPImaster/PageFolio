"use client";

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface AuroraBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
}

export function AuroraBackground({ 
  primaryColor = '#06b6d4', 
  secondaryColor = '#8b5cf6',
  tertiaryColor = '#22d3ee'
}: AuroraBackgroundProps) {
  const blobs = useMemo(() => [
    { color: primaryColor, size: 600, x: '10%', y: '20%', duration: 20 },
    { color: secondaryColor, size: 500, x: '60%', y: '10%', duration: 25 },
    { color: tertiaryColor, size: 400, x: '30%', y: '60%', duration: 18 },
    { color: primaryColor, size: 350, x: '80%', y: '70%', duration: 22 },
  ], [primaryColor, secondaryColor, tertiaryColor]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-[100px] opacity-30"
          style={{
            backgroundColor: blob.color,
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
