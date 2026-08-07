"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { brand } from "@/lib/brand";

export interface QuadrantInfo {
  id: "optimal" | "subinvested" | "overinvested" | "underperforming";
  label: string;
  badge: string;
  color: string;
  pointColor: string;
  readout: string;
  advice: string;
}

const QUADRANTS: Record<string, QuadrantInfo> = {
  optimal: {
    id: "optimal",
    label: "Zona Óptima",
    badge: "Equilibrio Ideal",
    color: "#2A4CFF",
    pointColor: "#2A4CFF",
    readout: "Rendimiento máximo por cada peso invertido.",
    advice:
      "Tus componentes están bien calibrados. Solo requerirías mantenimiento preventivo periódico.",
  },
  subinvested: {
    id: "subinvested",
    label: "Subinvertido",
    badge: "Exigencia Máxima",
    color: "#1E3BB8",
    pointColor: "#2A4CFF",
    readout: "Rendimiento alto con presupuesto ajustado.",
    advice:
      "Tu equipo rinde al límite. Una optimización de software o tuning focalizado evitará cuellos de botella.",
  },
  overinvested: {
    id: "overinvested",
    label: "Sobreinvertido",
    badge: "Gasto Ineficiente",
    color: "#FF5A36",
    pointColor: "#FF5A36",
    readout: "Gasto elevado sin mejora proporcional de rendimiento.",
    advice:
      "Piezas de alto costo mal configuradas o sobredimensionadas. Diagnosticamos para sacarles el 100%.",
  },
  underperforming: {
    id: "underperforming",
    label: "Bajo Rendimiento",
    badge: "Punto de Partida",
    color: "#FF5A36",
    pointColor: "#FF5A36",
    readout: "Rendimiento deficiente con presupuesto sin optimizar.",
    advice:
      "El equipo anda lento o fallando. Con asesoría previa evitas comprar piezas innecesarias.",
  },
};

