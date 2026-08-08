import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EstadoRecomendacion } from "@prisma/client";

// POST /api/admin/recommendations -> Agregar una recomendación a una sesión
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sesionId,
      nombreComponente,
      categoria = "Upgrade General",
      precioReferencia,
    } = body;

    if (!sesionId || !nombreComponente) {
      return NextResponse.json(
        { success: false, error: "sesionId y nombreComponente son obligatorios." },
        { status: 400 }
      );
    }

    // Buscar o crear el componente
    let componente = await prisma.componente.findFirst({
      where: { nombre: nombreComponente.trim() },
    });

    if (!componente) {
      componente = await prisma.componente.create({
        data: {
          nombre: nombreComponente.trim(),
          categoria: categoria.trim(),
          precioReferencia: precioReferencia ? parseFloat(precioReferencia) : null,
        },
      });
    }

    // Crear recomendación vinculada
    const recomendacion = await prisma.recomendacion.create({
      data: {
        sesionId,
        componenteId: componente.id,
        estado: EstadoRecomendacion.sugerido,
      },
      include: {
        componente: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: recomendacion,
    });
  } catch (error: unknown) {
    console.error("Error al crear recomendación:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al crear recomendación." },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/recommendations -> Cambiar el estado de una recomendación
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, estado } = body;

    if (!id || !estado) {
      return NextResponse.json(
        { success: false, error: "id y estado son obligatorios." },
        { status: 400 }
      );
    }

    const validStates: EstadoRecomendacion[] = [
      EstadoRecomendacion.sugerido,
      EstadoRecomendacion.cotizado,
      EstadoRecomendacion.comprado,
      EstadoRecomendacion.instalado,
      EstadoRecomendacion.descartado,
    ];

    if (!validStates.includes(estado as EstadoRecomendacion)) {
      return NextResponse.json(
        { success: false, error: "Estado no válido." },
        { status: 400 }
      );
    }

    const recomendacion = await prisma.recomendacion.update({
      where: { id },
      data: { estado: estado as EstadoRecomendacion },
      include: {
        componente: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: recomendacion,
    });
  } catch (error: unknown) {
    console.error("Error al actualizar estado de recomendación:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al actualizar recomendación." },
      { status: 500 }
    );
  }
}
