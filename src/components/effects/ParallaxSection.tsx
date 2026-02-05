"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxSection({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'up'
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export function RevealOnScroll({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  
  const yUp = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const yDown = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const xLeft = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const xRight = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);

  const getTransformStyle = () => {
    switch (direction) {
      case 'up': return { y: yUp };
      case 'down': return { y: yDown };
      case 'left': return { x: xLeft };
      case 'right': return { x: xRight };
    }
  };

  return (
    <motion.div 
      ref={ref} 
      className={className} 
      style={{ opacity, ...getTransformStyle() }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitTextReveal({ text, className = '', delay = 0 }: SplitTextRevealProps) {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: delay + i * 0.05,
              ease: [0.33, 1, 0.68, 1]
            }}
            viewport={{ once: true }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <motion.div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
