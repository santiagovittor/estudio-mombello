'use client';

import { useState } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { WHATSAPP_URL } from '@/lib/constants';
import { trackWhatsappClick } from '@/lib/analytics';
import Magnetic from '@/components/ui/Magnetic';
import { getFAQSchema } from '@/lib/schema';

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'citacion',
    question: 'Recibí una citación de la fiscalía o la policía. ¿Qué hago primero?',
    answer:
      'No se presente solo. No declare ni firme nada antes de hablar con un abogado. Muchas personas van a "aclarar las cosas" y ese impulso empeora todo. Llámeme antes de presentarse: evaluamos juntos si corresponde ir a la comisaría o directamente al juzgado, lo que en muchos casos evita la detención preventiva.',
  },
  {
    id: 'silencio',
    question: '¿Estoy obligado a declarar si me detienen o me citan como imputado?',
    answer:
      'No. Tiene derecho a guardar silencio y a declarar solo ante el juez, siempre con su abogado. Ejercer ese derecho no lo perjudica. Declarar solo, sin preparación, es uno de los errores más difíciles de corregir después. Si está detenido ahora, llámeme.',
  },
  {
    id: 'despido',
    question: 'Me despidieron sin causa. ¿Vale la pena iniciar un reclamo?',
    answer:
      'Depende del caso, y eso lo analizamos en la primera consulta. Lo que sí puedo decirle: en causas laborales trabajo con cuota litis, cobro un porcentaje de lo que se recupera. Si no hay resultado, no hay honorarios. El primer paso es la conciliación obligatoria, que en muchos casos resuelve sin llegar a juicio.',
  },
  {
    id: 'primera-consulta',
    question: '¿Qué pasa en la primera consulta?',
    answer:
      'Me cuenta qué pasó. Escucho, hago las preguntas necesarias, y al terminar usted sabe si tiene un caso viable, qué caminos existen y cuál es el paso concreto siguiente. Sin rodeos ni promesas vacías.',
  },
  {
    id: 'honorarios',
    question: '¿Cómo son los honorarios?',
    answer:
      'En causas laborales, los honorarios son un porcentaje de lo obtenido, sin costo inicial. Si el cliente no gana, el abogado no cobra. En causas penales y de familia, los honorarios se acuerdan en la primera consulta, una vez que entiendo bien su situación. El valor de la consulta inicial se lo informo al contactarse.',
  },
  {
    id: 'tiempo',
    question: '¿Cuánto tiempo tarda un caso como el mío?',
    answer:
      'Un divorcio de mutuo acuerdo suele resolverse en 1 a 3 meses. Un juicio laboral completo puede durar entre 1 y 4 años, aunque un caso bien planteado desde el inicio puede acortarse significativamente. Las causas penales varían según la etapa y el delito. Lo que sí controlo es que cada paso se dé a tiempo y sin demoras evitables.',
  },
  {
    id: 'remoto',
    question: '¿Puedo hacer la consulta de forma remota?',
    answer:
      'Sí. Atiendo por videollamada o WhatsApp para la primera consulta. Cuando el caso requiere documentación o presencia en tribunales, le indico con anticipación qué necesita y cuándo.',
  },
  {
    id: 'experiencia',
    question: '¿Tiene experiencia en los tribunales de Buenos Aires?',
    answer:
      'Llevo 20 años ejerciendo en el fuero penal, laboral y de familia en tribunales de Buenos Aires. Conozco los tiempos, las costumbres procesales y a los operadores judiciales. Eso define cómo se planifica cada caso desde el primer día.',
  },
];

type FAQProps = Record<string, never>;

export default function FAQ(_: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion() ?? false;

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{
        backgroundColor: 'var(--color-paper)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getFAQSchema(FAQS.map((f) => ({ question: f.question, answer: f.answer })))
          ),
        }}
      />

      <div style={{ maxWidth: '90rem', margin: '0 auto', overflow: 'clip' }}>
        <h2
          id="faq-heading"
          className="section-heading"
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            color: 'var(--color-ink)',
            marginBottom: '0.875rem',
            textWrap: 'balance' as never,
          }}
        >
          Preguntas frecuentes
        </h2>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
            fontWeight: 400,
            color: 'var(--color-ink)',
            lineHeight: 1.68,
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            maxWidth: '50ch',
            textWrap: 'pretty' as never,
          }}
        >
          Las dudas más frecuentes antes de la primera consulta.
        </p>

        <dl style={{ maxWidth: '56rem', margin: 0, padding: 0 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  borderTop: '1px solid oklch(9% 0.01 245 / 0.10)',
                  ...(i === FAQS.length - 1
                    ? { borderBottom: '1px solid oklch(9% 0.01 245 / 0.10)' }
                    : {}),
                }}
              >
                <dt>
                  <button
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="faq-question-btn"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '1.375rem 0',
                      textAlign: 'left',
                      gap: '1.5rem',
                      color: 'var(--color-ink)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
                        fontWeight: isOpen ? 900 : 700,
                        lineHeight: 1.35,
                        textWrap: 'pretty' as never,
                        flex: 1,
                      }}
                    >
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        lineHeight: 1,
                        color: 'var(--color-muted)',
                        userSelect: 'none',
                        width: '1.5rem',
                        textAlign: 'center',
                      }}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: {
                          duration: prefersReduced ? 0 : 0.25,
                          ease: EASE_OUT_QUART,
                        },
                        opacity: {
                          duration: prefersReduced ? 0 : 0.2,
                          ease: 'easeOut',
                        },
                      }}
                      style={{ overflow: 'hidden', margin: 0 }}
                    >
                      <p
                        style={{
                          fontSize: 'clamp(0.9375rem, 1.2vw, 1rem)',
                          fontWeight: 400,
                          color: 'var(--color-muted)',
                          lineHeight: 1.68,
                          paddingBottom: '1.5rem',
                          maxWidth: '60ch',
                          textWrap: 'pretty' as never,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </dl>

        <div style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
          <Magnetic>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsappClick}
              className="hero-cta-primary"
              aria-label="Consultar con Fabio Mombello por WhatsApp"
            >
              Consultar por WhatsApp
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
