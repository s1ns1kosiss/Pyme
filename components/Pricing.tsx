"use client";

import { useState } from "react";
import { brand, getWhatsAppUrl } from "@/lib/brand";
import BookingModal from "./BookingModal";

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPilar, setSelectedPilar] = useState<"asesoria" | "optimizacion" | "componentes">("asesoria");
  const [selectedTipo, setSelectedTipo] = useState<"persona" | "empresa">("persona");

  const plans = [
    {
      name: "Sesión Remota",
      subtitle: "Evaluación & Tuning Inicial",
      price: brand.pricing.remoteSession.formattedPrice,
      period: "sesión única",
      badge: "Ideal Gamers / Personas",
      badgeStyle: "bg-[var(--paper-2)] text-[var(--ink)] border border-[var(--line)]",
      features: [
        "Duración: 45 minutos intensivos",
        "Diagnóstico de temperaturas y cuellos de botella",
        "Optimización de software y arranque",
        "Informe final con recomendaciones justificadas",
      ],
      ctaText: "Agendar Sesión Remota",
      pilar: "asesoria" as const,
      tipo: "persona" as const,
      featured: false,
    },
    {
      name: "Sesión Presencial",
      subtitle: "Diagnóstico a Domicilio en Santiago",
      price: brand.pricing.onsiteSession.formattedPrice,
      period: "sesión única a domicilio",
      badge: "Recomendado Santiago",
      badgeStyle: "bg-[var(--orange)] text-white font-bold",
      features: [
        "Atención presencial en tu casa u oficina",
        "Inspección física de hardware y pasta térmica",
        "Limpieza y orden de cables si aplica",
        "Recalibración de sistema en tiempo real",
      ],
      ctaText: "Agendar Visita Presencial",
      pilar: "asesoria" as const,
      tipo: "persona" as const,
      featured: false,
    },
    {
      name: "Mantención Pyme",
      subtitle: "Suscripción Mensual por Equipo",
      price: brand.pricing.pymeMaintenance.formattedPricePerPc,
      period: "por equipo / mes (mínimo 3 equipos)",
      badge: "Mejor Valor Pyme",
      badgeStyle: "bg-[var(--blue)] text-white font-bold",
      features: [
        "Soporte continuo y monitoreo preventivo",
        "Atención prioritaria presencial o remota",
        "Ejemplo: 6 equipos = ~$41.940/mes total",
        "Mismo valor que 1 sola visita puntual de la competencia",
      ],
      ctaText: "Agendar Plan Pyme",
      pilar: "optimizacion" as const,
      tipo: "empresa" as const,
      featured: true,
    },
  ];

  const handleOpenBooking = (pilar: "asesoria" | "optimizacion" | "componentes", tipo: "persona" | "empresa") => {
    setSelectedPilar(pilar);
    setSelectedTipo(tipo);
    setModalOpen(true);
  };

  return (
    <>
      <section id="planes" className="py-16 sm:py-24 bg-grid-paper border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--blue)]">
              Transparencia de Precios
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight">
              Tarifas fijas, sin cobros sorpresa por repuestos
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
              Compara nuestro valor directo contra los cobros por hora ($30.000–$60.000/hr) del mercado tradicional de soporte técnico en Santiago.
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 border-[var(--ink)] bg-[var(--white)] p-6 sm:p-8 flex flex-col justify-between transition-all hover:-translate-y-1 ${
                  plan.featured
                    ? "shadow-[8px_8px_0px_0px_var(--ink)] ring-2 ring-[var(--blue)]/40 relative"
                    : "shadow-[5px_5px_0px_0px_var(--ink)]"
                }`}
              >
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`font-mono text-[10px] px-3 py-1 rounded-full uppercase tracking-wider ${plan.badgeStyle}`}>
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[var(--ink)]">
                    {plan.name}
                  </h3>
                  <p className="font-sans text-xs text-[var(--ink-soft)] mt-1">
                    {plan.subtitle}
                  </p>

                  {/* Price Display */}
                  <div className="my-6 pb-6 border-b border-[var(--line)]">
                    <span className="font-mono font-bold text-4xl text-[var(--ink)] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="font-mono text-xs text-[var(--ink-soft)] block mt-1">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features Checklist */}
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="font-sans text-xs text-[var(--ink)] flex items-start gap-2.5">
                        <span className="text-[var(--blue)] font-bold text-sm shrink-0">✓</span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-6 border-t border-[var(--line)] mt-8">
                  <button
                    onClick={() => handleOpenBooking(plan.pilar, plan.tipo)}
                    className={`w-full font-sans font-bold text-sm py-3.5 px-4 rounded-full text-center transition-all flex items-center justify-center gap-2 border border-[var(--ink)] cursor-pointer ${
                      plan.featured
                        ? "bg-[var(--blue)] text-white hover:bg-[var(--ink)] shadow-md"
                        : "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]"
                    }`}
                  >
                    <span>🗓️</span> {plan.ctaText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise / Fleets Custom Quote Banner */}
          <div className="rounded-2xl border-2 border-[var(--ink)] bg-[var(--paper-2)] p-6 sm:p-8 shadow-[6px_6px_0px_0px_var(--ink)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--ink)] text-white flex items-center justify-center font-bold text-xl shrink-0">
                🏢
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl text-[var(--ink)]">
                  ¿Tienes más de 15 equipos o requieres cotización de flota?
                </h4>
                <p className="font-sans text-xs text-[var(--ink-soft)] mt-1">
                  Ofrecemos tarifas corporativas personalizadas con SLA prioritario y diagnósticos programados.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenBooking("optimizacion", "empresa")}
              className="font-sans font-bold text-xs px-6 py-3.5 rounded-full bg-[var(--ink)] text-white hover:bg-[var(--ink-soft)] shrink-0 transition-colors border border-[var(--ink)] cursor-pointer"
            >
              Cotizar Flota Corporativa →
            </button>
          </div>

        </div>
      </section>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPilar={selectedPilar}
        initialTipo={selectedTipo}
      />
    </>
  );
}
