'use client';

import { useRef, useState, useEffect } from 'react';
import {
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { GOOGLE_BIZ_RATING, GOOGLE_BIZ_COUNT, YEARS_EXPERIENCE } from '@/lib/constants';

interface Stat {
  id: string;
  numericValue: number;
  decimals?: number;
  accentSuffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { id: 'years', numericValue: YEARS_EXPERIENCE, label: 'Años de experiencia' },
  { id: 'areas', numericValue: 3, label: 'Áreas de práctica' },
  {
    id: 'rating',
    numericValue: GOOGLE_BIZ_RATING,
    decimals: 1,
    accentSuffix: '★',
    label: 'Promedio en Google',
  },
  { id: 'reviews', numericValue: GOOGLE_BIZ_COUNT, label: 'Opiniones de clientes' },
];

interface StatItemProps {
  stat: Stat;
  index: number;
  prefersReduced: boolean;
}

function StatItem({ stat, index, prefersReduced }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const format = (v: number) =>
    stat.decimals ? v.toFixed(stat.decimals) : String(Math.round(v));

  const motionCount = useMotionValue(0);
  const spring = useSpring(motionCount, { stiffness: 60, damping: 20 });
  const displayMotion = useTransform(spring, format);

  const [displayText, setDisplayText] = useState('0');

  const formattedFinal =
    stat.decimals !== undefined
      ? stat.numericValue.toFixed(stat.decimals)
      : String(Math.round(stat.numericValue));

  const renderedText = prefersReduced ? formattedFinal : displayText;

  useMotionValueEvent(displayMotion, 'change', setDisplayText);

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          motionCount.set(stat.numericValue);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [motionCount, prefersReduced, stat.numericValue]);

  return (
    <div
      ref={ref}
      className={index < STATS.length - 1 ? 'stat-divider' : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 clamp(1rem, 2vw, 2.5rem)',
      }}
    >
      <span
        style={{
          display: 'block',
          fontSize: 'clamp(4.5rem, 9vw, 6rem)',
          fontWeight: 900,
          color: 'var(--color-ink)',
          lineHeight: 1,
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-display)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {renderedText}
        {stat.accentSuffix && (
          <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>
            {stat.accentSuffix}
          </span>
        )}
      </span>
      <span
        style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 400,
          color: 'var(--color-muted)',
          lineHeight: 1.4,
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function Stats() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <section
      aria-label="Estadísticas"
      style={{
        backgroundColor: 'var(--color-paper)',
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {STATS.map((stat, i) => (
            <StatItem key={stat.id} stat={stat} index={i} prefersReduced={prefersReduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