export default function OptimizationMap() {
  // SVG coordinates: Center origin is (200, 170)
  // X range: [40, 360], Y range: [30, 310]
  const [point, setPoint] = useState<{ x: number; y: number }>({ x: 90, y: 250 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Intro animation: ease-out from (90, 250) to (290, 95)
  useEffect(() => {
    let startTime: number | null = null;
    const startX = 90;
    const startY = 250;
    const targetX = 290;
    const targetY = 95;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setPoint({
        x: startX + (targetX - startX) * ease,
        y: startY + (targetY - startY) * ease,
      });

      if (progress < 1 && !hasInteracted) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hasInteracted]);

  // Determine quadrant based on center (200, 170)
  const getQuadrant = useCallback((x: number, y: number): QuadrantInfo => {
    const isRight = x >= 200;
    const isTop = y <= 170;

    if (isRight && isTop) return QUADRANTS.optimal;
    if (!isRight && isTop) return QUADRANTS.subinvested;
    if (isRight && !isTop) return QUADRANTS.overinvested;
    return QUADRANTS.underperforming;
  }, []);

  const currentQuadrant = getQuadrant(point.x, point.y);

  // Handle pointer drag
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setHasInteracted(true);
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePointFromEvent(e);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    updatePointFromEvent(e);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore fallback if pointer capture was lost
    }
  };

  const updatePointFromEvent = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 400 / rect.width;
    const scaleY = 340 / rect.height;

    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;

    // Clamp coordinates inside graph bounds
    x = Math.max(35, Math.min(365, x));
    y = Math.max(25, Math.min(315, y));

    setPoint({ x, y });
  };

  return (
    <div className="w-full bg-[var(--white)] rounded-2xl border-2 border-[var(--ink)] p-4 sm:p-6 shadow-[6px_6px_0px_0px_var(--ink)] flex flex-col gap-4">
      {/* Header Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--orange)] animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            Modelo de Decisión
          </span>
        </div>
        <div className="font-mono text-xs px-2.5 py-1 rounded-full bg-[var(--paper-2)] text-[var(--ink)] font-bold border border-[var(--line)]">
          Presupuesto (X) vs. Rendimiento (Y)
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full aspect-[400/340] select-none touch-none bg-[var(--paper)] rounded-xl border border-[var(--line)] overflow-hidden">
        {/* Grid paper lines in SVG */}
        <svg
          ref={svgRef}
          viewBox="0 0 400 340"
          className="w-full h-full cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D9D6C8" strokeWidth="0.8" strokeOpacity="0.7" />
            </pattern>
            {/* Gradient background for quadrants */}
            <linearGradient id="optGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2A4CFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#2A4CFF" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="overGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF5A36" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#FF5A36" stopOpacity="0.14" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <rect width="400" height="340" fill="url(#grid)" />

          {/* Quadrant Background Colors */}
          {/* Top-Right: Optimal */}
          <rect x="200" y="20" width="185" height="150" fill="url(#optGrad)" rx="8" />
          {/* Top-Left: Subinvested */}
          <rect x="15" y="20" width="185" height="150" fill="#2A4CFF" fillOpacity="0.04" rx="8" />
          {/* Bottom-Right: Overinvested */}
          <rect x="200" y="170" width="185" height="150" fill="url(#overGrad)" rx="8" />
          {/* Bottom-Left: Underperforming */}
          <rect x="15" y="170" width="185" height="150" fill="#FF5A36" fillOpacity="0.04" rx="8" />

          {/* Center Quadrant Division Lines */}
          <line x1="200" y1="20" x2="200" y2="320" stroke="#15140F" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <line x1="15" y1="170" x2="385" y2="170" stroke="#15140F" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

          {/* Quadrant Labels */}
          <text x="375" y="38" textAnchor="end" className="font-mono text-[10px] font-bold fill-[#2A4CFF]">
            ZONA ÓPTIMA ↗
          </text>
          <text x="25" y="38" textAnchor="start" className="font-mono text-[10px] font-bold fill-[var(--ink-soft)]">
            Subinvertido
          </text>
          <text x="375" y="310" textAnchor="end" className="font-mono text-[10px] font-bold fill-[var(--orange)]">
            Sobreinvertido
          </text>
          <text x="25" y="310" textAnchor="start" className="font-mono text-[10px] font-bold fill-[var(--ink-soft)]">
            Bajo Rendimiento
          </text>

          {/* Axes Lines */}
          {/* X Axis (Presupuesto) */}
          <line x1="25" y1="320" x2="385" y2="320" stroke="#15140F" strokeWidth="2" />
          <polygon points="385,316 393,320 385,324" fill="#15140F" />
          <text x="385" y="334" textAnchor="end" className="font-mono text-[11px] font-bold fill-[#15140F]">
            Presupuesto →
          </text>

          {/* Y Axis (Rendimiento) */}
          <line x1="25" y1="320" x2="25" y2="15" stroke="#15140F" strokeWidth="2" />
          <polygon points="21,15 25,7 29,15" fill="#15140F" />
          <text x="32" y="18" textAnchor="start" className="font-mono text-[11px] font-bold fill-[#15140F]">
            Rendimiento ↑
          </text>

          {/* Target Zone Highlight (Optimal Zone Center) */}
          <circle cx="295" cy="95" r="24" fill="#2A4CFF" fillOpacity="0.12" stroke="#2A4CFF" strokeWidth="1" strokeDasharray="3 3" />
          <text x="295" y="65" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#2A4CFF]">
            Punto de meta
          </text>

          {/* Connection line from origin/current point */}
          <line
            x1="90"
            y1="250"
            x2={point.x}
            y2={point.y}
            stroke={currentQuadrant.pointColor}
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.6"
          />

          {/* Interactive Point Halo & Core */}
          <g transform={`translate(${point.x}, ${point.y})`}>
            {/* Outer Pulsing Halo */}
            <circle
              r={isDragging ? "20" : "16"}
              fill={currentQuadrant.pointColor}
              fillOpacity="0.25"
              className="transition-all duration-150 ease-out"
            />
            {/* Middle Ring */}
            <circle
              r="10"
              fill={currentQuadrant.pointColor}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              className="shadow-md"
            />
            {/* Inner Dot */}
            <circle r="4" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Drag Helper Overlay */}
        {!hasInteracted && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none bg-[var(--ink)] text-white font-mono text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 opacity-90 animate-bounce">
            <span>👈</span> Arrastra el punto para explorar
          </div>
        )}
      </div>

      {/* Dynamic Readout Card */}
      <div
        className="rounded-xl p-4 transition-all duration-300 border-2 flex flex-col gap-2"
        style={{
          backgroundColor: currentQuadrant.id === "optimal" ? "#F0F4FF" : "#FFF7F5",
          borderColor: currentQuadrant.color,
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentQuadrant.color }}
            />
            <h4 className="font-serif font-bold text-base text-[var(--ink)]">
              {currentQuadrant.label}
            </h4>
          </div>
          <span
            className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: currentQuadrant.color }}
          >
            {currentQuadrant.badge}
          </span>
        </div>

        <p className="font-sans text-sm font-semibold text-[var(--ink)] leading-snug">
          {currentQuadrant.readout}
        </p>
        <p className="font-sans text-xs text-[var(--ink-soft)] leading-relaxed">
          {currentQuadrant.advice}
        </p>
      </div>

      {/* Simulation Disclaimer */}
      <p className="font-mono text-[10px] text-[var(--ink-soft)] text-center opacity-80 border-t border-[var(--line)] pt-2">
        Simulación ilustrativa del modelo {brand.name}. El diagnóstico técnico definitivo se realiza en la sesión inicial.
      </p>
    </div>
  );
}
