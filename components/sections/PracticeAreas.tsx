'use client';

import { WHATSAPP_URL } from '@/lib/constants';
import { trackWhatsappClick } from '@/lib/analytics';
import Magnetic from '@/components/ui/Magnetic';

interface PracticeArea {
  id: string;
  name: string;
  tagline: string;
  cases: string[];
}

const AREAS: PracticeArea[] = [
  {
    id: 'penal',
    name: 'Derecho Penal',
    tagline: 'Defiendo su caso desde la primera audiencia.',
    cases: [
      'Causas penales federales y provinciales',
      'Defensa en flagrancia en Buenos Aires',
      'Excarcelaciones y exenciones de prisión',
      'Delitos económicos y financieros',
      'Violencia de género',
    ],
  },
  {
    id: 'laboral',
    name: 'Derecho Laboral',
    tagline: 'Conozco cada recurso para proteger su trabajo.',
    cases: [
      'Despidos injustificados y liquidaciones',
      'Accidentes de trabajo en Buenos Aires',
      'Acoso laboral y ambiente hostil',
      'Convenios colectivos y negociaciones',
      'Reclamos ante el SECLO y la Justicia',
    ],
  },
  {
    id: 'familia',
    name: 'Derecho de Familia',
    tagline: 'Acompaño su proceso con claridad y firmeza.',
    cases: [
      'Divorcios y separaciones en Buenos Aires',
      'Cuota alimentaria y régimen de visitas',
      'Tenencia y custodia de hijos',
      'Violencia doméstica y medidas de protección',
      'Sucesiones y herencias',
    ],
  },
];

type PracticeAreasProps = Record<string, never>;

export default function PracticeAreas(_: PracticeAreasProps) {
  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      style={{
        backgroundColor: 'var(--color-paper)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
        paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto', overflow: 'clip' }}>
        <h2
          id="areas-heading"
          className="section-heading"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            color: 'var(--color-ink)',
            marginBottom: '0.875rem',
            textWrap: 'balance' as never,
          }}
        >
          Áreas de práctica
        </h2>

        <p
          className="reveal-paragraph"
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
          <span className="reveal-line">Trabajo en penal, laboral y familia.</span>
          <span className="reveal-line">Cuénteme su caso.</span>
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            columnGap: 'clamp(3rem, 6vw, 6rem)',
            rowGap: 'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          {AREAS.map((area) => (
            <div
              key={area.id}
              style={{
                borderTop: '1px solid var(--color-ink)',
                paddingTop: '1.5rem',
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: 'var(--color-ink)',
                  marginBottom: '0.75rem',
                  textWrap: 'balance' as never,
                }}
              >
                {area.name}
              </h3>

              <p
                className="reveal-paragraph"
                style={{
                  fontSize: 'clamp(0.9375rem, 1.2vw, 1rem)',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  lineHeight: 1.5,
                  letterSpacing: '0.005em',
                  marginBottom: '1.25rem',
                }}
              >
                <span className="reveal-line">{area.tagline}</span>
              </p>

              <ul
                aria-label={`Casos de ${area.name}`}
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {area.cases.map((c) => (
                  <li
                    key={c}
                    style={{
                      fontSize: 'clamp(0.875rem, 1.1vw, 0.9375rem)',
                      fontWeight: 400,
                      color: 'oklch(9% 0.01 245 / 0.85)',
                      lineHeight: 1.5,
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
          <Magnetic>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsappClick}
              className="hero-cta-primary"
              aria-label="Escribir a Fabio Mombello por WhatsApp para consultar sobre sus áreas de práctica"
            >
              Escribir por WhatsApp
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
