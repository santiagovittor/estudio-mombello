'use client';
import { useEffect, useRef, useState } from 'react';

export default function HeroCounter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [num, setNum] = useState(0);
  const [settled, setSettled] = useState(false);
  const settledRef = useRef(false);
  const [flashActive, setFlashActive] = useState(false);

  // Canvas size sync
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sync = () => {
      const w = canvas.offsetWidth || 240;
      const h = canvas.offsetHeight || 240;
      canvas.width = w;
      canvas.height = h;
    };

    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  // Counting animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      settledRef.current = true;
      const t = setTimeout(() => {
        setNum(20);
        setSettled(true);
      }, 0);
      return () => clearTimeout(t);
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let step = 0;
    const TOTAL_STEPS = 28;

    const tick = () => {
      const progress = step / TOTAL_STEPS;

      if (step >= TOTAL_STEPS) {
        setNum(20);
        settledRef.current = true;
        timeoutId = setTimeout(() => setSettled(true), 180);
        return;
      }

      let value: number;
      let delay: number;

      if (progress < 0.52) {
        value = Math.floor(Math.random() * 16) + 2;
        delay = 42;
      } else if (progress < 0.84) {
        const base = Math.round(((progress - 0.52) / 0.32) * 20);
        const jitter = Math.floor(Math.random() * 3) - 1;
        value = Math.min(19, Math.max(11, base + jitter));
        delay = 65 + Math.floor(progress * 80);
      } else {
        value = Math.random() < 0.78 ? 20 : 19;
        delay = 110;
      }

      setNum(value);
      step++;
      timeoutId = setTimeout(tick, delay);
    };

    timeoutId = setTimeout(tick, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  // Canvas chroma artifact loop
  useEffect(() => {
    if (settled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const palette: Array<(o: number) => string> = [
      (o) => `rgba(0, 218, 232, ${o})`,
      (o) => `rgba(232, 0, 208, ${o})`,
      (o) => `rgba(248, 232, 0, ${o})`,
      (o) => `rgba(255, 72, 0, ${o})`,
      (o) => `rgba(255, 242, 208, ${o})`,
    ];

    let rafId: number;
    let lastTime = 0;
    const THROTTLE = 95;

    const draw = (timestamp: number) => {
      if (settledRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      rafId = requestAnimationFrame(draw);

      if (timestamp - lastTime < THROTTLE) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bandCount = Math.floor(Math.random() * 4) + 4;
      for (let i = 0; i < bandCount; i++) {
        const y = Math.random() * canvas.height;
        const bh = Math.random() * 9 + 2;
        const opacity = Math.random() * 0.26 + 0.06;
        const colorFn = palette[Math.floor(Math.random() * palette.length)];
        ctx.fillStyle = colorFn(opacity);
        ctx.fillRect(0, y, canvas.width, bh);
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(rafId);
  }, [settled]);

  // Occasional ghost flash after settling
  useEffect(() => {
    if (!settled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleFlash = () => {
      const delay = 4000 + Math.random() * 5000;
      timeoutId = setTimeout(() => {
        setFlashActive(true);
        setTimeout(() => {
          setFlashActive(false);
          scheduleFlash();
        }, 260);
      }, delay);
    };

    scheduleFlash();
    return () => clearTimeout(timeoutId);
  }, [settled]);

  // Draw ghost signal bands when flashActive
  useEffect(() => {
    if (!flashActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chromaColors: [number, number, number][] = [
      [0, 218, 232],
      [232, 0, 208],
      [248, 232, 0],
      [255, 72, 0],
    ];
    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < count; i++) {
      const y = Math.random() * canvas.height;
      const h = Math.random() * 7 + 2;
      const opacity = Math.random() * 0.16 + 0.04;
      const [r, g, b] = chromaColors[Math.floor(Math.random() * chromaColors.length)];
      ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
      ctx.fillRect(0, y, canvas.width, h);
    }
  }, [flashActive]);

  const numberStyles = settled
    ? ({
        display: 'block',
        fontSize: 'clamp(6rem, 14vw, 12rem)',
        fontWeight: 900,
        fontFamily: 'inherit',
        lineHeight: 0.88,
        userSelect: 'none',
        color: 'oklch(95% 0.01 75 / 0.40)',
        WebkitTextFillColor: 'oklch(95% 0.01 75 / 0.40)',
        WebkitTextStroke: '0px transparent',
        textShadow: 'none',
        filter: 'none',
        transition: 'color 0.45s ease, filter 0.45s ease, text-shadow 0.45s ease',
      } as React.CSSProperties)
    : ({
        display: 'block',
        fontSize: 'clamp(6rem, 14vw, 12rem)',
        fontWeight: 900,
        fontFamily: 'inherit',
        lineHeight: 0.88,
        userSelect: 'none',
        color: 'oklch(95% 0.01 75 / 0.82)',
        WebkitTextFillColor: 'oklch(95% 0.01 75 / 0.82)',
        WebkitTextStroke: '0px transparent',
        textShadow: '2px 0 rgba(255,60,0,0.26), -2px 0 rgba(0,175,255,0.26)',
        filter: 'blur(0.28px)',
        transition: 'color 0.45s ease, filter 0.45s ease, text-shadow 0.45s ease',
      } as React.CSSProperties);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={
          {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: settled ? (flashActive ? 0.7 : 0) : 1,
            transition: 'opacity 0.55s ease',
            mixBlendMode: 'screen',
            display: 'block',
          } as React.CSSProperties
        }
      />
      <span aria-hidden="true" style={{ ...numberStyles } as React.CSSProperties}>
        {num}
      </span>
    </div>
  );
}
