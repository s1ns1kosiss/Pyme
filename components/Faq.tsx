"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo funciona la sesión remota de $19.990?",
      a: "Nos conectamos de forma segura mediante software de escritorio remoto (AnyDesk/TeamViewer). Ejecutamos nuestro protocolo de diagnóstico en vivo, monitoreando temperaturas, frecuencias y procesos. Dura 45 minutos y te entregamos un informe claro.",
    },
    {
      q: "¿Qué pasa si necesito comprar un componente nuevo?",
      a: `No te vendemos repuestos con sobreprecio. Te entregamos la recomendación de la pieza exacta con enlace directo al vendedor más conveniente en Chile (MercadoLibre u otra tienda). Tú la compras por tu cuenta y nosotros cobramos solo un fee fijo de instalación (${brand.pricing.componentFee.range}) si requieres el montaje.`,
    },
    {
      q: "¿Cómo funciona la mantención mensual para Pymes ($6.990/equipo)?",
      a: "Asignamos una pauta periódica de optimización remota y presencial para tu oficina. Mantenemos tu software actualizado, limpiamos espacio, detectamos fallas antes de que detengan tu trabajo y te damos soporte prioritario.",
    },
    {
      q: "¿Por qué no ofrecen servicio de venta directa de repuestos?",
      a: "Porque vender piezas genera un conflicto de interés: los talleres tradicionales ganan más cuando te hacen cambiar piezas caras. Nuestro modelo prioriza la optimización y la asesoría sincera. Solo recomendamos comprar cuando la ganancia en rendimiento realmente lo justifica.",
    },
    {
      q: "¿Realizan visitas presenciales fuera de Santiago?",
      a: "Actualmente el servicio presencial a domicilio está disponible en el Gran Santiago. Para regiones entregamos el servicio de asesoría y optimización remota con el 100% de la eficacia en software.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[var(--paper-2)] border-b border-[var(--line)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 flex flex-col gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--orange)]">
            Dudas Comunes
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="font-sans text-base text-[var(--ink-soft)]">
            Todo lo que necesitas saber sobre nuestro modelo transparente.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-[var(--ink)] bg-[var(--white)] overflow-hidden shadow-[4px_4px_0px_0px_var(--ink)] transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-lg text-[var(--ink)] hover:text-[var(--blue)] transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="w-8 h-8 rounded-full bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center font-mono text-sm text-[var(--ink)] shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 font-sans text-sm text-[var(--ink-soft)] leading-relaxed border-t border-[var(--line)]/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
