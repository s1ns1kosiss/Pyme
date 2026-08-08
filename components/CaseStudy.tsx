"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";

export default function CaseStudy() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  return (
    <section id="casos" className="py-16 sm:py-24 bg-[var(--paper)] border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--orange)]">
            Caso Real Ilustrativo
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight">
            ¿Reemplazar GPU o ajustar la configuración?
          </h2>
          <p className="font-sans text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
            Un taller común sugirió cambiar la tarjeta gráfica por un monto considerablemente mayor. Nuestro diagnóstico encontró la causa real por solo la tarifa de sesión ({brand.pricing.remoteSession.formattedPrice}).
          </p>
        </div>

        {/* Case Comparison Card */}
        <div className="max-w-4xl mx-auto bg-[var(--white)] rounded-2xl border-2 border-[var(--ink)] p-6 sm:p-10 shadow-[8px_8px_0px_0px_var(--ink)] flex flex-col gap-8">
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 bg-[var(--paper-2)] p-1.5 rounded-full border border-[var(--line)] self-center">
            <button
              onClick={() => setActiveTab("before")}
              className={`font-mono text-xs font-bold px-6 py-2.5 rounded-full transition-all flex items-center gap-2 ${
                activeTab === "before"
                  ? "bg-[var(--orange)] text-white shadow-sm"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80" />
              Estado Inicial (Punto Naranja)
            </button>
            <button
              onClick={() => setActiveTab("after")}
              className={`font-mono text-xs font-bold px-6 py-2.5 rounded-full transition-all flex items-center gap-2 ${
                activeTab === "after"
                  ? "bg-[var(--blue)] text-white shadow-sm"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80" />
              Resultado (Punto Óptimo Azul)
            </button>
          </div>

          {/* Details Content */}
          {activeTab === "before" ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FFF7F5] rounded-xl p-6 sm:p-8 border-2 border-[var(--orange)]">
              <div className="md:col-span-7 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] font-mono text-xs font-bold uppercase">
                  ⚠️ El Problema Inicial
                </div>
                <h3 className="font-serif font-bold text-2xl text-[var(--ink)]">
                  Caídas drásticas de rendimiento y sobrecalentamiento
                </h3>
                <p className="font-sans text-sm text-[var(--ink-soft)] leading-relaxed">
                  El equipo sufría congelamientos periódicos y caídas severas de fluidez en momentos de alta carga. Un servicio técnico tradicional sugirió cambiar componentes principales por un alto costo.
                </p>
                <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
                  <div className="p-3 rounded-lg bg-white border border-[var(--line)]">
                    <span className="block text-[var(--ink-soft)]">Temperatura CPU:</span>
                    <span className="font-bold text-[var(--orange)] text-base">Crítica (Thermal Throttling)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[var(--line)]">
                    <span className="block text-[var(--ink-soft)]">Diagnóstico Taller Común:</span>
                    <span className="font-bold text-[var(--ink)] text-base">Reemplazo de pieza costosa</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-[var(--line)] text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] flex items-center justify-center font-bold text-2xl">
                  📉
                </div>
                <span className="font-mono text-xs font-bold text-[var(--orange)] uppercase">
                  Zona Sobreinvertida
                </span>
                <p className="font-sans text-xs text-[var(--ink-soft)]">
                  Gasto innecesario sugerido sin atacar la causa real del problema de software y temperatura.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F0F4FF] rounded-xl p-6 sm:p-8 border-2 border-[var(--blue)]">
              <div className="md:col-span-7 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[var(--blue)]/10 text-[var(--blue)] font-mono text-xs font-bold uppercase">
                  🎯 La Solución [MARCA]
                </div>
                <h3 className="font-serif font-bold text-2xl text-[var(--ink)]">
                  Tuning de software + mantención térmica
                </h3>
                <p className="font-sans text-sm text-[var(--ink-soft)] leading-relaxed">
                  Identificamos que el hardware estaba intacto. El problema era la disipación del procesador y la memoria RAM descalibrada.
                </p>
                <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
                  <div className="p-3 rounded-lg bg-white border border-[var(--line)]">
                    <span className="block text-[var(--ink-soft)]">Temperatura Final:</span>
                    <span className="font-bold text-[var(--blue)] text-base">Rango Óptimo y Estable</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[var(--line)]">
                    <span className="block text-[var(--ink-soft)]">Costo Total Servicio:</span>
                    <span className="font-bold text-[var(--blue)] text-base">Solo tarifa de sesión ({brand.pricing.remoteSession.formattedPrice})</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-[var(--line)] text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[var(--blue)]/10 text-[var(--blue)] flex items-center justify-center font-bold text-2xl">
                  🚀
                </div>
                <span className="font-mono text-xs font-bold text-[var(--blue)] uppercase">
                  Punto Óptimo Alcanzado
                </span>
                <p className="font-sans text-xs text-[var(--ink-soft)]">
                  Recuperación de la fluidez y estabilidad sin necesidad de comprar piezas nuevas.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
