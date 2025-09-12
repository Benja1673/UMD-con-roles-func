import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Obtener sesión
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Buscar usuario
    const userDb = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        inscripciones: { include: { curso: true } },
        departamento: true, // opcional
      },
    })

    if (!userDb) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    // Mapear datos
    const userSafe = {
      id: userDb.id,
      name: userDb.name ?? "",
      apellido: userDb.apellido ?? "",
      rut: userDb.rut ?? "",
      email: userDb.email,
      telefono: userDb.telefono ?? undefined,
      direccion: userDb.direccion ?? undefined,
      carrera: userDb.departamento?.nombre ?? undefined,
      inscripciones: userDb.inscripciones.map((i) => ({
        id: i.id,
        estado: i.estado ?? "No Inscrito",
        curso: {
          id: i.curso.id,
          nombre: i.curso.nombre ?? "",
          descripcion: i.curso.descripcion ?? "",
          categoria: (i.curso as any).categoria ?? "Sin categoría",
          nivel: (i.curso as any).nivel ?? "Inicial",
        },
      })),
    }

    return NextResponse.json(userSafe)
  } catch (error) {
    console.error("Error en /api/user/profile:", error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
