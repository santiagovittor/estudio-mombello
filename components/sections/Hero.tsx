'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { WHATSAPP_URL, YEARS_EXPERIENCE } from '@/lib/constants';
import { trackWhatsappClick, trackCallClick } from '@/lib/analytics';
import HeroStatic from '@/components/ui/HeroStatic';
import Magnetic from '@/components/ui/Magnetic';
import HeroCounter from '@/components/ui/HeroCounter';

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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* Top measurement cap */}
        <div
          aria-hidden="true"
          className="hero-hairline-scan"
          style={{
            width: '100%',
            height: '1px',
            marginBottom: '1rem',
            flexShrink: 0,
            animationDelay: '0s',
          }}
        />

        {/* Animated counter — client component */}
        <HeroCounter />

        {/* Bottom hairline */}
        <div
          aria-hidden="true"
          className="hero-hairline-scan"
          style={{
            width: '100%',
            height: '1px',
            marginTop: '1rem',
            marginBottom: '1.25rem',
            flexShrink: 0,
            animationDelay: '-1.75s',
          }}
        />

        {/* AÑOS label */}
        <span
          aria-hidden="true"
          style={{
            display: 'block',
            fontSize: '0.72rem',
            fontWeight: 400,
            fontFamily: 'inherit',
            letterSpacing: '0.42em',
            color: 'oklch(95% 0.01 75 / 0.36)',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          AÑOS
        </span>
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
          padding: '7rem clamp(1.5rem, 5vw, 6rem) 7rem',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{ maxWidth: '42rem' }}>
          {/* Label */}
          <motion.span
            {...fadeProps(0.1)}
            className="hero-eyebrow"
            style={{
              display: 'block',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.07em',
              textTransform: 'uppercase' as const,
              color: 'oklch(95% 0.01 75 / 0.35)',
              marginBottom: '2.5rem',
            }}
          >
            Buenos Aires · {YEARS_EXPERIENCE} años de experiencia
          </motion.span>

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
            Resolví este tipo de caso durante 20 años.<br />Llámeme hoy.
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
