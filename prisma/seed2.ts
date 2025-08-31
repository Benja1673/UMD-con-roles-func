import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const commonPassword = "1234"
  const hashedPassword = await bcrypt.hash(commonPassword, 10)

  const users = [
    {
      email: "admin@utem.cl",
      role: "Admin",
    },
    {
      email: "supervisor@utem.cl",
      role: "Supervisor",
    },
    {
      email: "docente@utem.cl",
      role: "Docente",
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        hashedPassword, // ⚠️ Usa el campo correcto
        role: user.role,
      },
    })
  }

  console.log("Usuarios de prueba creados con éxito.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })