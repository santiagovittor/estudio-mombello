'use client';

const TICKER_TEXT = 'Penal · Laboral · Familia · 20 años de práctica · Buenos Aires · ';

const spanStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.75rem',
  fontWeight: 400,
  letterSpacing: '0.1em',
  color: 'oklch(from var(--color-ink) l c h / 0.45)',
  whiteSpace: 'nowrap',
};

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      style={{
        borderTop: '1px solid oklch(from var(--color-ink) l c h / 0.08)',
        borderBottom: '1px solid oklch(from var(--color-ink) l c h / 0.08)',
        padding: '0.6rem 0',
        overflow: 'hidden',
      }}
    >
      <div className="ticker-inner">
        <span style={spanStyle}>{TICKER_TEXT}</span>
        <span style={spanStyle}>{TICKER_TEXT}</span>
      </div>
    </div>
  );
}
