"use client";

import { useEffect, useRef } from "react";

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const centerX = width / 2;
    const centerY = 180;

    const bgPoints = Array.from({ length: 110 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    function hemispherePoint(side: number) {
      const angle = Math.random() * Math.PI * 2;
      const radiusFactor = Math.pow(Math.random(), 0.5);
      const rx = 95 * radiusFactor;
      const ry = 80 * radiusFactor;
      const wobble = Math.sin(angle * 3) * 8;
      const y = centerY + Math.sin(angle) * (ry + wobble);
      return { x: centerX + side * 55 + Math.cos(angle) * rx * 0.9, y };
    }

    const brainPoints: { baseX: number; baseY: number; x: number; y: number; offset: number }[] = [];
    for (let i = 0; i < 70; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const p = hemispherePoint(side);
      brainPoints.push({ baseX: p.x, baseY: p.y, x: p.x, y: p.y, offset: Math.random() * Math.PI * 2 });
    }

    const binaryDrops = Array.from({ length: 26 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.3 + Math.random() * 0.4,
      char: Math.random() > 0.5 ? "1" : "0",
    }));

    let animationId: number;
    let t = 0;

    function draw() {
      if (!ctx) return;
      const isDark = document.documentElement.classList.contains("dark");

      const binaryColor = isDark ? "rgba(56, 189, 248, 0.18)" : "rgba(51, 65, 85, 0.15)";
      const bgLineColor = isDark ? "139, 92, 246" : "109, 40, 217";
      const bgLineToCenterColor = isDark ? "56, 189, 248" : "8, 145, 178";
      const bgDotColor = isDark ? "rgba(103, 232, 249, 0.65)" : "rgba(8, 145, 178, 0.7)";
      const brainLineColor = isDark ? "rgba(139, 92, 246, 0.55)" : "rgba(109, 40, 217, 0.45)";
      const brainDotColor = isDark ? "rgba(103, 232, 249, 1)" : "rgba(8, 145, 178, 0.95)";
      const glowColor = isDark ? "56, 189, 248" : "8, 145, 178";

      ctx.clearRect(0, 0, width, height);
      t += 0.015;

      ctx.font = "11px monospace";
      ctx.fillStyle = binaryColor;
      for (const b of binaryDrops) {
        b.y += b.speed;
        if (b.y > height) {
          b.y = 0;
          b.x = Math.random() * width;
        }
        ctx.fillText(b.char, b.x, b.y);
      }

      for (const p of bgPoints) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      for (let i = 0; i < bgPoints.length; i++) {
        for (let j = i + 1; j < bgPoints.length; j++) {
          const dx = bgPoints[i].x - bgPoints[j].x;
          const dy = bgPoints[i].y - bgPoints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(" + bgLineColor + ", " + (0.16 * (1 - dist / 95)) + ")";
            ctx.lineWidth = 1;
            ctx.moveTo(bgPoints[i].x, bgPoints[i].y);
            ctx.lineTo(bgPoints[j].x, bgPoints[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of bgPoints) {
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const distToCenter = Math.sqrt(dx * dx + dy * dy);
        if (distToCenter < 300) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(" + bgLineToCenterColor + ", " + (0.1 * (1 - distToCenter / 300)) + ")";
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(centerX, centerY);
          ctx.stroke();
        }
      }
      for (const p of bgPoints) {
        ctx.beginPath();
        ctx.fillStyle = bgDotColor;
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of brainPoints) {
        p.x = p.baseX + Math.sin(t + p.offset) * 3;
        p.y = p.baseY + Math.cos(t + p.offset) * 3;
      }
      for (let i = 0; i < brainPoints.length; i++) {
        for (let j = i + 1; j < brainPoints.length; j++) {
          const dx = brainPoints[i].x - brainPoints[j].x;
          const dy = brainPoints[i].y - brainPoints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 32) {
            ctx.beginPath();
            ctx.strokeStyle = brainLineColor;
            ctx.lineWidth = 1;
            ctx.moveTo(brainPoints[i].x, brainPoints[i].y);
            ctx.lineTo(brainPoints[j].x, brainPoints[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of brainPoints) {
        ctx.beginPath();
        ctx.fillStyle = brainDotColor;
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.strokeStyle = brainLineColor;
      ctx.lineWidth = 1;
      ctx.moveTo(centerX, centerY - 90);
      ctx.lineTo(centerX, centerY + 90);
      ctx.stroke();

      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 75);
      glow.addColorStop(0, "rgba(" + glowColor + ", 0.4)");
      glow.addColorStop(1, "rgba(" + glowColor + ", 0)");
      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute left-1/2 top-[180px] -translate-x-1/2 -translate-y-1/2 animate-float-ia">
        <div className="absolute inset-0 -m-6 rounded-full bg-cyan-400/25 dark:bg-cyan-400/35 blur-2xl animate-pulse" />
        <span
          className="relative text-4xl sm:text-5xl font-bold tracking-widest text-cyan-600 dark:text-cyan-300 drop-shadow-[0_0_10px_rgba(8,145,178,0.4)] dark:drop-shadow-[0_0_20px_rgba(56,189,248,1)]"
          style={{
            WebkitTextStroke: "2px rgba(10, 10, 10, 0.85)",
            paintOrder: "stroke fill",
          }}
        >
          IA
        </span>
      </div>
    </div>
  );
}
