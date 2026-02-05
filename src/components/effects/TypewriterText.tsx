"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  cursorColor?: string;
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '',
  cursor = true,
  cursorColor = 'currentColor'
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  useEffect(() => {
    if (!cursor) return;
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && (
        <span 
          className="inline-block w-[2px] h-[1em] ml-1 align-middle"
          style={{ 
            backgroundColor: showCursor ? cursorColor : 'transparent',
            transition: 'background-color 0.1s'
          }}
        />
      )}
    </span>
  );
}

interface GlitchTextProps {
  children: string;
  className?: string;
  color?: string;
}

export function GlitchText({ children, className = '', color = '#00ff00' }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 z-0"
        style={{ color, clipPath: 'inset(0)' }}
        animate={{
          clipPath: [
            'inset(10% 0 80% 0)',
            'inset(80% 0 5% 0)',
            'inset(40% 0 50% 0)',
            'inset(10% 0 60% 0)',
            'inset(30% 0 20% 0)',
            'inset(10% 0 80% 0)',
          ],
          x: [-2, 2, -2, 2, 1, -2],
          y: [1, -1, 2, -2, 2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface TerminalPromptProps {
  command: string;
  output?: string;
  className?: string;
  promptColor?: string;
}

export function TerminalPrompt({ 
  command, 
  output, 
  className = '',
  promptColor = '#22c55e'
}: TerminalPromptProps) {
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowOutput(true);
    }, command.length * 50 + 500);
    return () => clearTimeout(timeout);
  }, [command]);

  return (
    <div className={`font-mono ${className}`}>
      <div className="flex items-center gap-2">
        <span style={{ color: promptColor }}>❯</span>
        <TypewriterText text={command} speed={50} cursorColor={promptColor} />
      </div>
      {showOutput && output && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 opacity-70"
        >
          {output}
        </motion.div>
      )}
    </div>
  );
}
