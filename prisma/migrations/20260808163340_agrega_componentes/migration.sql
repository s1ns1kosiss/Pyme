-- CreateEnum
CREATE TYPE "EstadoRecomendacion" AS ENUM ('sugerido', 'cotizado', 'comprado', 'instalado', 'descartado');

-- CreateTable
CREATE TABLE "componentes" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "precio_referencia" DECIMAL(10,2),
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "componentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recomendaciones" (
    "id" TEXT NOT NULL,
    "sesion_id" TEXT NOT NULL,
    "componente_id" TEXT NOT NULL,
    "estado" "EstadoRecomendacion" NOT NULL DEFAULT 'sugerido',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recomendaciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recomendaciones" ADD CONSTRAINT "recomendaciones_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "sesiones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recomendaciones" ADD CONSTRAINT "recomendaciones_componente_id_fkey" FOREIGN KEY ("componente_id") REFERENCES "componentes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
