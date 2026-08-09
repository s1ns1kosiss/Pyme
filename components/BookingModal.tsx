"use client";

import { useState } from "react";
import { brand, getWhatsAppUrl } from "@/lib/brand";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPilar?: "asesoria" | "optimizacion" | "componentes";
  initialTipo?: "persona" | "empresa";
}

export default function BookingModal({
  isOpen,
  onClose,
  initialPilar = "asesoria",
  initialTipo = "persona",
}: BookingModalProps) {
  const [formData, setFormData] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      nombre: "",
      email: "",
      telefono: "",
      tipoCliente: initialTipo,
      pilar: initialPilar,
      tipoEquipo: "",
      usoPrincipal: "",
      fecha: tomorrow.toISOString().split("T")[0],
      planEscrito: "",
    };
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle" });

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Ocurrió un error al agendar.");
      }

      setStatus({
        type: "success",
        message: data.message || "¡Agendamiento registrado exitosamente!",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado.";
      setStatus({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[var(--paper)] rounded-2xl border-2 border-[var(--ink)] shadow-[10px_10px_0px_0px_var(--ink)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--line)] bg-[var(--white)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-bold text-sm">
              🗓️
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[var(--ink)]">
                Agendar Sesión de Diagnóstico
              </h3>
              <p className="font-mono text-xs text-[var(--ink-soft)]">
                Reserva tu cupo en la agenda [{brand.name}]
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center text-lg font-bold text-[var(--ink-soft)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {status.type === "success" ? (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-8">
              <div className="w-16 h-16 rounded-full bg-[var(--blue)]/10 text-[var(--blue)] border-2 border-[var(--blue)] flex items-center justify-center text-3xl">
                ✓
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-serif font-bold text-2xl text-[var(--ink)]">
                  ¡Reserva Registrada!
                </h4>
                <p className="font-sans text-sm text-[var(--ink-soft)] max-w-md">
                  {status.message} Hemos guardado tu solicitud en nuestra agenda de sesiones. Te contactaremos a{" "}
                  <strong className="text-[var(--ink)]">{formData.email}</strong> para coordinar la conexión.
                </p>
              </div>

              {/* Secondary WhatsApp quick option */}
              <div className="p-4 rounded-xl bg-[var(--paper-2)] border border-[var(--line)] text-left flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-md mt-2">
                <div className="text-xs font-sans text-[var(--ink-soft)]">
                  ¿Quieres agilizar la confirmación inmediata?
                </div>
                <a
                  href={getWhatsAppUrl(
                    `Hola, acabo de agendar una sesión en el sitio a nombre de ${formData.nombre} (${formData.email}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold px-4 py-2 rounded-full bg-[#25D366] text-white hover:opacity-90 shrink-0 transition-opacity flex items-center gap-1.5"
                >
                  💬 Confirmar por WA
                </a>
              </div>

              <button
                onClick={onClose}
                className="mt-4 font-sans font-bold text-sm px-8 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] transition-colors"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Segment Toggle */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-bold text-[var(--ink-soft)] uppercase">
                  Tipo de Cliente
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-[var(--paper-2)] border border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCliente: "persona" })}
                    className={`py-2 rounded-lg font-sans text-xs font-bold transition-all ${
                      formData.tipoCliente === "persona"
                        ? "bg-[var(--white)] text-[var(--ink)] shadow-xs border border-[var(--line)]"
                        : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    }`}
                  >
                    🎮 Gamer / Persona ($19.990)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCliente: "empresa" })}
                    className={`py-2 rounded-lg font-sans text-xs font-bold transition-all ${
                      formData.tipoCliente === "empresa"
                        ? "bg-[var(--white)] text-[var(--ink)] shadow-xs border border-[var(--line)]"
                        : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    }`}
                  >
                    🏢 Pyme / Empresa ($6.990/pc)
                  </button>
                </div>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold text-[var(--ink-soft)] uppercase">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Constanza Silva"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--white)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold text-[var(--ink-soft)] uppercase">
                    Email de Contacto *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nombre@correo.cl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--white)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold text-[var(--ink-soft)] uppercase">
                    Teléfono / WhatsApp (Opcional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--white)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold text-[var(--ink-soft)] uppercase">
                    Fecha Preferida
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--white)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                  />
                </div>
              </div>

              {/* Pilar Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-bold text-[var(--ink-soft)] uppercase">
                  Pilar del Servicio
                </label>
                <select
                  value={formData.pilar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pilar: e.target.value as "asesoria" | "optimizacion" | "componentes",
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--white)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                >
                  <option value="asesoria">
                    Pilar 1: Asesoria Remota ($19.990) / Presencial ($34.990)
                  </option>
                  <option value="optimizacion">
                    Pilar 2: Optimización & Mantención Pyme ($6.990/equipo)
                  </option>
                  <option value="componentes">
                    Pilar 3: Instalación de Componentes (Fee $12.000-$15.000)
                  </option>
                </select>
              </div>

              {/* Equipment details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold text-[var(--ink-soft)] uppercase">
                    Tipo de Equipo / Marca
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Desktop Armado / 4 Laptops HP"
                    value={formData.tipoEquipo}
                    onChange={(e) => setFormData({ ...formData, tipoEquipo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--white)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold text-[var(--ink-soft)] uppercase">
                    Sintoma o Uso Principal
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Caída de FPS / PC lento al iniciar"
                    value={formData.usoPrincipal}
                    onChange={(e) => setFormData({ ...formData, usoPrincipal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--white)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
                  />
                </div>
              </div>

              {/* Status Banner & Safety Net WhatsApp Fallback */}
              {status.type === "error" && (
                <div className="p-4 rounded-xl bg-[#FFF7F5] border-2 border-[var(--orange)] flex flex-col gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl">⚠️</span>
                    <div className="text-xs text-[var(--ink)] font-medium leading-relaxed">
                      <strong>No pudimos registrar tu sesión automáticamente:</strong>
                      <p className="text-[var(--ink-soft)] mt-0.5">{status.message}</p>
                    </div>
                  </div>
                  <a
                    href={getWhatsAppUrl(
                      `Hola, intenté agendar en el sitio a nombre de ${formData.nombre || "cliente"} (${formData.email || "sin email"}) pero el sistema automático no respondió. Me gustaría agendar por acá.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full font-mono text-xs font-bold py-2.5 px-4 rounded-lg bg-[#25D366] text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-center"
                  >
                    💬 Agendar directamente vía WhatsApp ahora
                  </a>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-sans font-semibold text-xs px-5 py-2.5 rounded-full border border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)] transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="font-sans font-bold text-sm px-7 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] disabled:opacity-50 shadow-md transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <span>✨</span> Confirmar Agendamiento
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
