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

    const sessionDate = fecha ? new Date(fecha) : new Date(Date.now() + 86400000);

    // CRITICAL SECURITY FIX: Demo mode is strictly restricted to non-production environments
    const isProduction = process.env.NODE_ENV === "production";

    if (!process.env.DATABASE_URL) {
      if (!isProduction) {
        console.warn(
          "⚠️ DEV ONLY: DATABASE_URL no configurada en entorno de desarrollo. Modo simulación activo."
        );
        return NextResponse.json({
          success: true,
          demoMode: true,
          message: "Agendamiento registrado correctamente (Modo Simulación Dev).",
          data: {
            cliente: { nombre, email, telefono, tipo: targetTipoCliente },
            sesion: { pilar: targetPilar, fecha: sessionDate.toISOString() },
          },
        });
      } else {
        // En producción, NUNCA responder éxito falso
        console.error("❌ ERROR CRÍTICO PRODUCCIÓN: DATABASE_URL no configurada.");
        return NextResponse.json(
          {
            success: false,
            error:
              "El sistema de agenda remota no está disponible en este momento. Por favor utiliza nuestro contacto directo de WhatsApp.",
          },
          { status: 500 }
        );
      }
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
      message: "¡Sesión agendada exitosamente en la agenda!",
      data: {
        sesionId: sesion.id,
        clienteNombre: cliente.nombre,
        pilar: sesion.pilar,
        fecha: sesion.fecha,
      },
    });
  } catch (error: unknown) {
    console.error("❌ Error al procesar el agendamiento:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error interno del servidor";

    return NextResponse.json(
      {
        success: false,
        error:
          "No se pudo guardar tu agendamiento en la base de datos. Por favor contáctanos directamente vía WhatsApp.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
