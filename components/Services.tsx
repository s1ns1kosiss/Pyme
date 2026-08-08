"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";
import BookingModal from "./BookingModal";

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPilar, setSelectedPilar] = useState<
    "asesoria" | "optimizacion" | "componentes"
  >("asesoria");
  const [selectedTipo, setSelectedTipo] = useState<"persona" | "empresa">(
    "persona"
  );

  const pillars = [
    {
      step: "01",
      title: "Asesoría",
      subtitle: "La Puerta de Entrada",
      badge: "Hook Inicial",
      badgeColor: "bg-[var(--orange)] text-white",
      description:
        "Evaluamos el estado real de tu equipo antes de que gastes un solo peso en compras. Analizamos temperatura, software, cuellos de botella y hábitos de uso.",
      price: `Desde ${brand.pricing.remoteSession.formattedPrice} remota (${brand.pricing.remoteSession.duration})`,
      points: [
        "Diagnóstico de causas raíz (no solo síntomas)",
        "Informe claro con prioridad de inversión",
        "Presencial a domicilio por " + brand.pricing.onsiteSession.formattedPrice,
      ],
      ctaText: "Agendar Asesoría",
      pilar: "asesoria" as const,
      tipo: "persona" as const,
      featured: false,
    },
    {
      step: "02",
      title: "Optimización",
      subtitle: "Rendimiento Inmediato",
      badge: "Mayor Margen & Recurrencia",
      badgeColor: "bg-[var(--blue)] text-white",
      description:
        "Limpieza profunda de software, ajuste de registros, actualización de BIOS, curvas de ventilación y tuning de sistema para recuperar la velocidad perdida.",
      price: `Sesión única o Mantención Pyme desde ${brand.pricing.pymeMaintenance.formattedPricePerPc}/mes`,
      points: [
        "Eliminación de procesos ocultos y bloatware",
        "Calibración de temperaturas y frecuencias",
        "Planes de mantención mensual para oficinas",
      ],
      ctaText: "Ver Planes de Optimización",
      pilar: "optimizacion" as const,
      tipo: "persona" as const,
      featured: true,
    },
    {
      step: "03",
      title: "Componentes",
      subtitle: "Transparencia Absoluta",
      badge: "Fee Fijo Sin Conflicto de Interés",
      badgeColor: "bg-[var(--ink)] text-white",
      description:
        "Si el diagnóstico confirma que necesitas un cambio físico, te recomendamos la pieza exacta con link directo. Tú la compras al mejor precio; nosotros la instalamos.",
      price: `Fee de instalación: ${brand.pricing.componentFee.range}`,
      points: [
        "Cero cobro por sobreprecio en repuestos",
        "Asesoría de compatibilidad de marcas y sockets",
        "Instalación presencial + recalibración post-upgrade",
      ],
      ctaText: "Consultar por Upgrade",
      pilar: "componentes" as const,
      tipo: "persona" as const,
      featured: false,
    },
  ];

  const handleOpenBooking = (
    pilar: "asesoria" | "optimizacion" | "componentes",
    tipo: "persona" | "empresa"
  ) => {
    setSelectedPilar(pilar);
    setSelectedTipo(tipo);
    setModalOpen(true);
  };

  return (
    <>
      <section
        id="servicios"
        className="py-16 sm:py-24 bg-[var(--paper-2)] border-b border-[var(--line)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--orange)]">
              Modelo de Servicio en 3 Pasos
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight">
              Primero diagnosticamos. Después optimizamos. Solo al final compramos.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
              Eliminamos el incentivo de los talleres tradicionales que ganan vendiéndote repuestos que no necesitas. Nuestro embudo está diseñado para proteger tu presupuesto.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`rounded-2xl border-2 border-[var(--ink)] bg-[var(--white)] p-6 sm:p-8 flex flex-col justify-between transition-all hover:-translate-y-1 ${
                  pillar.featured
                    ? "shadow-[8px_8px_0px_0px_var(--ink)] ring-2 ring-[var(--blue)]/30 relative"
                    : "shadow-[5px_5px_0px_0px_var(--ink)]"
                }`}
              >
                <div className="flex flex-col gap-4">
                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-2xl text-[var(--ink-soft)] opacity-40">
                      {pillar.step}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${pillar.badgeColor}`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[var(--ink)]">
                      {pillar.title}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <p className="font-sans text-sm text-[var(--ink-soft)] leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Price pill */}
                  <div className="my-2 p-3 rounded-xl bg-[var(--paper)] border border-[var(--line)] font-mono text-xs font-bold text-[var(--ink)]">
                    💳 {pillar.price}
                  </div>

                  {/* Points checklist */}
                  <ul className="flex flex-col gap-2 my-2">
                    {pillar.points.map((pt, i) => (
                      <li
                        key={i}
                        className="font-sans text-xs text-[var(--ink)] flex items-start gap-2"
                      >
                        <span className="text-[var(--blue)] font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-6 border-t border-[var(--line)] mt-6">
                  <button
                    onClick={() =>
                      handleOpenBooking(pillar.pilar, pillar.tipo)
                    }
                    className={`w-full font-sans font-bold text-sm py-3 px-4 rounded-full text-center transition-all flex items-center justify-center gap-2 border border-[var(--ink)] cursor-pointer ${
                      pillar.featured
                        ? "bg-[var(--blue)] text-white hover:bg-[var(--ink)] hover:text-white shadow-md"
                        : "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]"
                    }`}
                  >
                    <span>🗓️</span> {pillar.ctaText}
                  </button>
                </div>
              </div>
            ))}
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
