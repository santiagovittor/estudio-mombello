'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 700 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 700 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 5);
      mouseY.set(e.clientY - 5);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="hidden md:block"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        x: springX,
        y: springY,
      }}
    />
  );
}
