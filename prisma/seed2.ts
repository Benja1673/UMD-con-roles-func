import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


// Primero borramos todos los cursos
//await prisma.curso.deleteMany();


async function main() {

  // 1️⃣ Borrar todas las inscripciones
await prisma.inscripcionCurso.deleteMany();
  // Primero borramos todos los cursos
await prisma.curso.deleteMany();
  // Borra todos los registros de la tabla 'categorias'
  await prisma.categoria.deleteMany();

  // ==========================
  // Usuarios
  // ==========================


  console.log("👤 Asegurando usuarios...");
  const commonPassword = "1234";
  const hashedPassword = await bcrypt.hash(commonPassword, 10);

  const users = [
    { email: "admin@utem.cl", role: "admin", rut: "11111111-1" },
    { email: "supervisor@utem.cl", role: "supervisor", rut: "22222222-2" },
    { email: "docente@utem.cl", role: "docente", rut: "33333333-3" },
    { email: "benja1673b@gmail.com", role: "admin", rut: "21000955-8" },
    { email: "mvalenzuelam@utem.cl", role: "admin", rut: "21110955-8" },
  ];

  for (const user of users) {
    const existing = await prisma.user.findUnique({ where: { email: user.email } });
    if (existing) {
      await prisma.user.update({
        where: { email: user.email },
        data: { role: user.role, hashedPassword, rut: user.rut, updatedAt: new Date() },
      });
    } else {
      await prisma.user.create({
        data: {
          email: user.email,
          role: user.role,
          hashedPassword,
          rut: user.rut,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }
  console.log("✅ Usuarios asegurados.");

  // ==========================
  // Categorías
  // ==========================
  console.log("📚 Asegurando categorías...");
  const categorias = [
    {
      id: "5CA50651-E4AF-4AD2-8E07-352E47254750",
      nombre: "General",
      descripcion: null,
      nivel: "General",
      orden: 1,
      esObligatoria: true,
      createdAt: new Date("2025-08-31T22:23:58"),
      updatedAt: new Date("2025-08-31T22:23:58"),
    },
    {
      id: "cmez4uq790005ehpk9rtomlwr",
      nombre: "Enseñanza en Aula Centrada en el Estudiantado",
      descripcion: "Metodologías activas y evaluación centrada en el estudiante",
      nivel: "INTERMEDIO",
      orden: 2,
      esObligatoria: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cmez4uq790006ehpku1lbg8rp",
      nombre: "Planificación de la Enseñanza",
      descripcion: "Diseño y planificación curricular efectiva",
      nivel: "INTERMEDIO",
      orden: 3,
      esObligatoria: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cmez4uq790007ehpk22cl49ec",
      nombre: "Modelo Educativo",
      descripcion: "Fundamentos del modelo educativo institucional",
      nivel: "INICIAL",
      orden: 1,
      esObligatoria: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cmez4uq790008ehpkzyulfjsg",
      nombre: "Ambientes Propicios para el Aprendizaje",
      descripcion: "Creación de espacios inclusivos y diversos para el aprendizaje",
      nivel: "INTERMEDIO",
      orden: 1,
      esObligatoria: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cmez4uq790009ehpk4xuuk0j0",
      nombre: "Reflexión sobre la Práctica Docente",
      descripcion: "Desarrollo profesional y reflexión pedagógica",
      nivel: "INTERMEDIO",
      orden: 4,
      esObligatoria: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cmez4uq7i000aehpkv7f9u9ah",
      nombre: "Didáctica",
      descripcion: "Didáctica especializada y avanzada",
      nivel: "AVANZADO",
      orden: 2,
      esObligatoria: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cmez4uq7i000behpk9jn0e2t9",
      nombre: "Metodologías Vinculadas con el Entorno",
      descripcion: "Metodologías innovadoras conectadas con el entorno social y productivo",
      nivel: "AVANZADO",
      orden: 1,
      esObligatoria: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

for (const c of categorias) {
  await prisma.categoria.upsert({
    where: { id: c.id },
    update: {
      nombre: c.nombre,
      descripcion: c.descripcion,
      nivel: c.nivel,
      orden: c.orden,
      esObligatoria: c.esObligatoria,
      updatedAt: new Date(),
    },
    create: c,
  });
}

console.log(`✅ ${categorias.length} categorías aseguradas.`);




  console.log("✅ Categorías aseguradas.");

  // ==========================
  // Departamentos
  // ==========================
  console.log("🏢 Asegurando departamentos...");
  const departamentosData = [
    { nombre: "Departamento de Informática", codigo: "INF" },
    { nombre: "Departamento de Matemáticas", codigo: "MAT" },
    { nombre: "Departamento de Física", codigo: "FIS" },
    { nombre: "Departamento de Química", codigo: "QUI" },
    { nombre: "Departamento de Desarrollo Docente", codigo: "DDD" },
  ];

  const departamentos: any[] = [];
  for (const d of departamentosData) {
    const existing = await prisma.departamento.findFirst({ where: { codigo: d.codigo } });
    if (existing) {
      departamentos.push(existing);
    } else {
      const created = await prisma.departamento.create({ data: { ...d, createdAt: new Date(), updatedAt: new Date() } });
      departamentos.push(created);
    }
  }
  console.log(`✅ ${departamentos.length} departamentos asegurados.`);

// ==========================
// Cursos
// ==========================
console.log("📘 Asegurando cursos...");

const cursosData = [
  {
    nombre: "Curso Modelo Educativo",
    descripcion: "Fundamentos del modelo educativo institucional y sus principios pedagógicos",
    codigo: "ME-001",
    nivel: "INICIAL",
    duracion: 20,
    modalidad: "Virtual",
    activo: true,
    fechaInicio: new Date("2024-03-01"),
    fechaFin: new Date("2024-03-15"),
    cupos: 50,
    categoriaNombre: "Modelo Educativo",
    departamentoCodigo: "INF",
    instructorRut: "33333333-3",
  },
  {
    nombre: "Perspectiva de Género",
    descripcion: "Incorporación de la perspectiva de género en el proceso educativo",
    codigo: "APA-001",
    nivel: "INTERMEDIO",
    duracion: 30,
    modalidad: "Híbrida",
    activo: true,
    fechaInicio: new Date("2024-04-01"),
    fechaFin: new Date("2024-04-20"),
    cupos: 30,
    categoriaNombre: "Enseñanza en Aula Centrada en el Estudiantado",
    departamentoCodigo: "MAT",
    instructorRut: "33333333-3",
  },
  {
    nombre: "Enseñanza Centrada en el Estudiante",
    descripcion: "Metodologías activas de enseñanza y evaluación",
    codigo: "ECE-001",
    nivel: "INTERMEDIO",
    duracion: 25,
    modalidad: "Presencial",
    activo: true,
    fechaInicio: new Date("2024-05-01"),
    fechaFin: new Date("2024-05-20"),
    cupos: 40,
    categoriaNombre: "Enseñanza en Aula Centrada en el Estudiantado",
    departamentoCodigo: "FIS",
    instructorRut: "33333333-3",
  },
  {
    nombre: "Planificación Curricular",
    descripcion: "Diseño y planificación curricular efectiva",
    codigo: "PC-001",
    nivel: "INTERMEDIO",
    duracion: 20,
    modalidad: "Virtual",
    activo: true,
    fechaInicio: new Date("2024-06-01"),
    fechaFin: new Date("2024-06-15"),
    cupos: 35,
    categoriaNombre: "Planificación de la Enseñanza",
    departamentoCodigo: "QUI",
    instructorRut: "33333333-3",
  },
  {
    nombre: "Ambientes Propicios",
    descripcion: "Creación de espacios inclusivos para el aprendizaje",
    codigo: "AP-001",
    nivel: "INTERMEDIO",
    duracion: 15,
    modalidad: "Virtual",
    activo: true,
    fechaInicio: new Date("2024-07-01"),
    fechaFin: new Date("2024-07-15"),
    cupos: 50,
    categoriaNombre: "Ambientes Propicios para el Aprendizaje",
    departamentoCodigo: "INF",
    instructorRut: "33333333-3",
  },
  {
    nombre: "Reflexión Docente",
    descripcion: "Desarrollo profesional y reflexión pedagógica",
    codigo: "RD-001",
    nivel: "INTERMEDIO",
    duracion: 20,
    modalidad: "Híbrida",
    activo: true,
    fechaInicio: new Date("2024-08-01"),
    fechaFin: new Date("2024-08-20"),
    cupos: 30,
    categoriaNombre: "Reflexión sobre la Práctica Docente",
    departamentoCodigo: "MAT",
    instructorRut: "33333333-3",
  },
  {
    nombre: "Didáctica Avanzada",
    descripcion: "Didáctica especializada y avanzada",
    codigo: "DA-001",
    nivel: "AVANZADO",
    duracion: 25,
    modalidad: "Virtual",
    activo: true,
    fechaInicio: new Date("2024-09-01"),
    fechaFin: new Date("2024-09-25"),
    cupos: 40,
    categoriaNombre: "Didáctica",
    departamentoCodigo: "FIS",
    instructorRut: "33333333-3",
  },
  {
    nombre: "Metodologías Vinculadas al Entorno",
    descripcion: "Metodologías innovadoras conectadas con el entorno social y productivo",
    codigo: "MVE-001",
    nivel: "AVANZADO",
    duracion: 30,
    modalidad: "Presencial",
    activo: true,
    fechaInicio: new Date("2024-10-01"),
    fechaFin: new Date("2024-10-30"),
    cupos: 30,
    categoriaNombre: "Metodologías Vinculadas con el Entorno",
    departamentoCodigo: "QUI",
    instructorRut: "33333333-3",
  },
];

for (const curso of cursosData) {
  const categoria = await prisma.categoria.findFirst({ where: { nombre: curso.categoriaNombre } });
  const departamento = await prisma.departamento.findFirst({ where: { codigo: curso.departamentoCodigo } });
  const instructor = await prisma.user.findFirst({ where: { rut: curso.instructorRut } });

  if (!categoria || !departamento || !instructor) {
    console.warn(`⚠️ No se pudo crear el curso "${curso.nombre}" porque falta categoria, departamento o instructor`);
    continue;
  }

  await prisma.curso.upsert({
    where: { codigo: curso.codigo },
    update: {
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      nivel: curso.nivel,
      duracion: curso.duracion,
      modalidad: curso.modalidad,
      activo: curso.activo,
      fechaInicio: curso.fechaInicio,
      fechaFin: curso.fechaFin,
      cupos: curso.cupos,
      categoriaId: categoria.id,
      departamentoId: departamento.id,
      instructorId: instructor.id,
      updatedAt: new Date(),
    },
    create: {
      id: undefined,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      codigo: curso.codigo,
      nivel: curso.nivel,
      duracion: curso.duracion,
      modalidad: curso.modalidad,
      activo: curso.activo,
      fechaInicio: curso.fechaInicio,
      fechaFin: curso.fechaFin,
      cupos: curso.cupos,
      categoriaId: categoria.id,
      departamentoId: departamento.id,
      instructorId: instructor.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

console.log("✅ Cursos asegurados.");
  // ✅ Mensaje final
  console.log("🎉 Seed completado correctamente.");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });