"use client"

import { useState } from "react"
import { Edit } from "lucide-react"
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

// Tipo para los cursos
type Curso = {
  id: number
  nivel: "Inicial" | "Intermedio" | "Avanzado"
  categoria: string
  nombre: string
  estado: "Aprobado" | "No Aprobado" | "No Inscrito"
}

export default function ProfileCard() {
  const userData = {
    nombre: "BENJAMIN DAVID CORONADO VILUGRON",
    rut: "12.345.678-9",
    carrera: "Ingeniería en Informática",
    email: "benjamin.coronado@utem.cl",
    telefono: "+56 9 1234 5678",
    direccion: "Av. Ejemplo 1234, Santiago",
    fechaNacimiento: "01/01/1990",
  }

  const [cursos, setCursos] = useState<Curso[]>([
    { id: 1, nivel: "Inicial", categoria: "Modelo Educativo", nombre: "Modelo Educativo", estado: "Aprobado" },
    {
      id: 2,
      nivel: "Intermedio",
      categoria: "Ambientes Propicios para el Aprendizaje",
      nombre: "Perspectiva de género",
      estado: "Aprobado",
    },
    {
      id: 3,
      nivel: "Intermedio",
      categoria: "Ambientes Propicios para el Aprendizaje",
      nombre: "Neurodiversidad e Inclusión",
      estado: "No Aprobado",
    },
    {
      id: 4,
      nivel: "Intermedio",
      categoria: "Enseñanza en Aula Centrada en el Estudiantado",
      nombre: "Metodologías Activas",
      estado: "Aprobado",
    },
    {
      id: 5,
      nivel: "Intermedio",
      categoria: "Enseñanza en Aula Centrada en el Estudiantado",
      nombre: "Evaluación",
      estado: "No Aprobado",
    },
    {
      id: 6,
      nivel: "Intermedio",
      categoria: "Planificación de la Enseñanza",
      nombre: "Planificación de la enseñanza",
      estado: "Aprobado",
    },
    {
      id: 7,
      nivel: "Intermedio",
      categoria: "Reflexión sobre la Práctica Docente",
      nombre: "DEDU",
      estado: "No Aprobado",
    },
    {
      id: 8,
      nivel: "Intermedio",
      categoria: "Reflexión sobre la Práctica Docente",
      nombre: "DIDU",
      estado: "Aprobado",
    },
    {
      id: 9,
      nivel: "Intermedio",
      categoria: "Reflexión sobre la Práctica Docente",
      nombre: "Concursos Investigación",
      estado: "No Inscrito",
    },
    {
      id: 10,
      nivel: "Avanzado",
      categoria: "Metodologías Vinculadas con el Entorno",
      nombre: "A+S",
      estado: "No Inscrito",
    },
    {
      id: 11,
      nivel: "Avanzado",
      categoria: "Metodologías Vinculadas con el Entorno",
      nombre: "STEM",
      estado: "No Inscrito",
    },
    {
      id: 12,
      nivel: "Avanzado",
      categoria: "Metodologías Vinculadas con el Entorno",
      nombre: "COIL",
      estado: "No Inscrito",
    },
    { id: 13, nivel: "Avanzado", categoria: "Didáctica", nombre: "Didáctica", estado: "No Inscrito" },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cursoActual, setCursoActual] = useState<Curso | null>(null)
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<"Aprobado" | "No Aprobado" | "No Inscrito">(
    "No Aprobado",
  )

  const getCursoByNombre = (nombre: string): Curso | undefined => {
    return cursos.find((curso) => curso.nombre === nombre)
  }

  const renderEstadoCurso = (curso?: Curso) => {
    if (!curso)
      return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">No disponible</span>

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          curso.estado === "Aprobado"
            ? "bg-green-100 text-green-800"
            : curso.estado === "No Aprobado"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
        }`}
      >
        {curso.estado}
      </span>
    )
  }

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

  return (
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
                <label className="block text-sm font-medium text-gray-500">Carrera</label>
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Editar información</button>
      </div>

      {/* Tabla de cursos del docente */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Mis Cursos</h2>

        <div className="border rounded-md overflow-x-auto">
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
                  {renderEstadoCurso(getCursoByNombre("Modelo Educativo"))}
                </TableCell>

                {/* Perspectiva de género */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("Perspectiva de género"))}
                </TableCell>

                {/* Neurodiversidad e Inclusión */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("Neurodiversidad e Inclusión"))}
                </TableCell>

                {/* Metodologías Activas */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("Metodologías Activas"))}
                </TableCell>

                {/* Evaluación */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("Evaluación"))}
                </TableCell>

                {/* Planificación de la enseñanza */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("Planificación de la enseñanza"))}
                </TableCell>

                {/* DEDU */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("DEDU"))}
                </TableCell>

                {/* DIDU */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("DIDU"))}
                </TableCell>

                {/* Concursos Investigación */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("Concursos Investigación"))}
                </TableCell>

                {/* A+S */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("A+S"))}
                </TableCell>

                {/* STEM */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("STEM"))}
                </TableCell>

                {/* COIL */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("COIL"))}
                </TableCell>

                {/* DIDÁCTICA */}
                <TableCell className="text-center border border-gray-200">
                  {renderEstadoCurso(getCursoByNombre("Didáctica"))}
                </TableCell>

                {/* Nivel */}
                <TableCell className="text-center border border-gray-200">
                  {(() => {
                    // Verificar nivel Inicial (al menos un curso aprobado en cada categoría)
                    const tieneNivelInicial = getCursoByNombre("Modelo Educativo")?.estado === "Aprobado"

                    // Verificar nivel Intermedio (al menos un curso aprobado en cada categoría)
                    const tieneAmbientesPropicios =
                      getCursoByNombre("Perspectiva de género")?.estado === "Aprobado" ||
                      getCursoByNombre("Neurodiversidad e Inclusión")?.estado === "Aprobado"

                    const tieneEnsenanzaAula =
                      getCursoByNombre("Metodologías Activas")?.estado === "Aprobado" ||
                      getCursoByNombre("Evaluación")?.estado === "Aprobado"

                    const tienePlanificacion = getCursoByNombre("Planificación de la enseñanza")?.estado === "Aprobado"

                    const tieneReflexion =
                      getCursoByNombre("DEDU")?.estado === "Aprobado" ||
                      getCursoByNombre("DIDU")?.estado === "Aprobado" ||
                      getCursoByNombre("Concursos Investigación")?.estado === "Aprobado"

                    const tieneNivelIntermedio =
                      tieneNivelInicial &&
                      tieneAmbientesPropicios &&
                      tieneEnsenanzaAula &&
                      tienePlanificacion &&
                      tieneReflexion

                    // Verificar nivel Avanzado (al menos un curso aprobado en cada categoría)
                    const tieneMetodologiasVinculadas =
                      getCursoByNombre("A+S")?.estado === "Aprobado" ||
                      getCursoByNombre("STEM")?.estado === "Aprobado" ||
                      getCursoByNombre("COIL")?.estado === "Aprobado"

                    const tieneDidactica = getCursoByNombre("Didáctica")?.estado === "Aprobado"

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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditarEstado(getCursoByNombre("Modelo Educativo"))}
                  >
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
                onValueChange={(value) => setEstadoSeleccionado(value as "Aprobado" | "No Aprobado" | "No Inscrito")}
              >
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aprobado">Aprobado</SelectItem>
                  <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                  <SelectItem value="No Inscrito">No Inscrito</SelectItem>
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
