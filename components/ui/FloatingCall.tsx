'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PHONE_TEL } from '@/lib/constants';
import { trackCallClick } from '@/lib/analytics';

export default function FloatingCall() {
  const prefersReduced = useReducedMotion();

  const initial = prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 };
  const animate = prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 };
  const transition = prefersReduced
    ? { duration: 0.2 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const, delay: 1.8 };

  return (
    <motion.a
      href={PHONE_TEL}
      aria-label="Llamar a Fabio Mombello"
      onClick={trackCallClick}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
      className="floating-call fixed left-6 z-50 flex size-14 items-center justify-center rounded-full no-underline lg:hidden"
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
        backgroundColor: 'var(--color-ink)',
        color: 'var(--color-paper)',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
        aria-hidden="true"
      >
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    </motion.a>
  );
}
