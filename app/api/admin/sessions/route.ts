import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sessions = await prisma.sesion.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        cliente: true,
        equipo: true,
        recomendaciones: {
          orderBy: { createdAt: "asc" },
          include: {
            componente: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: sessions,
    });
  } catch (error: unknown) {
    console.error("Error al obtener sesiones admin:", error);
    return NextResponse.json(
      {
        success: false,
        error: "No se pudieron obtener las sesiones.",
      },
      { status: 500 }
    );
  }
}
