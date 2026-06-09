'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { REVIEWS, type Review } from '@/lib/reviews-data';
import { GOOGLE_BIZ_RATING, GOOGLE_BIZ_COUNT } from '@/lib/constants';

const MONTH_NAMES_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
] as const;

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const idx = parseInt(month ?? '1', 10) - 1;
  return `${MONTH_NAMES_ES[idx] ?? ''} ${year ?? ''}`.trim();
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span role="img" aria-label={`${rating} de ${max} estrellas`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            color: i < rating ? 'var(--color-ink)' : 'var(--color-muted)',
            opacity: i < rating ? 1 : 0.35,
            fontSize: '0.9375rem',
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function Slide({ review }: { review: Review }) {
  return (
    <article
      role="group"
      aria-roledescription="diapositiva"
      aria-label={`Opinión de ${review.author}`}
      className="embla__slide"
      style={{
        minWidth: 0,
        borderTop: '1px solid oklch(9% 0.01 245 / 0.20)',
        paddingTop: 'clamp(1.5rem, 2.5vw, 2rem)',
        paddingBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-0.25rem',
          left: '-0.125rem',
          fontSize: 'clamp(4rem, 8vw, 6rem)',
          fontWeight: 900,
          lineHeight: 0.75,
          fontFamily: 'var(--font-display)',
          color: 'var(--color-ink)',
          opacity: 0.07,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {'“'}
      </span>
      <div style={{ position: 'relative', zIndex: 1 }}>
      <StarRating rating={review.rating} />
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 1.15vw, 1.0625rem)',
          fontWeight: 400,
          lineHeight: 1.68,
          color: 'var(--color-ink)',
          marginTop: '0.75rem',
          marginBottom: '1.125rem',
          textWrap: 'pretty',
        } as React.CSSProperties}
      >
        {review.text}
      </p>
      <div>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--color-ink)',
            lineHeight: 1.4,
          }}
        >
          {review.author}
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 400,
            color: 'var(--color-muted)',
            lineHeight: 1.4,
            marginTop: '0.125rem',
          }}
        >
          Google · {formatDate(review.date)}
        </span>
      </div>
      </div>
    </article>
  );
}

interface EmblaAutoplay {
  stop: () => void;
  play: () => void;
}

export default function Testimonials() {
  const prefersReduced = useReducedMotion() ?? false;

  const [autoplayPlugin] = useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  );

  const plugins = useMemo(
    () => (prefersReduced ? [] : [autoplayPlugin]),
    [prefersReduced, autoplayPlugin],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    plugins,
  );

  const handleMouseEnter = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay as EmblaAutoplay | undefined;
    autoplay?.stop();
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay as EmblaAutoplay | undefined;
    autoplay?.play();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins()?.autoplay as EmblaAutoplay | undefined;
    if (!plugin) return;
    const handleVisibility = () => {
      if (document.hidden) plugin.stop();
      else plugin.play();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [emblaApi]);

  if (REVIEWS.length === 0) return null;

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-heading"
      style={{
        backgroundColor: 'var(--color-paper)',
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
        paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto', overflow: 'clip' }}>
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2
            id="testimonios-heading"
            className="section-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: 'var(--color-ink)',
              textWrap: 'balance',
              marginBottom: '0.75rem',
            } as React.CSSProperties}
          >
            Lo que dicen sus clientes
          </h2>
          <p
            aria-label={`${GOOGLE_BIZ_RATING} estrellas, ${GOOGLE_BIZ_COUNT} opiniones en Google`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--color-ink)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <span aria-hidden="true" style={{ color: 'var(--color-ink)', fontSize: '1rem' }}>
              ★
            </span>
            <span>
              {GOOGLE_BIZ_RATING} · {GOOGLE_BIZ_COUNT} opiniones en Google
            </span>
          </p>
        </div>

        <div
          ref={emblaRef}
          aria-label="Reseñas de clientes"
          aria-roledescription="carrusel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            overflow: 'hidden',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '2rem',
            }}
          >
            {REVIEWS.map((review) => (
              <Slide key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
