import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// Constantes para reemplazar los enums
const Role = {
  ADMIN: "ADMIN",
  COORDINADOR: "COORDINADOR",
  DOCENTE: "DOCENTE",
  INSTRUCTOR: "INSTRUCTOR",
} as const

const EstadoDocente = {
  ACTIVO: "ACTIVO",
  INACTIVO: "INACTIVO",
  SUSPENDIDO: "SUSPENDIDO",
  LICENCIA: "LICENCIA",
} as const

const NivelCurso = {
  INICIAL: "INICIAL",
  INTERMEDIO: "INTERMEDIO",
  AVANZADO: "AVANZADO",
} as const

const EstadoCurso = {
  NO_INSCRITO: "NO_INSCRITO",
  INSCRITO: "INSCRITO",
  EN_PROCESO: "EN_PROCESO",
  APROBADO: "APROBADO",
  NO_APROBADO: "NO_APROBADO",
  ABANDONADO: "ABANDONADO",
  PENDIENTE_EVALUACION: "PENDIENTE_EVALUACION",
} as const

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...")

  try {
    // Limpiar datos existentes en orden correcto
    console.log("🧹 Limpiando datos existentes...")
    await prisma.certificado.deleteMany()
    await prisma.inscripcionCurso.deleteMany()
    await prisma.cursoPrerequisito.deleteMany()
    await prisma.curso.deleteMany()
    await prisma.categoria.deleteMany()
    await prisma.docente.deleteMany()
    await prisma.departamento.deleteMany()
    await prisma.user.deleteMany()
    await prisma.evaluacion.deleteMany()
    await prisma.capacitacion.deleteMany()
    console.log("✅ Datos existentes eliminados")

    // Crear departamentos
    console.log("📚 Creando departamentos...")
    const departamentos = await Promise.all([
      prisma.departamento.create({
        data: {
          nombre: "Departamento de Informática",
          codigo: "INF",
        },
      }),
      prisma.departamento.create({
        data: {
          nombre: "Departamento de Matemáticas",
          codigo: "MAT",
        },
      }),
      prisma.departamento.create({
        data: {
          nombre: "Departamento de Física",
          codigo: "FIS",
        },
      }),
      prisma.departamento.create({
        data: {
          nombre: "Departamento de Química",
          codigo: "QUI",
        },
      }),
      prisma.departamento.create({
        data: {
          nombre: "Departamento de Desarrollo Docente",
          codigo: "DDD",
        },
      }),
    ])
    console.log(`✅ ${departamentos.length} departamentos creados`)

    // Crear categorías del sistema de desarrollo docente
    console.log("📂 Creando categorías...")
    const categorias = await Promise.all([
      // NIVEL INICIAL
      prisma.categoria.create({
        data: {
          nombre: "Modelo Educativo",
          descripcion: "Fundamentos del modelo educativo institucional",
          nivel: NivelCurso.INICIAL,
          orden: 1,
          esObligatoria: true,
        },
      }),

      // NIVEL INTERMEDIO
      prisma.categoria.create({
        data: {
          nombre: "Ambientes Propicios para el Aprendizaje",
          descripcion: "Creación de espacios inclusivos y diversos para el aprendizaje",
          nivel: NivelCurso.INTERMEDIO,
          orden: 1,
          esObligatoria: true,
        },
      }),
      prisma.categoria.create({
        data: {
          nombre: "Enseñanza en Aula Centrada en el Estudiantado",
          descripcion: "Metodologías activas y evaluación centrada en el estudiante",
          nivel: NivelCurso.INTERMEDIO,
          orden: 2,
          esObligatoria: true,
        },
      }),
      prisma.categoria.create({
        data: {
          nombre: "Planificación de la Enseñanza",
          descripcion: "Diseño y planificación curricular efectiva",
          nivel: NivelCurso.INTERMEDIO,
          orden: 3,
          esObligatoria: true,
        },
      }),
      prisma.categoria.create({
        data: {
          nombre: "Reflexión sobre la Práctica Docente",
          descripcion: "Desarrollo profesional y reflexión pedagógica",
          nivel: NivelCurso.INTERMEDIO,
          orden: 4,
          esObligatoria: true,
        },
      }),

      // NIVEL AVANZADO
      prisma.categoria.create({
        data: {
          nombre: "Metodologías Vinculadas con el Entorno",
          descripcion: "Metodologías innovadoras conectadas con el entorno social y productivo",
          nivel: NivelCurso.AVANZADO,
          orden: 1,
          esObligatoria: true,
        },
      }),
      prisma.categoria.create({
        data: {
          nombre: "Didáctica",
          descripcion: "Didáctica especializada y avanzada",
          nivel: NivelCurso.AVANZADO,
          orden: 2,
          esObligatoria: true,
        },
      }),
    ])
    console.log(`✅ ${categorias.length} categorías creadas`)

    // Crear usuarios y docentes
    console.log("👥 Creando usuarios...")
    const hashedPassword = await bcrypt.hash("123456", 10)

    // Usuario administrador
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@utem.cl",
        hashedPassword: hashedPassword,
        role: Role.ADMIN,
      },
    })
    console.log("✅ Usuario administrador creado")

    // Usuarios docentes
    const docentes = []

    // Docente 1 - Nivel Inicial (solo tiene curso del nivel inicial)
    const docente1 = await prisma.user.create({
      data: {
        email: "juan.perez@utem.cl",
        hashedPassword: hashedPassword,
        role: Role.DOCENTE,
        docente: {
          create: {
            nombre: "Juan",
            apellido: "Pérez",
            rut: "12345678-9",
            email: "juan.perez@utem.cl",
            telefono: "+56912345678",
            direccion: "Av. Libertador 1234, Santiago",
            fechaNacimiento: new Date("1980-05-15"),
            especialidad: "Ingeniería en Informática",
            estado: EstadoDocente.ACTIVO,
            nivelActual: NivelCurso.INICIAL,
            departamentoId: departamentos[0].id,
          },
        },
      },
      include: { docente: true },
    })
    docentes.push(docente1)

    // Docente 2 - Nivel Intermedio (completó inicial y algunas del intermedio)
    const docente2 = await prisma.user.create({
      data: {
        email: "maria.gonzalez@utem.cl",
        hashedPassword: hashedPassword,
        role: Role.DOCENTE,
        docente: {
          create: {
            nombre: "María",
            apellido: "González",
            rut: "23456789-0",
            email: "maria.gonzalez@utem.cl",
            telefono: "+56923456789",
            direccion: "Calle Principal 567, Santiago",
            fechaNacimiento: new Date("1985-08-22"),
            especialidad: "Matemáticas Aplicadas",
            estado: EstadoDocente.ACTIVO,
            nivelActual: NivelCurso.INTERMEDIO,
            departamentoId: departamentos[1].id,
          },
        },
      },
      include: { docente: true },
    })
    docentes.push(docente2)

    // Docente 3 - Instructor Avanzado (completó todos los niveles)
    const docente3 = await prisma.user.create({
      data: {
        email: "carlos.rodriguez@utem.cl",
        hashedPassword: hashedPassword,
        role: Role.INSTRUCTOR,
        docente: {
          create: {
            nombre: "Carlos",
            apellido: "Rodríguez",
            rut: "34567890-1",
            email: "carlos.rodriguez@utem.cl",
            telefono: "+56934567890",
            direccion: "Pasaje Los Álamos 890, Santiago",
            fechaNacimiento: new Date("1978-12-10"),
            especialidad: "Desarrollo de Software",
            estado: EstadoDocente.ACTIVO,
            nivelActual: NivelCurso.AVANZADO,
            departamentoId: departamentos[0].id,
          },
        },
      },
      include: { docente: true },
    })
    docentes.push(docente3)

    // Docente 4 - Nivel Intermedio
    const docente4 = await prisma.user.create({
      data: {
        email: "ana.martinez@utem.cl",
        hashedPassword: hashedPassword,
        role: Role.DOCENTE,
        docente: {
          create: {
            nombre: "Ana",
            apellido: "Martínez",
            rut: "45678901-2",
            email: "ana.martinez@utem.cl",
            telefono: "+56945678901",
            direccion: "Av. Central 321, Santiago",
            fechaNacimiento: new Date("1982-03-18"),
            especialidad: "Física Computacional",
            estado: EstadoDocente.ACTIVO,
            nivelActual: NivelCurso.INTERMEDIO,
            departamentoId: departamentos[2].id,
          },
        },
      },
      include: { docente: true },
    })
    docentes.push(docente4)

    // Docente 5 - Coordinador de Desarrollo Docente
    const docente5 = await prisma.user.create({
      data: {
        email: "patricia.silva@utem.cl",
        hashedPassword: hashedPassword,
        role: Role.COORDINADOR,
        docente: {
          create: {
            nombre: "Patricia",
            apellido: "Silva",
            rut: "56789012-3",
            email: "patricia.silva@utem.cl",
            telefono: "+56956789012",
            direccion: "Av. Educación 456, Santiago",
            fechaNacimiento: new Date("1975-09-30"),
            especialidad: "Pedagogía y Desarrollo Docente",
            estado: EstadoDocente.ACTIVO,
            nivelActual: NivelCurso.AVANZADO,
            departamentoId: departamentos[4].id,
          },
        },
      },
      include: { docente: true },
    })
    docentes.push(docente5)

    console.log(`✅ ${docentes.length} docentes creados`)

    // Crear cursos del sistema de desarrollo docente
    console.log("📖 Creando cursos...")
    const cursos = []

    // NIVEL INICIAL - Categoría: Modelo Educativo
    const cursoModeloEducativo = await prisma.curso.create({
      data: {
        nombre: "Curso Modelo Educativo",
        descripcion: "Fundamentos del modelo educativo institucional y sus principios pedagógicos",
        codigo: "ME-001",
        nivel: NivelCurso.INICIAL,
        duracion: 20,
        modalidad: "Virtual",
        fechaInicio: new Date("2024-03-01"),
        fechaFin: new Date("2024-03-15"),
        cupos: 50,
        categoriaId: categorias[0].id, // Modelo Educativo
        departamentoId: departamentos[4].id, // Desarrollo Docente
        instructorId: docentes[4].docente?.id, // Patricia Silva
      },
    })
    cursos.push(cursoModeloEducativo)

    // NIVEL INTERMEDIO - Categoría: Ambientes Propicios para el Aprendizaje
    const cursoPerspectiva = await prisma.curso.create({
      data: {
        nombre: "Perspectiva de Género",
        descripcion: "Incorporación de la perspectiva de género en el proceso educativo",
        codigo: "APA-001",
        nivel: NivelCurso.INTERMEDIO,
        duracion: 30,
        modalidad: "Híbrida",
        fechaInicio: new Date("2024-04-01"),
        fechaFin: new Date("2024-04-20"),
        cupos: 30,
        categoriaId: categorias[1].id, // Ambientes Propicios
        departamentoId: departamentos[4].id,
        instructorId: docentes[4].docente?.id,
      },
    })
    cursos.push(cursoPerspectiva)

    const cursoNeurodiversidad = await prisma.curso.create({
      data: {
        nombre: "Neurodiversidad e Inclusión",
        descripcion: "Estrategias para la inclusión de estudiantes neurodiversos",
        codigo: "APA-002",
        nivel: NivelCurso.INTERMEDIO,
        duracion: 25,
        modalidad: "Virtual",
        fechaInicio: new Date("2024-04-15"),
        fechaFin: new Date("2024-05-05"),
        cupos: 35,
        categoriaId: categorias[1].id, // Ambientes Propicios
        departamentoId: departamentos[4].id,
        instructorId: docentes[2].docente?.id, // Carlos como instructor
      },
    })
    cursos.push(cursoNeurodiversidad)

    // NIVEL INTERMEDIO - Categoría: Enseñanza en Aula Centrada en el Estudiantado
    const cursoMetodologias = await prisma.curso.create({
      data: {
        nombre: "Metodologías Activas",
        descripcion: "Implementación de metodologías activas de aprendizaje",
        codigo: "ECE-001",
        nivel: NivelCurso.INTERMEDIO,
        duracion: 40,
        modalidad: "Presencial",
        fechaInicio: new Date("2024-05-01"),
        fechaFin: new Date("2024-05-25"),
        cupos: 25,
        categoriaId: categorias[2].id, // Enseñanza Centrada en Estudiante
        departamentoId: departamentos[4].id,
        instructorId: docentes[4].docente?.id,
      },
    })
    cursos.push(cursoMetodologias)

    const cursoEvaluacion = await prisma.curso.create({
      data: {
        nombre: "Evaluación",
        descripcion: "Estrategias de evaluación formativa y sumativa",
        codigo: "ECE-002",
        nivel: NivelCurso.INTERMEDIO,
        duracion: 35,
        modalidad: "Híbrida",
        fechaInicio: new Date("2024-05-15"),
        fechaFin: new Date("2024-06-10"),
        cupos: 30,
        categoriaId: categorias[2].id, // Enseñanza Centrada en Estudiante
        departamentoId: departamentos[4].id,
        instructorId: docentes[2].docente?.id,
      },
    })
    cursos.push(cursoEvaluacion)

    // NIVEL INTERMEDIO - Categoría: Planificación de la Enseñanza
    const cursoPlanificacion = await prisma.curso.create({
      data: {
        nombre: "Planificación de la Enseñanza",
        descripcion: "Diseño curricular y planificación de actividades de aprendizaje",
        codigo: "PE-001",
        nivel: NivelCurso.INTERMEDIO,
        duracion: 45,
        modalidad: "Presencial",
        fechaInicio: new Date("2024-06-01"),
        fechaFin: new Date("2024-06-30"),
        cupos: 20,
        categoriaId: categorias[3].id, // Planificación de la Enseñanza
        departamentoId: departamentos[4].id,
        instructorId: docentes[4].docente?.id,
      },
    })
    cursos.push(cursoPlanificacion)

    // NIVEL INTERMEDIO - Categoría: Reflexión sobre la Práctica Docente
    const cursoDEDU = await prisma.curso.create({
      data: {
        nombre: "DEDU",
        descripcion: "Desarrollo Educativo y Universitario",
        codigo: "RPD-001",
        nivel: NivelCurso.INTERMEDIO,
        duracion: 50,
        modalidad: "Virtual",
        fechaInicio: new Date("2024-07-01"),
        fechaFin: new Date("2024-07-31"),
        cupos: 25,
        categoriaId: categorias[4].id, // Reflexión Práctica Docente
        departamentoId: departamentos[4].id,
        instructorId: docentes[4].docente?.id,
      },
    })
    cursos.push(cursoDEDU)

    const cursoDIDU = await prisma.curso.create({
      data: {
        nombre: "DIDU",
        descripcion: "Desarrollo e Innovación Docente Universitaria",
        codigo: "RPD-002",
        nivel: NivelCurso.INTERMEDIO,
        duracion: 55,
        modalidad: "Híbrida",
        fechaInicio: new Date("2024-08-01"),
        fechaFin: new Date("2024-08-31"),
        cupos: 20,
        categoriaId: categorias[4].id, // Reflexión Práctica Docente
        departamentoId: departamentos[4].id,
        instructorId: docentes[2].docente?.id,
      },
    })
    cursos.push(cursoDIDU)

    const cursoConcursos = await prisma.curso.create({
      data: {
        nombre: "Concursos Investigación y/o Innovación",
        descripcion: "Participación en concursos de investigación e innovación educativa",
        codigo: "RPD-003",
        nivel: NivelCurso.INTERMEDIO,
        duracion: 30,
        modalidad: "Virtual",
        fechaInicio: new Date("2024-09-01"),
        fechaFin: new Date("2024-09-20"),
        cupos: 15,
        categoriaId: categorias[4].id, // Reflexión Práctica Docente
        departamentoId: departamentos[4].id,
        instructorId: docentes[4].docente?.id,
      },
    })
    cursos.push(cursoConcursos)

    // NIVEL AVANZADO - Categoría: Metodologías Vinculadas con el Entorno
    const cursoApS = await prisma.curso.create({
      data: {
        nombre: "A+S",
        descripcion: "Aprendizaje + Servicio: Metodología de compromiso social",
        codigo: "MVE-001",
        nivel: NivelCurso.AVANZADO,
        duracion: 60,
        modalidad: "Presencial",
        fechaInicio: new Date("2024-10-01"),
        fechaFin: new Date("2024-11-15"),
        cupos: 15,
        categoriaId: categorias[5].id, // Metodologías Vinculadas con Entorno
        departamentoId: departamentos[4].id,
        instructorId: docentes[4].docente?.id,
      },
    })
    cursos.push(cursoApS)

    const cursoSTEM = await prisma.curso.create({
      data: {
        nombre: "STEM",
        descripcion: "Science, Technology, Engineering and Mathematics en educación",
        codigo: "MVE-002",
        nivel: NivelCurso.AVANZADO,
        duracion: 65,
        modalidad: "Híbrida",
        fechaInicio: new Date("2024-10-15"),
        fechaFin: new Date("2024-12-01"),
        cupos: 12,
        categoriaId: categorias[5].id, // Metodologías Vinculadas con Entorno
        departamentoId: departamentos[4].id,
        instructorId: docentes[2].docente?.id,
      },
    })
    cursos.push(cursoSTEM)

    const cursoCOIL = await prisma.curso.create({
      data: {
        nombre: "COIL",
        descripcion: "Collaborative Online International Learning",
        codigo: "MVE-003",
        nivel: NivelCurso.AVANZADO,
        duracion: 40,
        modalidad: "Virtual",
        fechaInicio: new Date("2024-11-01"),
        fechaFin: new Date("2024-11-30"),
        cupos: 20,
        categoriaId: categorias[5].id, // Metodologías Vinculadas con Entorno
        departamentoId: departamentos[4].id,
        instructorId: docentes[4].docente?.id,
      },
    })
    cursos.push(cursoCOIL)

    // NIVEL AVANZADO - Categoría: Didáctica
    const cursoDidactica = await prisma.curso.create({
      data: {
        nombre: "Didáctica",
        descripcion: "Didáctica especializada y metodologías avanzadas de enseñanza",
        codigo: "DID-001",
        nivel: NivelCurso.AVANZADO,
        duracion: 70,
        modalidad: "Presencial",
        fechaInicio: new Date("2024-12-01"),
        fechaFin: new Date("2025-01-31"),
        cupos: 10,
        categoriaId: categorias[6].id, // Didáctica
        departamentoId: departamentos[4].id,
        instructorId: docentes[4].docente?.id,
      },
    })
    cursos.push(cursoDidactica)

    console.log(`✅ ${cursos.length} cursos creados`)

    // Crear inscripciones estratégicas para demostrar la lógica de niveles
    console.log("📝 Creando inscripciones...")
    const inscripciones = []

    // Juan Pérez (Nivel Inicial) - Solo completó el curso inicial
    const inscripcion1 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[0].docente!.id,
        cursoId: cursoModeloEducativo.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2024-02-15"),
        fechaAprobacion: new Date("2024-03-15"),
        nota: 85.5,
      },
    })
    inscripciones.push(inscripcion1)

    // María González (Nivel Intermedio) - Completó inicial y todas las categorías del intermedio
    // Modelo Educativo (completado)
    const inscripcion2 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[1].docente!.id,
        cursoId: cursoModeloEducativo.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2024-02-20"),
        fechaAprobacion: new Date("2024-03-15"),
        nota: 92.0,
      },
    })
    inscripciones.push(inscripcion2)

    // Ambientes Propicios - Perspectiva de Género (completado)
    const inscripcion3 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[1].docente!.id,
        cursoId: cursoPerspectiva.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2024-03-25"),
        fechaAprobacion: new Date("2024-04-20"),
        nota: 88.0,
      },
    })
    inscripciones.push(inscripcion3)

    // Enseñanza Centrada - Metodologías Activas (completado)
    const inscripcion4 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[1].docente!.id,
        cursoId: cursoMetodologias.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2024-04-25"),
        fechaAprobacion: new Date("2024-05-25"),
        nota: 90.5,
      },
    })
    inscripciones.push(inscripcion4)

    // Planificación (completado)
    const inscripcion5 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[1].docente!.id,
        cursoId: cursoPlanificacion.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2024-05-25"),
        fechaAprobacion: new Date("2024-06-30"),
        nota: 87.0,
      },
    })
    inscripciones.push(inscripcion5)

    // Reflexión Práctica - DEDU (completado)
    const inscripcion6 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[1].docente!.id,
        cursoId: cursoDEDU.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2024-06-25"),
        fechaAprobacion: new Date("2024-07-31"),
        nota: 91.5,
      },
    })
    inscripciones.push(inscripcion6)

    // Carlos Rodríguez (Nivel Avanzado) - Completó todos los niveles
    // Nivel Inicial
    const inscripcion7 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[2].docente!.id,
        cursoId: cursoModeloEducativo.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2023-03-01"),
        fechaAprobacion: new Date("2023-03-15"),
        nota: 95.0,
      },
    })
    inscripciones.push(inscripcion7)

    // Nivel Intermedio - Una de cada categoría
    const inscripcion8 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[2].docente!.id,
        cursoId: cursoNeurodiversidad.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2023-04-01"),
        fechaAprobacion: new Date("2023-05-05"),
        nota: 93.0,
      },
    })
    inscripciones.push(inscripcion8)

    const inscripcion9 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[2].docente!.id,
        cursoId: cursoEvaluacion.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2023-05-01"),
        fechaAprobacion: new Date("2023-06-10"),
        nota: 94.5,
      },
    })
    inscripciones.push(inscripcion9)

    const inscripcion10 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[2].docente!.id,
        cursoId: cursoPlanificacion.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2023-06-01"),
        fechaAprobacion: new Date("2023-06-30"),
        nota: 96.0,
      },
    })
    inscripciones.push(inscripcion10)

    const inscripcion11 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[2].docente!.id,
        cursoId: cursoDIDU.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2023-08-01"),
        fechaAprobacion: new Date("2023-08-31"),
        nota: 92.5,
      },
    })
    inscripciones.push(inscripcion11)

    // Nivel Avanzado - Una de cada categoría
    const inscripcion12 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[2].docente!.id,
        cursoId: cursoSTEM.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2023-10-01"),
        fechaAprobacion: new Date("2023-12-01"),
        nota: 97.0,
      },
    })
    inscripciones.push(inscripcion12)

    const inscripcion13 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[2].docente!.id,
        cursoId: cursoDidactica.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2023-12-01"),
        fechaAprobacion: new Date("2024-01-31"),
        nota: 98.0,
      },
    })
    inscripciones.push(inscripcion13)

    // Ana Martínez (Nivel Intermedio) - En proceso de completar intermedio
    const inscripcion14 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[3].docente!.id,
        cursoId: cursoModeloEducativo.id,
        estado: EstadoCurso.APROBADO,
        fechaInscripcion: new Date("2024-02-10"),
        fechaAprobacion: new Date("2024-03-15"),
        nota: 86.0,
      },
    })
    inscripciones.push(inscripcion14)

    const inscripcion15 = await prisma.inscripcionCurso.create({
      data: {
        docenteId: docentes[3].docente!.id,
        cursoId: cursoNeurodiversidad.id,
        estado: EstadoCurso.EN_PROCESO,
        fechaInscripcion: new Date("2024-04-10"),
        fechaInicio: new Date("2024-04-15"),
      },
    })
    inscripciones.push(inscripcion15)

    console.log(`✅ ${inscripciones.length} inscripciones creadas`)

    // Crear certificados de ejemplo
    console.log("🏆 Creando certificados...")
    const certificados = []

    const certificado1 = await prisma.certificado.create({
      data: {
        titulo: "Certificado Nivel Inicial - Modelo Educativo",
        descripcion: "Certificado por completar exitosamente el nivel inicial del programa de desarrollo docente",
        tipo: "NIVEL",
        fechaEmision: new Date("2024-03-16"),
        codigoVerificacion: "CERT-NI-001-2024",
        docenteId: docentes[0].docente!.id,
      },
    })
    certificados.push(certificado1)

    const certificado2 = await prisma.certificado.create({
      data: {
        titulo: "Certificado Nivel Intermedio - Desarrollo Docente",
        descripcion: "Certificado por completar exitosamente el nivel intermedio del programa de desarrollo docente",
        tipo: "NIVEL",
        fechaEmision: new Date("2024-08-01"),
        codigoVerificacion: "CERT-NIN-001-2024",
        docenteId: docentes[1].docente!.id,
      },
    })
    certificados.push(certificado2)

    const certificado3 = await prisma.certificado.create({
      data: {
        titulo: "Certificado Nivel Avanzado - Desarrollo Docente",
        descripcion: "Certificado por completar exitosamente el nivel avanzado del programa de desarrollo docente",
        tipo: "NIVEL",
        fechaEmision: new Date("2024-02-01"),
        codigoVerificacion: "CERT-NAV-001-2024",
        docenteId: docentes[2].docente!.id,
      },
    })
    certificados.push(certificado3)

    console.log(`✅ ${certificados.length} certificados creados`)

    // Crear evaluaciones de ejemplo
    console.log("📊 Creando evaluaciones...")
    const evaluaciones = []

    const evaluacion1 = await prisma.evaluacion.create({
      data: {
        titulo: "Evaluación de Satisfacción - Modelo Educativo",
        descripcion: "Encuesta de satisfacción del curso Modelo Educativo",
        tipo: "ENCUESTA",
        fechaInicio: new Date("2024-03-10"),
        fechaFin: new Date("2024-03-20"),
        activa: true,
        obligatoria: true,
      },
    })
    evaluaciones.push(evaluacion1)

    const evaluacion2 = await prisma.evaluacion.create({
      data: {
        titulo: "Evaluación Final - Didáctica Avanzada",
        descripcion: "Evaluación final del curso de Didáctica",
        tipo: "EXAMEN",
        fechaInicio: new Date("2024-01-25"),
        fechaFin: new Date("2024-01-30"),
        activa: false,
        obligatoria: true,
      },
    })
    evaluaciones.push(evaluacion2)

    const evaluacion3 = await prisma.evaluacion.create({
      data: {
        titulo: "Proyecto Final - STEM",
        descripcion: "Proyecto de aplicación de metodologías STEM",
        tipo: "PROYECTO",
        fechaInicio: new Date("2024-11-15"),
        fechaFin: new Date("2024-12-01"),
        activa: true,
        obligatoria: true,
      },
    })
    evaluaciones.push(evaluacion3)

    console.log(`✅ ${evaluaciones.length} evaluaciones creadas`)

    // Crear capacitaciones de ejemplo
    console.log("🎓 Creando capacitaciones...")
    const capacitaciones = []

    const capacitacion1 = await prisma.capacitacion.create({
      data: {
        titulo: "Taller de Inducción al Modelo Educativo",
        descripcion: "Taller introductorio para nuevos docentes sobre el modelo educativo institucional",
        fechaInicio: new Date("2024-02-15"),
        fechaFin: new Date("2024-02-16"),
        modalidad: "Presencial",
        estado: "FINALIZADA",
        cupos: 40,
        ubicacion: "Auditorio Principal",
      },
    })
    capacitaciones.push(capacitacion1)

    const capacitacion2 = await prisma.capacitacion.create({
      data: {
        titulo: "Seminario de Metodologías Innovadoras",
        descripcion: "Seminario sobre las últimas tendencias en metodologías educativas",
        fechaInicio: new Date("2024-06-15"),
        fechaFin: new Date("2024-06-16"),
        modalidad: "Híbrida",
        estado: "PROGRAMADA",
        cupos: 30,
        ubicacion: "Sala de Conferencias B / Zoom",
      },
    })
    capacitaciones.push(capacitacion2)

    const capacitacion3 = await prisma.capacitacion.create({
      data: {
        titulo: "Workshop de Evaluación Formativa",
        descripcion: "Taller práctico sobre técnicas de evaluación formativa",
        fechaInicio: new Date("2024-09-10"),
        fechaFin: new Date("2024-09-11"),
        modalidad: "Presencial",
        estado: "PROGRAMADA",
        cupos: 25,
        ubicacion: "Laboratorio de Innovación Educativa",
      },
    })
    capacitaciones.push(capacitacion3)

    console.log(`✅ ${capacitaciones.length} capacitaciones creadas`)

    console.log("\n🎉 Seed completado exitosamente!")
    console.log("\n📊 Resumen de datos creados:")
    console.log(`- ${departamentos.length} departamentos`)
    console.log(`- ${categorias.length} categorías`)
    console.log(`- ${docentes.length + 1} usuarios (${docentes.length} docentes + 1 admin)`)
    console.log(`- ${cursos.length} cursos`)
    console.log(`- ${inscripciones.length} inscripciones`)
    console.log(`- ${certificados.length} certificados`)
    console.log(`- ${evaluaciones.length} evaluaciones`)
    console.log(`- ${capacitaciones.length} capacitaciones`)

    console.log("\n📚 Estructura de cursos por nivel:")
    console.log("NIVEL INICIAL:")
    console.log("  - Modelo Educativo: Curso Modelo Educativo")
    console.log("\nNIVEL INTERMEDIO:")
    console.log("  - Ambientes Propicios: Perspectiva de Género, Neurodiversidad e Inclusión")
    console.log("  - Enseñanza Centrada: Metodologías Activas, Evaluación")
    console.log("  - Planificación: Planificación de la Enseñanza")
    console.log("  - Reflexión Práctica: DEDU, DIDU, Concursos Investigación")
    console.log("\nNIVEL AVANZADO:")
    console.log("  - Metodologías con Entorno: A+S, STEM, COIL")
    console.log("  - Didáctica: Didáctica")

    console.log("\n👥 Estado de docentes:")
    console.log("- Juan Pérez: Nivel INICIAL (completó Modelo Educativo)")
    console.log("- María González: Nivel INTERMEDIO (completó todas las categorías intermedias)")
    console.log("- Carlos Rodríguez: Nivel AVANZADO (completó todos los niveles)")
    console.log("- Ana Martínez: Nivel INTERMEDIO (en proceso)")
    console.log("- Patricia Silva: Coordinadora AVANZADA (instructora)")

    console.log("\n🔐 Credenciales de acceso:")
    console.log("Admin: admin@utem.cl / 123456")
    console.log("Docentes:")
    console.log("- juan.perez@utem.cl / 123456 (Nivel Inicial)")
    console.log("- maria.gonzalez@utem.cl / 123456 (Nivel Intermedio)")
    console.log("- carlos.rodriguez@utem.cl / 123456 (Nivel Avanzado - Instructor)")
    console.log("- ana.martinez@utem.cl / 123456 (Nivel Intermedio - En proceso)")
    console.log("- patricia.silva@utem.cl / 123456 (Coordinadora - Nivel Avanzado)")
  } catch (error) {
    console.error("❌ Error durante el seed:", error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })