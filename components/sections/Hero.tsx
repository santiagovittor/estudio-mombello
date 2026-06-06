'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { WHATSAPP_URL, YEARS_EXPERIENCE } from '@/lib/constants';
import { trackWhatsappClick, trackCallClick } from '@/lib/analytics';
import HeroStatic from '@/components/ui/HeroStatic';
import Magnetic from '@/components/ui/Magnetic';

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const prefersReduced = useReducedMotion() ?? false;

  // Clip-path wipe per H1 line; reduced motion: opacity fade only
  const h1LineProps = useMemo(
    () =>
      (delay: number) => ({
        initial: prefersReduced
          ? { opacity: 0, clipPath: 'inset(0%)' }
          : { opacity: 1, clipPath: 'inset(110% 0 0 0)' },
        animate: { opacity: 1, clipPath: 'inset(0%)' },
        transition: {
          duration: prefersReduced ? 0.3 : 0.75,
          delay: prefersReduced ? delay * 0.3 : delay,
          ease: EASE_OUT_EXPO,
        },
      }),
    [prefersReduced],
  );

  // Standard fade-up for all other elements
  const fadeProps = useMemo(
    () =>
      (delay: number) => ({
        initial: { opacity: 0, y: prefersReduced ? 0 : 32 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: prefersReduced ? 0.15 : 0.7,
          delay: prefersReduced ? 0 : delay,
          ease: EASE_OUT_QUART,
        },
      }),
    [prefersReduced],
  );

  return (
    <section
      id="hero"
      className="hero-crt"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-hero-bg)',
        color: 'var(--color-hero-text)',
        overflow: 'hidden',
      }}
    >
      <HeroStatic />

      {/* Decorative typographic element — desktop only */}
      <div
        aria-hidden="true"
        className="hidden lg:flex hero-years-parallax"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '38%',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            transform: 'rotate(-90deg)',
            opacity: 0.30,
            fontFamily: 'var(--font-display)',
            lineHeight: 0.88,
            color: 'var(--color-hero-text)',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(9rem, 16vw, 20rem)',
              fontWeight: 900,
            }}
          >
            {YEARS_EXPERIENCE}
          </span>
          <span
            style={{
              display: 'block',
              fontSize: '1.5rem',
              fontWeight: 400,
              textAlign: 'center',
              letterSpacing: '0.45em',
              textTransform: 'uppercase' as const,
              paddingLeft: '0.45em',
            }}
          >
            años
          </span>
        </div>
      </div>

      {/* Main content */}
      <div
        className="hero-signal-flicker"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '90rem',
          margin: '0 auto',
          width: '100%',
          padding: '7rem clamp(1.5rem, 5vw, 6rem) 0',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{ maxWidth: '42rem' }}>
          {/* Label */}
          <motion.p
            {...fadeProps(0.1)}
            style={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.07em',
              textTransform: 'uppercase' as const,
              color: 'oklch(95% 0.01 75 / 0.35)',
              marginBottom: '2.5rem',
            }}
          >
            Buenos Aires · {YEARS_EXPERIENCE} años de experiencia
          </motion.p>

          {/* H1 — clip-path line-by-line wipe */}
          <h1
            className="hero-headline-glow"
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              textWrap: 'balance' as never,
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span style={{ display: 'block' }} {...h1LineProps(0.3)}>
                Su problema
              </motion.span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span style={{ display: 'block' }} {...h1LineProps(0.55)}>
                tiene solución.
              </motion.span>
            </span>
          </h1>

          {/* Subline */}
          <motion.p
            {...fadeProps(0.85)}
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontWeight: 500,
              color: 'oklch(95% 0.01 75 / 0.88)',
              marginBottom: '1.25rem',
              letterSpacing: '0.005em',
            }}
          >
            Fabio Mombello · Abogado Penal, Laboral y Familia
          </motion.p>

          {/* Body */}
          <motion.p
            {...fadeProps(1.0)}
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
              fontWeight: 400,
              color: 'oklch(95% 0.01 75 / 0.72)',
              maxWidth: '52ch',
              lineHeight: 1.68,
              marginBottom: '3.5rem',
            }}
          >
            {/* PENDING CLIENT REVIEW: "Lo llamo hoy" positions Fabio as the one who
                calls the prospect. Confirm before launch — CTA is visitor-initiated
                WhatsApp but this line implies outbound. Not a contradiction, client
                needs to know it is there. */}
            He resuelto este tipo de caso durante 20 años.<br />Lo llamo hoy.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeProps(1.15)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
            }}
          >
            <Magnetic>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsappClick}
                className="hero-cta-primary"
                aria-label="Escribir a Fabio Mombello por WhatsApp"
              >
                Escribir por WhatsApp
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="tel:+5491152579927"
                onClick={trackCallClick}
                className="hero-cta-ghost"
                aria-label="Llamar a Fabio Mombello"
              >
                Llamar ahora
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Architectural scroll cue — line, not chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReduced ? 0 : 1.8, duration: 0.6 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '2.5rem',
          backgroundColor: 'oklch(95% 0.01 75 / 0.28)',
        }}
      />
    </section>
  );
}
