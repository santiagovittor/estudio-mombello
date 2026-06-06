'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Dot: 10px — fast spring, centered via -5px offset
  const dotTargetX = useMotionValue(-205);
  const dotTargetY = useMotionValue(-205);
  const dotX = useSpring(dotTargetX, { damping: 25, stiffness: 700 });
  const dotY = useSpring(dotTargetY, { damping: 25, stiffness: 700 });

  // Ring: 40px — lagged spring, centered via -20px offset
  const ringTargetX = useMotionValue(-220);
  const ringTargetY = useMotionValue(-220);
  const ringX = useSpring(ringTargetX, { damping: 28, stiffness: 140 });
  const ringY = useSpring(ringTargetY, { damping: 28, stiffness: 140 });

  // Ring scale — expands when hovering interactive elements
  const ringScaleTarget = useMotionValue(1);
  const ringScale = useSpring(ringScaleTarget, { damping: 20, stiffness: 350 });

  useEffect(() => {
    console.log(
      '%c🏛  Estudio Mombello',
      'color: #8b3a3a; font-weight: 600; font-size: 13px; padding: 2px 0;'
    );
    console.log('Sitio construido por Santiago Vittor · github.com/svittor');

    const move = (e: MouseEvent) => {
      dotTargetX.set(e.clientX - 5);
      dotTargetY.set(e.clientY - 5);
      ringTargetX.set(e.clientX - 20);
      ringTargetY.set(e.clientY - 20);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        ringScaleTarget.set(1.5);
      }
    };

    const onOut = (e: MouseEvent) => {
      const from = e.target as HTMLElement;
      const to = e.relatedTarget as HTMLElement | null;
      if (from.closest('a, button') && !to?.closest('a, button')) {
        ringScaleTarget.set(1);
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [dotTargetX, dotTargetY, ringTargetX, ringTargetY, ringScaleTarget]);

  return (
    <>
      {/* Inner dot — fast, mix-blend-mode: difference */}
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
          backgroundColor: 'white',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX,
          y: dotY,
        }}
      />
      {/* Outer ring — lagged, expands on interactive hover */}
      <motion.div
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid white',
          backgroundColor: 'transparent',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringX,
          y: ringY,
          scale: ringScale,
        }}
      />
    </>
  );
}
