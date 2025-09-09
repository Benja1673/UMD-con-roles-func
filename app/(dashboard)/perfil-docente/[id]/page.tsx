"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Edit } from "lucide-react"
import BreadcrumbNav from "@/components/breadcrumb-nav"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Tipo para los datos de users
type User = {
  id: number
  nombre: string
  apellido: string
  rut: string
  email: string
  departamento: string
  especialidad: string
  estado: "Activo" | "Inactivo"
  cursos?: {
    modeloEducativo?: "Aprobado" | "No Aprobado" | "No Inscrito"
    perspectivaGenero?: "Aprobado" | "No Aprobado" | "No Inscrito"
    neurodiversidadInclusion?: "Aprobado" | "No Aprobado" | "No Inscrito"
    metodologiasActivas?: "Aprobado" | "No Aprobado" | "No Inscrito"
    evaluacion?: "Aprobado" | "No Aprobado" | "No Inscrito"
    planificacionEnsenanza?: "Aprobado" | "No Aprobado" | "No Inscrito"
    dedu?: "Aprobado" | "No Aprobado" | "No Inscrito"
    didu?: "Aprobado" | "No Aprobado" | "No Inscrito"
    concursosInvestigacion?: "Aprobado" | "No Aprobado" | "No Inscrito"
    aS?: "Aprobado" | "No Aprobado" | "No Inscrito"
    stem?: "Aprobado" | "No Aprobado" | "No Inscrito"
    coil?: "Aprobado" | "No Aprobado" | "No Inscrito"
    didactica?: "Aprobado" | "No Aprobado" | "No Inscrito"
  }
}

// Tipo para los cursos
type Curso = {
  id: number
  nombre: string
  estado: "Completado" | "En proceso" | "No inscrito"
}

// Datos de ejemplo
const usersIniciales: User[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    rut: "12.345.678-9",
    email: "juan.perez@utem.cl",
    departamento: "Informática",
    especialidad: "Programación",
    estado: "Activo",
    cursos: {
      modeloEducativo: "Aprobado",
      perspectivaGenero: "Aprobado",
      neurodiversidadInclusion: "No Aprobado",
      metodologiasActivas: "Aprobado",
      evaluacion: "No Aprobado",
      planificacionEnsenanza: "Aprobado",
      dedu: "No Aprobado",
      didu: "Aprobado",
      concursosInvestigacion: "No Aprobado",
      aS: "Aprobado",
      stem: "No Aprobado",
      coil: "Aprobado",
      didactica: "No Aprobado",
    },
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    rut: "11.222.333-4",
    email: "maria.gonzalez@utem.cl",
    departamento: "Matemáticas",
    especialidad: "Álgebra",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Rodríguez",
    rut: "10.111.222-3",
    email: "carlos.rodriguez@utem.cl",
    departamento: "Física",
    especialidad: "Mecánica",
    estado: "Inactivo",
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "Martínez",
    rut: "9.888.777-6",
    email: "ana.martinez@utem.cl",
    departamento: "Informática",
    especialidad: "Bases de Datos",
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "Pedro",
    apellido: "Sánchez",
    rut: "8.777.666-5",
    email: "pedro.sanchez@utem.cl",
    departamento: "Matemáticas",
    especialidad: "Estadística",
    estado: "Activo",
  },
]

export default function PerfilUser() {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [cursos, setCursos] = useState<Curso[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cursoActual, setCursoActual] = useState<Curso | null>(null)
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<"Completado" | "En proceso" | "No inscrito">(
    "En proceso",
  )

  useEffect(() => {
    // En un caso real, aquí haríamos una llamada a la API
    // Por ahora, simplemente buscamos en los datos de ejemplo
    const id = Number(params.id)
    const userEncontrado = usersIniciales.find((d) => d.id === id) || null
    setUser(userEncontrado)

    // Datos de ejemplo para los cursos
    setCursos([
      { id: 1, nombre: "Programación Avanzada", estado: "Completado" },
      { id: 2, nombre: "Bases de Datos", estado: "En proceso" },
      { id: 3, nombre: "Inteligencia Artificial", estado: "No inscrito" },
      { id: 4, nombre: "Desarrollo Web", estado: "Completado" },
      { id: 5, nombre: "Sistemas Operativos", estado: "En proceso" },
    ])
  }, [params.id])

  const handleEditarEstado = (curso: Curso) => {
    setCursoActual(curso)
    setEstadoSeleccionado(curso.estado)
    setIsDialogOpen(true)
  }

  const handleGuardarEstado = () => {
    if (cursoActual) {
      setCursos(cursos.map((c) => (c.id === cursoActual.id ? { ...c, estado: estadoSeleccionado } : c)))
      setIsDialogOpen(false)
    }
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <BreadcrumbNav current="PERFIL DOCENTE" parent={{ label: "GESTIÓN DOCENTE", href: "/gestion-user" }} />
        <div className="bg-white rounded-lg shadow p-6">
          <p>Docente no encontrado</p>
        </div>
      </div>
    )
  }

  const userData = {
    nombre: `${user.nombre} ${user.apellido}`,
    rut: user.rut,
    carrera: user.departamento,
    email: user.email,
    telefono: "+56 9 1234 5678",
    direccion: "Av. Ejemplo 1234, Santiago",
    fechaNacimiento: "01/01/1980",
    especialidad: user.especialidad,
    estado: user.estado,
  }

  return (
    <div className="space-y-6">
      <BreadcrumbNav
        current={`PERFIL DE ${user.nombre.toUpperCase()} ${user.apellido.toUpperCase()}`}
        parent={{ label: "GESTIÓN DOCENTE", href: "/gestion-user" }}
      />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
              <div className="h-32 w-32 rounded-full bg-gray-300 mb-4 overflow-hidden">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-lg font-medium text-center">{userData.nombre}</h2>
              <p className="text-gray-500 text-sm">{userData.rut}</p>
              <p className="text-blue-600 font-medium mt-2">{userData.carrera}</p>
              <p className="text-gray-500 text-sm mt-1">Especialidad: {userData.especialidad}</p>
              <p
                className={`mt-2 px-2 py-1 rounded text-xs font-medium ${
                  userData.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {userData.estado}
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Información Personal</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Nombre completo</label>
                    <p>{userData.nombre}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">RUT</label>
                    <p>{userData.rut}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Departamento</label>
                  <p>{userData.carrera}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p>{userData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Teléfono</label>
                    <p>{userData.telefono}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Dirección</label>
                  <p>{userData.direccion}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Fecha de nacimiento</label>
                  <p>{userData.fechaNacimiento}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Especialidad</label>
                  <p>{userData.especialidad}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Editar información</button>
        </div>
      </div>

      {/* Tabla de cursos del user */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Cursos del Docente</h2>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={1} className="text-center border border-gray-300">
                  INICIAL
                </TableHead>
                <TableHead colSpan={9} className="text-center border border-gray-300">
                  INTERMEDIO
                </TableHead>
                <TableHead colSpan={3} className="text-center border border-gray-300">
                  AVANZADO
                </TableHead>
                <TableHead rowSpan={3} className="text-center border border-gray-300">
                  Nivel
                </TableHead>
                <TableHead rowSpan={3} className="text-right border border-gray-300">
                  Acciones
                </TableHead>
              </TableRow>
              <TableRow>
                {/* Nivel Inicial - Categorías */}
                <TableHead colSpan={1} className="text-center border border-gray-300">
                  MODELO EDUCATIVO
                </TableHead>

                {/* Nivel Intermedio - Categorías */}
                <TableHead colSpan={2} className="text-center border border-gray-300">
                  AMBIENTES PROPICIOS
                </TableHead>
                <TableHead colSpan={2} className="text-center border border-gray-300">
                  ENSEÑANZA EN AULA
                </TableHead>
                <TableHead colSpan={1} className="text-center border border-gray-300">
                  PLANIFICACIÓN
                </TableHead>
                <TableHead colSpan={4} className="text-center border border-gray-300">
                  REFLEXIÓN DOCENTE
                </TableHead>

                {/* Nivel Avanzado - Categorías */}
                <TableHead colSpan={2} className="text-center border border-gray-300">
                  METODOLOGÍAS VINCULADAS
                </TableHead>
                <TableHead colSpan={1} className="text-center border border-gray-300">
                  DIDÁCTICA
                </TableHead>
              </TableRow>
              <TableRow>
                {/* Nivel Inicial */}
                <TableHead className="text-center border border-gray-300">Modelo Educativo</TableHead>

                {/* Nivel Intermedio - Ambientes propicios */}
                <TableHead className="text-center border border-gray-300">Perspectiva de género</TableHead>
                <TableHead className="text-center border border-gray-300">Neurodiversidad e Inclusión</TableHead>

                {/* Nivel Intermedio - Enseñanza en aula */}
                <TableHead className="text-center border border-gray-300">Metodologías Activas</TableHead>
                <TableHead className="text-center border border-gray-300">Evaluación</TableHead>

                {/* Nivel Intermedio - Planificación */}
                <TableHead className="text-center border border-gray-300">Planificación de la enseñanza</TableHead>

                {/* Nivel Intermedio - Reflexión */}
                <TableHead className="text-center border border-gray-300">DEDU</TableHead>
                <TableHead className="text-center border border-gray-300">DIDU</TableHead>
                <TableHead className="text-center border border-gray-300">Concursos Investigación</TableHead>

                {/* Nivel Avanzado - Metodologías vinculadas */}
                <TableHead className="text-center border border-gray-300">A+S</TableHead>
                <TableHead className="text-center border border-gray-300">STEM</TableHead>
                <TableHead className="text-center border border-gray-300">COIL</TableHead>

                {/* Nivel Avanzado - Didáctica */}
                <TableHead className="text-center border border-gray-300">DIDÁCTICA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {/* Modelo Educativo */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.modeloEducativo === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.modeloEducativo === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.modeloEducativo || "No Inscrito"}
                  </span>
                </TableCell>

                {/* Perspectiva de género */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.perspectivaGenero === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.perspectivaGenero === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.perspectivaGenero || "No Inscrito"}
                  </span>
                </TableCell>

                {/* Neurodiversidad e Inclusión */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.neurodiversidadInclusion === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.neurodiversidadInclusion === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.neurodiversidadInclusion || "No Inscrito"}
                  </span>
                </TableCell>

                {/* Metodologías Activas */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.metodologiasActivas === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.metodologiasActivas === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.metodologiasActivas || "No Inscrito"}
                  </span>
                </TableCell>

                {/* Evaluación */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.evaluacion === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.evaluacion === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.evaluacion || "No Inscrito"}
                  </span>
                </TableCell>

                {/* Planificación de la enseñanza */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.planificacionEnsenanza === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.planificacionEnsenanza === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.planificacionEnsenanza || "No Inscrito"}
                  </span>
                </TableCell>

                {/* DEDU */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.dedu === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.dedu === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.dedu || "No Inscrito"}
                  </span>
                </TableCell>

                {/* DIDU */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.didu === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.didu === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.didu || "No Inscrito"}
                  </span>
                </TableCell>

                {/* Concursos Investigación */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.concursosInvestigacion === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.concursosInvestigacion === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.concursosInvestigacion || "No Inscrito"}
                  </span>
                </TableCell>

                {/* A+S */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.aS === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.aS === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.aS || "No Inscrito"}
                  </span>
                </TableCell>

                {/* STEM */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.stem === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.stem === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.stem || "No Inscrito"}
                  </span>
                </TableCell>

                {/* COIL */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.coil === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.coil === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.coil || "No Inscrito"}
                  </span>
                </TableCell>

                {/* DIDÁCTICA */}
                <TableCell className="text-center border border-gray-200">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.cursos?.didactica === "Aprobado"
                        ? "bg-green-100 text-green-800"
                        : user.cursos?.didactica === "No Aprobado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.cursos?.didactica || "No Inscrito"}
                  </span>
                </TableCell>

                {/* Nivel */}
                <TableCell className="text-center border border-gray-200">
                  {(() => {
                    // Verificar nivel Inicial (al menos un curso aprobado en cada categoría)
                    const tieneNivelInicial = user.cursos?.modeloEducativo === "Aprobado"

                    // Verificar nivel Intermedio (al menos un curso aprobado en cada categoría)
                    const tieneAmbientesPropicios =
                      user.cursos?.perspectivaGenero === "Aprobado" ||
                      user.cursos?.neurodiversidadInclusion === "Aprobado"

                    const tieneEnsenanzaAula =
                      user.cursos?.metodologiasActivas === "Aprobado" || user.cursos?.evaluacion === "Aprobado"

                    const tienePlanificacion = user.cursos?.planificacionEnsenanza === "Aprobado"

                    const tieneReflexion =
                      user.cursos?.dedu === "Aprobado" ||
                      user.cursos?.didu === "Aprobado" ||
                      user.cursos?.concursosInvestigacion === "Aprobado"

                    const tieneNivelIntermedio =
                      tieneNivelInicial &&
                      tieneAmbientesPropicios &&
                      tieneEnsenanzaAula &&
                      tienePlanificacion &&
                      tieneReflexion

                    // Verificar nivel Avanzado (al menos un curso aprobado en cada categoría)
                    const tieneMetodologiasVinculadas =
                      user.cursos?.aS === "Aprobado" ||
                      user.cursos?.stem === "Aprobado" ||
                      user.cursos?.coil === "Aprobado"

                    const tieneDidactica = user.cursos?.didactica === "Aprobado"

                    const tieneNivelAvanzado = tieneNivelIntermedio && tieneMetodologiasVinculadas && tieneDidactica

                    // Determinar el nivel más alto alcanzado
                    let nivel = "Sin nivel"
                    let bgColorClass = "bg-gray-100 text-gray-800"

                    if (tieneNivelAvanzado) {
                      nivel = "Avanzado"
                      bgColorClass = "bg-green-100 text-green-800"
                    } else if (tieneNivelIntermedio) {
                      nivel = "Intermedio"
                      bgColorClass = "bg-blue-100 text-blue-800"
                    } else if (tieneNivelInicial) {
                      nivel = "Inicial"
                      bgColorClass = "bg-orange-100 text-orange-800"
                    }

                    return <span className={`px-2 py-1 rounded text-xs font-medium ${bgColorClass}`}>{nivel}</span>
                  })()}
                </TableCell>

                {/* Acciones */}
                <TableCell className="text-right border border-gray-200">
                  <Button variant="ghost" size="sm" onClick={() => handleEditarEstado(cursos[0])}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Diálogo para editar estado del curso */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Estado del Curso</DialogTitle>
            <DialogDescription>Actualiza el estado del curso {cursoActual?.nombre}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Select
                value={estadoSeleccionado}
                onValueChange={(value) => setEstadoSeleccionado(value as "Completado" | "En proceso" | "No inscrito")}
              >
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="En proceso">En proceso</SelectItem>
                  <SelectItem value="No inscrito">No inscrito</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGuardarEstado}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
