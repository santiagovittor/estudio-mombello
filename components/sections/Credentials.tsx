import Image from 'next/image';

type CredentialsProps = Record<string, never>;

export default function Credentials(_: CredentialsProps) {
  return (
    <section
      id="credenciales"
      aria-labelledby="credentials-heading"
      style={{
        backgroundColor: 'var(--color-paper)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
        paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
        <h2
          id="credentials-heading"
          className="section-heading"
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            color: 'var(--color-ink)',
            textWrap: 'balance' as never,
            marginBottom: '1.25rem',
          }}
        >
          Formación y trayectoria
        </h2>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
            fontWeight: 400,
            color: 'oklch(9% 0.01 245 / 0.70)',
            lineHeight: 1.68,
            maxWidth: '52ch',
            textWrap: 'pretty' as never,
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          Dr. Fabio Mombello se formó en la Universidad Abierta Interamericana, una de las instituciones jurídicas de referencia en Buenos Aires.
        </p>

        <Image
          src="/logos/uai.svg"
          alt="Universidad Abierta Interamericana"
          width={1500}
          height={1048}
          unoptimized
          style={{ height: '6rem', width: 'auto' }}
        />

        <div
          aria-hidden="true"
          style={{ borderTop: '1px solid oklch(9% 0.01 245 / 0.08)', margin: '2rem 0 1.5rem' }}
        />

        <div className="grid md:grid-cols-2" style={{ gap: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 400, color: 'oklch(9% 0.01 245 / 0.75)', lineHeight: 1.68, margin: 0, maxWidth: '62ch' }}>
            20 años de ejercicio profesional en el fuero penal, laboral y de familia en tribunales de Buenos Aires.
          </p>
          <p style={{ fontSize: '0.875rem', fontWeight: 400, color: 'oklch(9% 0.01 245 / 0.75)', lineHeight: 1.68, margin: 0 }}>
            Matrícula profesional activa. Colegio Público de Abogados de la Capital Federal.
          </p>
        </div>
      </div>
    </section>
  );
}
