"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/brand";

interface Componente {
  id: string;
  nombre: string;
  categoria: string;
  precioReferencia: number | null;
}

interface Recomendacion {
  id: string;
  sesionId: string;
  componenteId: string;
  estado: "sugerido" | "cotizado" | "comprado" | "instalado" | "descartado";
  createdAt: string;
  componente: Componente;
}

interface Equipo {
  id: string;
  tipoEquipo: string;
  usoPrincipal: string | null;
}

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  tipo: "persona" | "empresa";
}

interface Sesion {
  id: string;
  pilar: "asesoria" | "optimizacion" | "componentes";
  estado: "agendada" | "en_curso" | "completada" | "cancelada";
  fecha: string;
  planEscrito: string | null;
  createdAt: string;
  cliente: Cliente;
  equipo: Equipo | null;
  recomendaciones: Recomendacion[];
}

export default function AdminPage() {
  const [sessions, setSessions] = useState<Sesion[]>([]);
  const [catalog, setCatalog] = useState<Componente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected componentId per session for inline recommendation dropdown
  const [selectedCompPerSession, setSelectedCompPerSession] = useState<{
    [sesionId: string]: string;
  }>({});

  const fetchCatalog = async () => {
    try {
      const res = await fetch("/api/admin/components");
      const data = await res.json();
      if (res.ok && data.success) {
        setCatalog(data.data);
      }
    } catch {
      console.error("Error al cargar catálogo de componentes.");
    }
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/sessions");
      const data = await res.json();
      if (res.ok && data.success) {
        setSessions(data.data);
      } else {
        setError(data.error || "No se pudieron cargar las sesiones.");
      }
    } catch {
      setError("Error al conectar con la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
    fetchSessions();
  }, []);

  const handleUpdateStatus = async (
    recomendacionId: string,
    newStatus: "sugerido" | "cotizado" | "comprado" | "instalado" | "descartado"
  ) => {
    try {
      const res = await fetch("/api/admin/recommendations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: recomendacionId, estado: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSessions((prev) =>
          prev.map((s) => ({
            ...s,
            recomendaciones: s.recomendaciones.map((r) =>
              r.id === recomendacionId ? { ...r, estado: newStatus } : r
            ),
          }))
        );
      } else {
        alert(data.error || "No se pudo actualizar el estado.");
      }
    } catch {
      alert("Error al actualizar la recomendación.");
    }
  };

  const handleAddRecommendation = async (sesionId: string) => {
    const componenteId = selectedCompPerSession[sesionId];
    if (!componenteId) {
      alert("Selecciona un componente del catálogo.");
      return;
    }

    try {
      const res = await fetch("/api/admin/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesionId,
          componenteId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSelectedCompPerSession((prev) => ({
          ...prev,
          [sesionId]: "",
        }));
        fetchSessions();
      } else {
        alert(data.error || "No se pudo agregar la recomendación.");
      }
    } catch {
      alert("Error al guardar la recomendación.");
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "sugerido":
        return "bg-[#FFF7F5] text-[var(--orange)] border-[var(--orange)]";
      case "cotizado":
        return "bg-[#FEFCE8] text-[#A16207] border-[#EAB308]";
      case "comprado":
        return "bg-[#F0F4FF] text-[var(--blue)] border-[var(--blue)]";
      case "instalado":
        return "bg-[#F0FDF4] text-[#15803D] border-[#22C55E]";
      case "descartado":
        return "bg-[#F3F4F6] text-[#4B5563] border-[#9CA3AF]";
      default:
        return "bg-[var(--paper-2)] text-[var(--ink)] border-[var(--line)]";
    }
  };

  return (
    <div className="min-h-screen bg-grid-paper py-10 px-4 sm:px-6 lg:px-8 selection:bg-[var(--orange)] selection:text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-[var(--white)] rounded-2xl border-2 border-[var(--ink)] shadow-[6px_6px_0px_0px_var(--ink)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--ink)] text-white flex items-center justify-center font-bold text-lg">
              🛠️
            </div>
            <div>
              <h1 className="font-serif font-bold text-2xl text-[var(--ink)]">
                Panel Interno de Gestión — [{brand.name}]
              </h1>
              <p className="font-mono text-xs text-[var(--ink-soft)]">
                Seguimiento de Sesiones y Recomendación de Componentes del Catálogo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchCatalog();
                fetchSessions();
              }}
              className="font-mono text-xs font-bold px-4 py-2 rounded-full bg-[var(--paper-2)] border border-[var(--line)] hover:bg-[var(--paper)] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              🔄 Actualizar Datos
            </button>
            <Link
              href="/"
              className="font-sans text-xs font-semibold px-4 py-2 rounded-full bg-[var(--ink)] text-white hover:bg-[var(--ink-soft)] transition-colors"
            >
              Ver Landing →
            </Link>
          </div>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="p-12 text-center font-mono text-sm text-[var(--ink-soft)] bg-[var(--white)] rounded-2xl border border-[var(--line)]">
            Cargando sesiones y recomendaciones desde la base de datos...
          </div>
        ) : error ? (
          <div className="p-6 bg-[#FFF7F5] border-2 border-[var(--orange)] rounded-2xl text-[var(--orange)] font-mono text-sm">
            ⚠️ {error}
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-12 text-center bg-[var(--white)] rounded-2xl border-2 border-[var(--ink)] shadow-[5px_5px_0px_0px_var(--ink)] flex flex-col items-center gap-3">
            <span className="text-3xl">📭</span>
            <h3 className="font-serif font-bold text-xl text-[var(--ink)]">
              No hay sesiones agendadas aún
            </h3>
            <p className="font-sans text-xs text-[var(--ink-soft)]">
              Ingresa al formulario en el home para agendar una sesión de prueba.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {sessions.map((session) => {
              const currentSelectedComp = selectedCompPerSession[session.id] || "";

              return (
                <div
                  key={session.id}
                  className="bg-[var(--white)] rounded-2xl border-2 border-[var(--ink)] p-6 sm:p-8 shadow-[6px_6px_0px_0px_var(--ink)] flex flex-col gap-6"
                >
                  {/* Session Overview Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-full uppercase bg-[var(--ink)] text-white">
                        {session.cliente.tipo}
                      </span>
                      <div>
                        <h3 className="font-serif font-bold text-xl text-[var(--ink)]">
                          {session.cliente.nombre}
                        </h3>
                        <p className="font-sans text-xs text-[var(--ink-soft)]">
                          {session.cliente.email} • {session.cliente.telefono || "Sin teléfono"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      <div className="px-3 py-1 rounded-full bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)] font-bold uppercase">
                        Pilar: {session.pilar}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[var(--blue)]/10 text-[var(--blue)] border border-[var(--blue)] font-bold">
                        Fecha: {new Date(session.fecha).toLocaleDateString("es-CL")}
                      </div>
                    </div>
                  </div>

                  {/* Equipment & Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--paper-2)] p-4 rounded-xl border border-[var(--line)] text-xs font-sans">
                    <div>
                      <strong className="block text-[var(--ink)] font-mono uppercase mb-1">
                        💻 Equipo
                      </strong>
                      <p className="text-[var(--ink-soft)]">
                        {session.equipo?.tipoEquipo || "No especificado"}
                      </p>
                    </div>
                    <div>
                      <strong className="block text-[var(--ink)] font-mono uppercase mb-1">
                        🎯 Síntoma / Uso Principal
                      </strong>
                      <p className="text-[var(--ink-soft)]">
                        {session.equipo?.usoPrincipal || "Sin detalles"}
                      </p>
                    </div>
                  </div>

                  {/* Recommendations Section */}
                  <div className="flex flex-col gap-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-lg text-[var(--ink)] flex items-center gap-2">
                        <span>📦</span> Recomendaciones ({session.recomendaciones.length})
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--ink-soft)]">
                        Secuencia: sugerido → cotizado → comprado → instalado
                      </span>
                    </div>

                    {session.recomendaciones.length === 0 ? (
                      <p className="font-mono text-xs text-[var(--ink-soft)] italic bg-[var(--paper)] p-3 rounded-lg border border-[var(--line)]">
                        Sin componentes recomendados vinculados a esta sesión.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {session.recomendaciones.map((rec) => (
                          <div
                            key={rec.id}
                            className="p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-sans font-bold text-sm text-[var(--ink)]">
                                  {rec.componente.nombre}
                                </span>
                                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--paper-2)] text-[var(--ink-soft)] border border-[var(--line)] font-semibold">
                                  {rec.componente.categoria}
                                </span>
                              </div>
                              {rec.componente.precioReferencia && (
                                <span className="font-mono text-xs text-[var(--ink-soft)]">
                                  Precio Ref: ${rec.componente.precioReferencia.toLocaleString("es-CL")} CLP
                                </span>
                              )}
                            </div>

                            {/* State Selector Buttons */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`font-mono text-xs font-bold px-3 py-1 rounded-full border uppercase ${getStatusBadge(
                                  rec.estado
                                )}`}
                              >
                                {rec.estado}
                              </span>

                              <select
                                value={rec.estado}
                                onChange={(e) =>
                                  handleUpdateStatus(
                                    rec.id,
                                    e.target.value as
                                      | "sugerido"
                                      | "cotizado"
                                      | "comprado"
                                      | "instalado"
                                      | "descartado"
                                  )
                                }
                                className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-[var(--line)] text-[var(--ink)] focus:outline-none cursor-pointer hover:bg-[var(--paper-2)]"
                              >
                                <option value="sugerido">sugerido (Recomendado)</option>
                                <option value="cotizado">cotizado (Enlace enviado)</option>
                                <option value="comprado">comprado (Por cliente)</option>
                                <option value="instalado">instalado (Listo)</option>
                                <option value="descartado">descartado</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Selector Form to Link Existing Catalog Component */}
                    <div className="mt-2 p-4 rounded-xl border border-[var(--line)] bg-[var(--paper-2)] flex flex-col gap-3">
                      <span className="font-mono text-xs font-bold text-[var(--ink)] uppercase">
                        + Seleccionar componente existente del catálogo
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <select
                          value={currentSelectedComp}
                          onChange={(e) =>
                            setSelectedCompPerSession({
                              ...selectedCompPerSession,
                              [session.id]: e.target.value,
                            })
                          }
                          className="sm:col-span-9 px-3 py-2 rounded-lg bg-white border border-[var(--line)] text-xs text-[var(--ink)] focus:outline-none cursor-pointer"
                        >
                          <option value="">-- Seleccionar componente del catálogo ({catalog.length} disponibles) --</option>
                          {catalog.map((c) => (
                            <option key={c.id} value={c.id}>
                              [{c.categoria}] {c.nombre} {c.precioReferencia ? `($${c.precioReferencia.toLocaleString("es-CL")})` : ""}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleAddRecommendation(session.id)}
                          className="sm:col-span-3 font-mono font-bold text-xs px-4 py-2 rounded-lg bg-[var(--blue)] text-white hover:bg-[var(--ink)] transition-colors cursor-pointer"
                        >
                          + Recomendar
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
