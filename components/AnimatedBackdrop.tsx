"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackdrop({ imageUrl }: { imageUrl?: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 1.6,
      a: 0.12 + Math.random() * 0.25,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Dots
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20;
        if (d.y > h + 20) d.y = -20;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.a})`;
        ctx.fill();
      }

      // Connect nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.08;
            ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image (anime vibe) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          filter: "saturate(1.05) contrast(1.05)",
          transform: "scale(1.04)",
        }}
      />
      {/* Dark overlay + gradients */}
      <div className="absolute inset-0 bg-hero-gradient opacity-95" />

      {/* Animated particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
        aria-hidden="true"
      />

      {/* Rings / lines (inspired by the reference UI) */}
      <svg
        className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[1200px] max-w-none opacity-50"
        viewBox="0 0 1200 420"
        fill="none"
        aria-hidden="true"
      >
        <g opacity="0.55">
          <ellipse cx="600" cy="280" rx="520" ry="120" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <ellipse cx="600" cy="290" rx="420" ry="96" stroke="rgba(34,211,238,0.18)" strokeWidth="2" />
          <ellipse cx="600" cy="300" rx="320" ry="74" stroke="rgba(255,43,214,0.14)" strokeWidth="2" />
        </g>
      </svg>

      {/* Subtle vertical neon bars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[18%] w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <div className="absolute top-0 bottom-0 right-[22%] w-px bg-gradient-to-b from-transparent via-neon-purple/25 to-transparent" />
        <div className="absolute top-0 bottom-0 right-[38%] w-px bg-gradient-to-b from-transparent via-neon-pink/20 to-transparent" />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 noise" />
    </div>
  );
}
