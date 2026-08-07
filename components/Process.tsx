import { brand } from "@/lib/brand";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Diagnóstico inicial completo",
      desc: "Conectamos remotamente o te visitamos a domicilio en Santiago. Ejecutamos pruebas de estrés y monitoreamos frecuencias, temperaturas y salud de discos.",
      icon: "🔍",
    },
    {
      num: "02",
      title: "Optimización y limpieza profunda",
      desc: "Limpiamos procesos innecesarios, ajustamos perfiles de energía, actualizamos firmware y afinamos el sistema operativo para liberar rendimiento atrapado.",
      icon: "⚡",
    },
    {
      num: "03",
      title: "Recalibración o Upgrade justificado",
      desc: "Medimos el resultado post-optimización. Si aún se requiere una pieza (ej. más RAM o SSD), te damos el enlace de compra y cobramos solo el fee de instalación.",
      icon: "🎯",
    },
  ];

  return (
    <section id="proceso" className="py-16 sm:py-24 bg-grid-paper border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--blue)]">
            Transparencia Total
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight">
            Cómo trabajamos en cada sesión
          </h2>
          <p className="font-sans text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
            Un proceso metodológico diseñado para evitar compras a ciegas y darte certeza absoluta del estado de tu computador.
          </p>
        </div>

        {/* 3 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--line)] -translate-y-6 z-0" />

          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative z-10 bg-[var(--white)] rounded-2xl border-2 border-[var(--ink)] p-6 sm:p-8 shadow-[5px_5px_0px_0px_var(--ink)] flex flex-col gap-4 group hover:-translate-y-1 transition-transform"
            >
              {/* Step Badge */}
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-xl bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center font-mono font-bold text-xl text-[var(--ink)] group-hover:bg-[var(--blue)] group-hover:text-white transition-colors">
                  {step.num}
                </span>
                <span className="text-3xl">{step.icon}</span>
              </div>

              <h3 className="font-serif font-bold text-xl text-[var(--ink)] pt-2">
                {step.title}
              </h3>

              <p className="font-sans text-sm text-[var(--ink-soft)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

        {/* Footer Guarantee banner */}
        <div className="mt-16 p-6 rounded-2xl bg-[var(--ink)] text-[var(--paper)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--orange)] flex items-center justify-center text-white font-bold text-xl shrink-0">
              🛡️
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white">
                Garantía de Justificación Técnica
              </h4>
              <p className="font-sans text-xs text-[var(--paper-2)] mt-0.5">
                Si tras la asesoría tu equipo solo requería optimización de software, no gastarás ni un peso en piezas.
              </p>
            </div>
          </div>
          <a
            href="#planes"
            className="font-sans font-bold text-xs px-6 py-3 rounded-full bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--paper-2)] shrink-0 transition-colors"
          >
            Ver Tarifas y Precios
          </a>
        </div>

      </div>
    </section>
  );
}
