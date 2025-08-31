import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
  const cursos: any[] = [];

  // Leer el archivo CSV
  fs.createReadStream("ruta/a/tu/archivo.csv")
    .pipe(csv({ headers: ['nombre', 'tipo', 'ano'] }))
    .on("data", (row) => {
      const id = `3${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 1000)}`; // Genera un ID único
      cursos.push({
        id: id,
        nombre: row['nombre'],
        tipo: row['tipo'],
        ano: parseInt(row['ano']),
        // Agrega otros campos si es necesario
      });
    })
    .on("end", async () => {
      // Insertar cursos en la base de datos
      for (const curso of cursos) {
        await prisma.curso.upsert({
          where: { id: curso.id }, // Usar el nuevo ID
          update: {
            tipo: curso.tipo,
            ano: curso.ano,
            nombre: curso.nombre,
          },
          create: {
            id: curso.id, // Incluir el ID al crear
            nombre: curso.nombre,
            tipo: curso.tipo,
            ano: curso.ano,
          },
        });
      }
      console.log("Cursos importados con éxito!");
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });