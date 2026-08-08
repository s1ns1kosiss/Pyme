"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";
import BookingModal from "./BookingModal";

export default function CtaFinal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 sm:py-24 bg-[var(--paper)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl bg-[var(--ink)] text-[var(--paper)] p-8 sm:p-14 lg:p-16 border-2 border-[var(--ink)] shadow-[10px_10px_0px_0px_var(--orange)] relative overflow-hidden flex flex-col items-center text-center gap-8">
            
            {/* Subtle background decoration */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--blue)] opacity-10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[var(--orange)] opacity-10 blur-3xl pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 font-mono text-xs text-white uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[var(--orange)]" />
              Sin Capital Inmovilizado — Diagnóstico Transparente
            </div>

            {/* Title */}
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white max-w-3xl leading-tight">
              Encuentra hoy el punto donde tu presupuesto y rendimiento se alinean.
            </h2>

            <p className="font-sans text-base sm:text-lg text-[var(--line)] max-w-2xl leading-relaxed">
              Reserva tu sesión remota ({brand.pricing.remoteSession.formattedPrice}) o solicita la visita a domicilio en Santiago. Solo recomendamos una pieza nueva cuando el diagnóstico técnico lo justifica.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="font-sans font-bold text-base px-8 py-4 rounded-full bg-[var(--orange)] text-white hover:bg-[var(--white)] hover:text-[var(--ink)] shadow-lg hover:scale-105 transition-all flex items-center gap-3 border border-[var(--orange)] cursor-pointer"
              >
                <span>🗓️</span> Agendar Sesión en Agenda ({brand.pricing.remoteSession.formattedPrice})
              </button>
            </div>

            {/* Micro text */}
            <p className="font-mono text-xs text-[var(--line)] opacity-80 pt-2">
              Respuesta en menos de 30 minutos • Atención directa por los fundadores
            </p>

          </div>

        </div>
      </section>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPilar="asesoria"
        initialTipo="persona"
      />
    </>
  );
}
