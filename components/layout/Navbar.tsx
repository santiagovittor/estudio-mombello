'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_URL } from '@/lib/constants';
import { trackWhatsappClick } from '@/lib/analytics';

const NAV_LINKS = [
  { href: '#areas', label: 'Áreas' },
  { href: '#sobre-fabio', label: 'Sobre Fabio' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColor = scrolled ? 'var(--color-ink)' : 'var(--color-hero-text)';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'var(--color-paper)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 oklch(9% 0.01 245 / 0.08)' : 'none',
        transition: 'background-color 300ms ease, box-shadow 300ms ease',
      }}
    >
      <div
        className="h-24 md:h-28"
        style={{
          maxWidth: '90rem',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 6rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <Link
          href="/"
          aria-label="Ir al inicio"
          style={{ flexShrink: 0, lineHeight: 0 }}
        >
          <Image
            src="/logos/estudio-logo.svg"
            alt="Fabio Mombello y Asociados"
            width={1500}
            height={893}
            unoptimized
            className="h-20 md:h-24 w-auto"
            style={{
              filter: scrolled ? 'brightness(0)' : 'none',
              transition: 'filter 300ms ease',
            }}
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden md:flex" style={{ alignItems: 'center', gap: '2rem' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link nav-link-underline"
              style={{ color: textColor, transition: 'color 300ms ease, opacity 200ms ease' }}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsappClick}
          className="nav-cta"
          aria-label="Escribir por WhatsApp"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
