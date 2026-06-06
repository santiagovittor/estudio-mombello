'use client';

import {
  CALENDAR_EMBED_URL,
  WHATSAPP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from '@/lib/constants';
import { trackBookingOpen, trackWhatsappClick } from '@/lib/analytics';
import Magnetic from '@/components/ui/Magnetic';

const SLOT_BORDER = '1px solid oklch(95% 0.01 75 / 0.12)';

export default function Booking() {
  return (
    <section
      id="turnos"
      style={{
        backgroundColor: 'var(--color-hero-bg)',
        color: 'var(--color-hero-text)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '56rem', margin: '0 auto', overflow: 'clip' }}>
        <h2
          className="section-heading"
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            color: 'var(--color-hero-text)',
            marginBottom: '1rem',
            textWrap: 'balance' as never,
          }}
        >
          Agendá su consulta
        </h2>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            fontWeight: 400,
            lineHeight: 1.68,
            color: 'oklch(95% 0.01 75 / 0.72)',
            maxWidth: '52ch',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            textWrap: 'pretty' as never,
          }}
        >
          Sin compromiso. En la primera consulta analizo su caso y le digo qué caminos existen.
        </p>

        <div>
          {CALENDAR_EMBED_URL ? (
            <div
              className="aspect-[4/3] md:aspect-video"
              style={{
                width: '100%',
                borderRadius: '0.25rem',
                overflow: 'hidden',
                border: SLOT_BORDER,
              }}
            >
              <iframe
                src={CALENDAR_EMBED_URL}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="Agendar consulta con Dr. Fabio Mombello"
                onLoad={trackBookingOpen}
              />
            </div>
          ) : (
            <div
              className="aspect-[4/3] md:aspect-video"
              style={{
                width: '100%',
                borderRadius: '0.25rem',
                border: SLOT_BORDER,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'oklch(95% 0.01 75 / 0.55)',
                  maxWidth: '28ch',
                  lineHeight: 1.5,
                }}
              >
                Coordiná un turno directamente por WhatsApp
              </p>
              <Magnetic>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsappClick}
                  className="hero-cta-primary"
                  aria-label="Escribir a Fabio Mombello por WhatsApp para coordinar un turno (se abre en nueva pestaña)"
                >
                  Escribir por WhatsApp
                </a>
              </Magnetic>
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'oklch(95% 0.01 75 / 0.72)',
                }}
              >
                También podés llamar al{' '}
                <a
                  href={PHONE_TEL}
                  className="booking-phone-link"
                  style={{ display: 'inline-flex', alignItems: 'center', minHeight: '2.75rem' }}
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
