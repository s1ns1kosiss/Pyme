import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EstadoRecomendacion } from "@prisma/client";

// POST /api/admin/recommendations -> Agregar una recomendación a una sesión usando un componente EXISTENTE
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sesionId, componenteId } = body;

    if (!sesionId || !componenteId) {
      return NextResponse.json(
        {
          success: false,
          error: "Los campos 'sesionId' y 'componenteId' son obligatorios.",
        },
        { status: 400 }
      );
    }

    // Validar que la sesión exista
    const sesionExistente = await prisma.sesion.findUnique({
      where: { id: sesionId },
    });

    if (!sesionExistente) {
      return NextResponse.json(
        { success: false, error: "La sesión especificada no existe." },
        { status: 404 }
      );
    }

    // Validar que el componente EXISTA en el catálogo
    const componenteExistente = await prisma.componente.findUnique({
      where: { id: componenteId },
    });

    if (!componenteExistente) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El componente seleccionado no existe en el catálogo. Selecciona un componente existente.",
        },
        { status: 400 }
      );
    }

    // Crear recomendación vinculando la sesión con el componente existente
    const recomendacion = await prisma.recomendacion.create({
      data: {
        sesionId,
        componenteId: componenteExistente.id,
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
    console.error("Error al vincular recomendación:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al vincular la recomendación." },
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
        { success: false, error: "Los campos 'id' y 'estado' son obligatorios." },
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
        { success: false, error: "Estado de recomendación no válido." },
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
