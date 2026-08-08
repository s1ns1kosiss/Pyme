import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const components = await prisma.componente.findMany({
      orderBy: { categoria: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: components,
    });
  } catch (error: unknown) {
    console.error("Error al obtener catálogo de componentes:", error);
    return NextResponse.json(
      { success: false, error: "No se pudo obtener el catálogo de componentes." },
      { status: 500 }
    );
  }
}
