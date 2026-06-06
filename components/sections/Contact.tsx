'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  WHATSAPP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  GOOGLE_BIZ_NAME,
  OFFICE_ADDRESS,
} from '@/lib/constants';
import { trackWhatsappClick, trackCallClick, trackFormSubmit } from '@/lib/analytics';
import Magnetic from '@/components/ui/Magnetic';

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Guayaquil+390+Gral+Pacheco+Buenos+Aires&output=embed';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

type ContactProps = Record<string, never>;

export default function Contact(_: ContactProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [values, setValues] = useState({ name: '', contact: '', message: '' });

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (formError) setFormError(null);
      if (formState === 'error') setFormState('idle');
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!values.name.trim() || !values.contact.trim() || !values.message.trim()) {
      setFormError('Por favor complete todos los campos.');
      return;
    }

    setFormError(null);
    setFormState('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: values.name,
          contacto: values.contact,
          descripcion: values.message,
        }),
      });

      if (!res.ok) {
        setFormState('error');
        return;
      }

      trackFormSubmit();
      setFormState('success');
    } catch {
      setFormState('error');
    }
  }

  const isSubmitDisabled = formState === 'submitting' || formState === 'success';

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      style={{
        backgroundColor: 'var(--color-paper)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div
        className="grid lg:grid-cols-[55fr_45fr]"
        style={{
          maxWidth: '90rem',
          margin: '0 auto',
          gap: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'start',
        }}
      >
        {/* ── Left column ── */}
        <div style={{ overflow: 'clip' }}>
          <h2
            id="contact-heading"
            className="section-heading"
            style={{
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: 'var(--color-ink)',
              marginBottom: '1rem',
              textWrap: 'balance' as never,
            }}
          >
            Consulte con Fabio
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
              fontWeight: 400,
              color: 'var(--color-ink)',
              lineHeight: 1.68,
              maxWidth: '58ch',
              marginBottom: '2rem',
              textWrap: 'pretty' as never,
            }}
          >
            Atiende personalmente cada consulta. Cuéntele su situación y recibirá una respuesta
            concreta, sin intermediarios.
          </p>

          {/* Primary CTA + phone secondary */}
          <div style={{ marginBottom: '2.5rem' }}>
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
            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.9375rem',
                fontWeight: 400,
                color: 'var(--color-muted)',
                lineHeight: 1.5,
              }}
            >
              O llame al{' '}
              <a
                href={PHONE_TEL}
                onClick={trackCallClick}
                className="contact-phone-inline"
                aria-label={`Llamar a Fabio Mombello al ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>

          {/* Contact form */}
          {formState === 'success' ? (
            <p
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                fontWeight: 400,
                color: 'var(--color-ink)',
                lineHeight: 1.68,
                marginBottom: '2.5rem',
              }}
            >
              Gracias, {values.name}. Fabio le responde a la brevedad.
            </p>
          ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulario de contacto"
            style={{ marginBottom: '2.5rem' }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}
            >
              <div>
                <label htmlFor="contact-name" className="contact-label">
                  Su nombre
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder="Nombre y apellido"
                  className="contact-input"
                  aria-required="true"
                  aria-invalid={formError !== null || undefined}
                  aria-describedby={formError ? 'contact-form-error' : undefined}
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="contact-contact" className="contact-label">
                  Teléfono o email
                </label>
                <input
                  id="contact-contact"
                  type="text"
                  name="contact"
                  autoComplete="off"
                  value={values.contact}
                  onChange={handleChange('contact')}
                  placeholder="11 1234-5678 o nombre@correo.com"
                  className="contact-input"
                  aria-required="true"
                  aria-invalid={formError !== null || undefined}
                  aria-describedby={formError ? 'contact-form-error' : undefined}
                  maxLength={150}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="contact-label">
                  Su situación
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange('message')}
                  placeholder="Cuénteme brevemente su caso"
                  className="contact-input contact-textarea"
                  aria-required="true"
                  aria-invalid={formError !== null || undefined}
                  aria-describedby={formError ? 'contact-form-error' : undefined}
                  maxLength={1500}
                />
              </div>
            </div>

            <AnimatePresence>
              {formError && (
                <motion.p
                  role="alert"
                  id="contact-form-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                  }}
                >
                  {formError}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="hero-cta-primary"
              aria-disabled={isSubmitDisabled}
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: formState === 'submitting' ? 0.7 : 1,
                cursor: isSubmitDisabled ? 'default' : undefined,
              }}
            >
              {formState === 'submitting' ? 'Enviando...' : 'Enviar consulta'}
            </button>

            <AnimatePresence>
              {formState === 'error' && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                    lineHeight: 1.5,
                    textWrap: 'pretty' as never,
                  }}
                >
                  Hubo un error al enviar. Por favor escriba directamente por{' '}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWhatsappClick}
                    style={{ color: 'var(--color-accent)', fontWeight: 700, textDecoration: 'underline' }}
                  >
                    WhatsApp
                  </a>
                  .
                </motion.p>
              )}
            </AnimatePresence>
          </form>
          )}

          {/* NAP block */}
          <address
            style={{
              fontStyle: 'normal',
              fontSize: 'clamp(0.875rem, 1vw, 1rem)',
              color: 'var(--color-muted)',
              lineHeight: 1.75,
            }}
          >
            <span
              style={{
                display: 'block',
                fontWeight: 700,
                color: 'var(--color-ink)',
                marginBottom: '0.125rem',
              }}
            >
              {GOOGLE_BIZ_NAME}
            </span>
            <span style={{ display: 'block' }}>{OFFICE_ADDRESS}</span>
            <a
              href={PHONE_TEL}
              onClick={trackCallClick}
              className="contact-nap-link"
              aria-label={`Llamar a Fabio Mombello al ${PHONE_DISPLAY}`}
            >
              {PHONE_DISPLAY}
            </a>
          </address>
        </div>

        {/* ── Right column: map ── */}
        <div
          style={{
            position: 'sticky',
            top: '5rem',
            borderRadius: '0.25rem',
            overflow: 'hidden',
            aspectRatio: '4 / 5',
            backgroundColor: 'oklch(62% 0.006 245 / 0.08)',
          }}
        >
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Ubicación de ${GOOGLE_BIZ_NAME}`}
          />
        </div>
      </div>
    </section>
  );
}
