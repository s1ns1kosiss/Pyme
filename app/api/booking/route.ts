import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TipoCliente, PilarSesion } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nombre,
      email,
      telefono,
      tipoCliente = "persona",
      pilar = "asesoria",
      tipoEquipo,
      usoPrincipal,
      fecha,
      planEscrito,
    } = body;

    // Basic validation
    if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
      return NextResponse.json(
        { success: false, error: "El nombre es obligatorio." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Ingresa un email válido." },
        { status: 400 }
      );
    }

    const targetTipoCliente =
      tipoCliente === "empresa" ? TipoCliente.empresa : TipoCliente.persona;

    let targetPilar: PilarSesion = PilarSesion.asesoria;
    if (pilar === "optimizacion") targetPilar = PilarSesion.optimizacion;
    if (pilar === "componentes") targetPilar = PilarSesion.componentes;

    const sessionDate = fecha ? new Date(fecha) : new Date(Date.now() + 86400000); // Mañana por defecto

    // DB Connection Check fallback (if DATABASE_URL is not set or DB unreachable)
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL no configurada. Simulando agendamiento exitoso.");
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: "Agendamiento registrado correctamente (Modo Simulación / Sin DB real).",
        data: {
          cliente: { nombre, email, telefono, tipo: targetTipoCliente },
          sesion: { pilar: targetPilar, fecha: sessionDate.toISOString() },
        },
      });
    }

    // Upsert Cliente
    const cliente = await prisma.cliente.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        nombre: nombre.trim(),
        telefono: telefono ? telefono.trim() : undefined,
        tipo: targetTipoCliente,
      },
      create: {
        nombre: nombre.trim(),
        email: email.toLowerCase().trim(),
        telefono: telefono ? telefono.trim() : null,
        tipo: targetTipoCliente,
      },
    });

    // Create Equipo if specified
    let equipoId: string | undefined = undefined;
    if (tipoEquipo && tipoEquipo.trim()) {
      const equipo = await prisma.equipo.create({
        data: {
          clienteId: cliente.id,
          tipoEquipo: tipoEquipo.trim(),
          usoPrincipal: usoPrincipal ? usoPrincipal.trim() : null,
        },
      });
      equipoId = equipo.id;
    }

    // Create Sesion
    const sesion = await prisma.sesion.create({
      data: {
        clienteId: cliente.id,
        equipoId: equipoId || null,
        pilar: targetPilar,
        fecha: sessionDate,
        planEscrito: planEscrito ? planEscrito.trim() : null,
      },
    });

    return NextResponse.json({
      success: true,
      demoMode: false,
      message: "¡Sesión agendada exitosamente!",
      data: {
        sesionId: sesion.id,
        clienteNombre: cliente.nombre,
        pilar: sesion.pilar,
        fecha: sesion.fecha,
      },
    });
  } catch (error: unknown) {
    console.error("Error al procesar el agendamiento:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error interno del servidor";

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo guardar el agendamiento. Revisa la conexión a la base de datos.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
