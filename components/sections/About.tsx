'use client';

import Image from 'next/image';
import { WHATSAPP_URL, YEARS_EXPERIENCE } from '@/lib/constants';
import { trackWhatsappClick } from '@/lib/analytics';
import Magnetic from '@/components/ui/Magnetic';

const PHOTO_AVAILABLE = false;

type AboutProps = Record<string, never>;

export default function About(_: AboutProps) {
  return (
    <section
      id="sobre-fabio"
      aria-labelledby="about-heading"
      style={{
        backgroundColor: 'var(--color-paper)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
        paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div
        className={PHOTO_AVAILABLE ? 'grid lg:grid-cols-[55fr_45fr]' : ''}
        style={{
          maxWidth: '90rem',
          margin: '0 auto',
          gap: PHOTO_AVAILABLE ? 'clamp(3rem, 6vw, 5rem)' : undefined,
          alignItems: 'start',
        }}
      >
        {/* Text column */}
        <div style={{ overflow: 'clip' }}>
          <h2
            id="about-heading"
            className="section-heading"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: 'var(--color-ink)',
              marginBottom: '1.5rem',
              textWrap: 'balance' as never,
            }}
          >
            Sobre Fabio
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: 500,
              color: 'var(--color-ink)',
              letterSpacing: '0.005em',
              lineHeight: 1.4,
              marginBottom: '2rem',
              maxWidth: '65ch',
            }}
          >
            Abogado penalista, laboralista y especialista en derecho de familia.{' '}
            {YEARS_EXPERIENCE} años de ejercicio en Buenos Aires.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginBottom: '2.5rem',
            }}
          >
            <p
              className="reveal-paragraph"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                fontWeight: 400,
                color: 'var(--color-ink)',
                lineHeight: 1.68,
                maxWidth: '65ch',
                textWrap: 'pretty' as never,
              }}
            >
              <span className="reveal-line">
                Fabio entiende que detrás de cada expediente hay una persona esperando respuestas
                concretas.
              </span>
              <span className="reveal-line">
                Desde la primera consulta trabaja directamente con usted: escucha su situación,
                evalúa las opciones reales y traza un camino claro.
              </span>
            </p>
            <p
              className="reveal-paragraph"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                fontWeight: 400,
                color: 'var(--color-ink)',
                lineHeight: 1.68,
                maxWidth: '65ch',
                textWrap: 'pretty' as never,
              }}
            >
              <span className="reveal-line">Su estudio no deriva expedientes.</span>
              <span className="reveal-line">Fabio lleva su caso de principio a fin.</span>
            </p>
          </div>

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
        </div>

        {/* Photo column — only rendered when photo is available */}
        {PHOTO_AVAILABLE && (
          <div
            style={{
              position: 'relative',
              aspectRatio: '3 / 4',
              borderRadius: '0.25rem',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/photos/fabio.jpg"
              alt="Dr. Fabio Mombello, abogado penalista, laboralista y especialista en derecho de familia en Buenos Aires"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
