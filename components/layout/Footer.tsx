import Image from 'next/image';
import { INSTAGRAM_URL, OFFICE_ADDRESS } from '@/lib/constants';

const FOOTER_LINKS = [
  { href: '#areas', label: 'Áreas de práctica' },
  { href: '#sobre-fabio', label: 'Sobre Fabio' },
  { href: '#turnos', label: 'Agendar consulta' },
  { href: '#contacto', label: 'Contacto' },
] as const;

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: 'var(--color-hero-bg)',
        borderTop: '1px solid oklch(97.5% 0.005 90 / 0.08)',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(2rem, 3vw, 3rem)',
      }}
    >
      <div
        style={{
          maxWidth: '90rem',
          margin: '0 auto',
          paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
          paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
        }}
      >
        {/* Three-column top row */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-baseline md:gap-0">

          {/* Left: Identity */}
          <div
            className="flex flex-col items-center gap-1 md:items-start"
            style={{ flex: '1 1 0' }}
          >
            <Image
              src="/logos/estudio-logo.svg"
              alt="Fabio Mombello y Asociados"
              width={1500}
              height={893}
              unoptimized
              style={{ height: '5rem', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
            <span
              style={{
                fontWeight: 400,
                fontSize: '0.8rem',
                color: 'oklch(97.5% 0.005 90 / 0.45)',
              }}
            >
              Abogado Penal · Laboral · Familia
            </span>
          </div>

          {/* Center: Nav links */}
          <nav
            aria-label="Navegación del pie de página"
            className="flex flex-col items-center gap-3"
            style={{ flex: '1 1 0' }}
          >
            {FOOTER_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="footer-link">
                {label}
              </a>
            ))}
          </nav>

          {/* Right: Instagram */}
          <div className="flex justify-center md:justify-end" style={{ flex: '1 1 0' }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-link--inline"
              aria-label="Instagram @abogadofabiomombello (se abre en nueva pestaña)"
            >
              <InstagramIcon />
              @abogadofabiomombello
            </a>
          </div>
        </div>

        {/* Hairline */}
        <div
          aria-hidden="true"
          style={{
            borderTop: '1px solid oklch(97.5% 0.005 90 / 0.08)',
            margin: '2rem 0 1.5rem',
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <p
            className="text-center md:text-left"
            style={{
              fontWeight: 400,
              fontSize: '0.75rem',
              color: 'oklch(97.5% 0.005 90 / 0.40)',
              margin: 0,
            }}
          >
            © {year} Fabio Mombello y Asociados. Todos los derechos reservados.
          </p>
          <p
            className="text-center md:text-right"
            style={{
              fontWeight: 400,
              fontSize: '0.75rem',
              color: 'oklch(97.5% 0.005 90 / 0.40)',
              margin: 0,
            }}
          >
            {OFFICE_ADDRESS}
          </p>
        </div>

        {/* Credit */}
        <div
          aria-hidden="true"
          style={{
            borderTop: '1px solid oklch(from var(--color-ink) l c h / 0.08)',
            margin: '1.5rem 0 1rem 0',
          }}
        />
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
            color: 'oklch(97.5% 0.005 90 / 0.35)',
            margin: 0,
            padding: 0,
          }}
        >
          Desarrollado por{' '}
          <a
            href="https://santiagovittor.store/ar"
            target="_blank"
            rel="noopener noreferrer"
            className="credit-link nav-link-underline"
          >
            Santiago Vittor
          </a>
        </p>
      </div>
    </footer>
  );
}
