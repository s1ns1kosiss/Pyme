const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const initialComponents = [
  {
    nombre: 'SSD Kingston A400 480GB 2.5" SATA3',
    categoria: "Almacenamiento",
    precioReferencia: 28990,
    stock: 10,
  },
  {
    nombre: "Memoria RAM Kingston Fury Beast 16GB DDR4 3200MHz",
    categoria: "Memoria RAM",
    precioReferencia: 34990,
    stock: 15,
  },
  {
    nombre: "Pasta Térmica Arctic MX-4 4g Alta Conductividad",
    categoria: "Refrigeración",
    precioReferencia: 8990,
    stock: 25,
  },
  {
    nombre: "Fuente de Poder Corsair CX650 650W 80 Plus Bronze",
    categoria: "Fuentes de Poder",
    precioReferencia: 59990,
    stock: 8,
  },
  {
    nombre: 'Disco Duro Western Digital Blue 1TB 3.5" SATA3 7200RPM',
    categoria: "Almacenamiento",
    precioReferencia: 42990,
    stock: 12,
  },
  {
    nombre: "Cooler CPU DeepCool AG400 ARGB 120mm",
    categoria: "Refrigeración",
    precioReferencia: 22990,
    stock: 14,
  },
];

async function main() {
  console.log("🌱 Poblando base de datos con catálogo de componentes base...");

  for (const comp of initialComponents) {
    const existing = await prisma.componente.findFirst({
      where: { nombre: comp.nombre },
    });

    if (!existing) {
      await prisma.componente.create({
        data: comp,
      });
      console.log(`✓ Creado: ${comp.nombre}`);
    } else {
      console.log(`ℹ Ya existe: ${comp.nombre}`);
    }
  }

  console.log("✅ Seed completado exitosamente.");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
