'use client';
import { useEffect, useRef } from 'react';

const SCALE = 4;
const FPS = 20;
const FRAME_MS = 1000 / FPS;

export default function HeroStatic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const setSize = () => {
      if (!canvas.offsetWidth) return;
      canvas.width = Math.floor(canvas.offsetWidth / SCALE);
      canvas.height = Math.floor(canvas.offsetHeight / SCALE);
    };

    setSize();
    if (!canvas.offsetWidth) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let lastTime = 0;

    const drawFrame = (timestamp: number) => {
      rafId = requestAnimationFrame(drawFrame);
      if (timestamp - lastTime < FRAME_MS) return;
      lastTime = timestamp;

      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const rand = Math.random();
        const v =
          rand < 0.52
            ? Math.floor(Math.random() * 60)
            : Math.floor(Math.random() * 255);
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    rafId = requestAnimationFrame(drawFrame);

    const handleResize = () => setSize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity: 0.08,
          mixBlendMode: 'overlay',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
