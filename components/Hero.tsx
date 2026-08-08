"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";
import OptimizationMap from "./OptimizationMap";
import BookingModal from "./BookingModal";

export default function Hero() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-grid-paper border-b border-[var(--line)] py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Value Proposition */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[var(--paper-2)] border border-[var(--line)] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--blue)]" />
                <span className="font-mono text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
                  Servicio Humano & Personalizado en Santiago
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--ink)] tracking-tight leading-[1.1]">
                El punto exacto donde tu{" "}
                <span className="relative inline-block text-[var(--orange)] underline decoration-wavy decoration-2 underline-offset-4">
                  presupuesto
                </span>{" "}
                y el{" "}
                <span className="relative inline-block text-[var(--blue)] underline decoration-wavy decoration-2 underline-offset-4">
                  rendimiento
                </span>{" "}
                se encuentran.
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-lg sm:text-xl text-[var(--ink-soft)] leading-relaxed max-w-2xl">
                {brand.valueProp}
              </p>

              {/* Audience Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                <div className="p-3.5 rounded-xl bg-[var(--white)] border border-[var(--line)] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#FF5A36]/10 text-[var(--orange)] font-bold text-sm">
                    🎮
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                      Gamers e Individuos
                    </h4>
                    <p className="font-sans text-xs text-[var(--ink-soft)] mt-0.5">
                      Máximo FPS por peso gastado. Evita cuellos de botella sin cambiar todo el PC.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--white)] border border-[var(--line)] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#2A4CFF]/10 text-[var(--blue)] font-bold text-sm">
                    🏢
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                      Pymes & Oficinas
                    </h4>
                    <p className="font-sans text-xs text-[var(--ink-soft)] mt-0.5">
                      Plan mensual desde {brand.pricing.pymeMaintenance.formattedPricePerPc}/equipo. Cero sorpresas presupuestarias.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="font-sans font-bold text-base px-7 py-3.5 rounded-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:scale-[1.02] shadow-lg transition-all flex items-center gap-3 border border-[var(--ink)] cursor-pointer"
                >
                  <span>🗓️</span> Agendar Sesión ({brand.pricing.remoteSession.formattedPrice})
                </button>

                <a
                  href="#servicios"
                  className="font-sans font-semibold text-base px-6 py-3.5 rounded-full bg-[var(--white)] text-[var(--ink)] hover:bg-[var(--paper-2)] border border-[var(--line)] transition-colors"
                >
                  Conocer los 3 Pilares ↓
                </a>
              </div>

              {/* Micro Guarantee */}
              <div className="flex items-center gap-4 text-xs font-mono text-[var(--ink-soft)] pt-1">
                <span className="flex items-center gap-1">
                  ✓ Atención por personas reales
                </span>
                <span className="flex items-center gap-1">
                  ✓ Sin comisión por repuestos
                </span>
              </div>

            </div>

            {/* Right Column: Signature Interactive Optimization Map Component */}
            <div className="lg:col-span-5 w-full">
              <OptimizationMap />
            </div>

          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialPilar="asesoria"
        initialTipo="persona"
      />
    </>
  );
}
