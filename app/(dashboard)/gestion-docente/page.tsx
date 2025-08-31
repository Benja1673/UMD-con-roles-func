"use client"

import type React from "react"

import { Search, Plus, Edit, Trash2, Filter, ChevronDown, ArrowUp, ArrowDown, Check, X, PinIcon } from "lucide-react"
import BreadcrumbNav from "@/components/breadcrumb-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

// Update the Docente type to include course completion information
type Docente = {
  id: number
  nombre: string
  apellido: string
  rut: string
  email: string
  departamento: string
  especialidad: string
  estado: "Activo" | "Inactivo"
  cursos: {
    // Nivel Inicial
    modeloEducativo: "Aprobado" | "No Aprobado" | "No Inscrito"

    // Nivel Intermedio - Ambientes propicios
    perspectivaGenero: "Aprobado" | "No Aprobado" | "No Inscrito"
    neurodiversidadInclusion: "Aprobado" | "No Aprobado" | "No Inscrito"

    // Nivel Intermedio - Enseñanza en aula
    metodologiasActivas: "Aprobado" | "No Aprobado" | "No Inscrito"
    evaluacion: "Aprobado" | "No Aprobado" | "No Inscrito"

    // Nivel Intermedio - Planificación
    planificacionEnsenanza: "Aprobado" | "No Aprobado" | "No Inscrito"

    // Nivel Intermedio - Reflexión
    dedu: "Aprobado" | "No Aprobado" | "No Inscrito"
    didu: "Aprobado" | "No Aprobado" | "No Inscrito"
    concursosInvestigacion: "Aprobado" | "No Aprobado" | "No Inscrito"

    // Nivel Avanzado - Metodologías vinculadas
    aS: "Aprobado" | "No Aprobado" | "No Inscrito"
    stem: "Aprobado" | "No Aprobado" | "No Inscrito"
    coil: "Aprobado" | "No Aprobado" | "No Inscrito"

    // Nivel Avanzado - Didáctica
    didactica: "Aprobado" | "No Aprobado" | "No Inscrito"
  }
}

// Update the initial data to include course information
const docentesIniciales: Docente[] = [
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
      concursosInvestigacion: "No Inscrito",
      aS: "No Inscrito",
      stem: "No Inscrito",
      coil: "No Inscrito",
      didactica: "No Inscrito",
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
    cursos: {
      modeloEducativo: "Aprobado",
      perspectivaGenero: "Aprobado",
      neurodiversidadInclusion: "Aprobado",
      metodologiasActivas: "Aprobado",
      evaluacion: "Aprobado",
      planificacionEnsenanza: "Aprobado",
      dedu: "Aprobado",
      didu: "No Aprobado",
      concursosInvestigacion: "Aprobado",
      aS: "No Aprobado",
      stem: "Aprobado",
      coil: "No Inscrito",
      didactica: "No Inscrito",
    },
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
    cursos: {
      modeloEducativo: "No Aprobado",
      perspectivaGenero: "No Aprobado",
      neurodiversidadInclusion: "No Aprobado",
      metodologiasActivas: "No Aprobado",
      evaluacion: "No Aprobado",
      planificacionEnsenanza: "No Aprobado",
      dedu: "No Aprobado",
      didu: "No Aprobado",
      concursosInvestigacion: "No Aprobado",
      aS: "No Aprobado",
      stem: "No Aprobado",
      coil: "No Aprobado",
      didactica: "No Aprobado",
    },
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
    cursos: {
      modeloEducativo: "Aprobado",
      perspectivaGenero: "No Inscrito",
      neurodiversidadInclusion: "No Inscrito",
      metodologiasActivas: "Aprobado",
      evaluacion: "Aprobado",
      planificacionEnsenanza: "No Inscrito",
      dedu: "No Inscrito",
      didu: "No Inscrito",
      concursosInvestigacion: "No Inscrito",
      aS: "No Inscrito",
      stem: "No Inscrito",
      coil: "No Inscrito",
      didactica: "No Inscrito",
    },
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
    cursos: {
      modeloEducativo: "Aprobado",
      perspectivaGenero: "Aprobado",
      neurodiversidadInclusion: "Aprobado",
      metodologiasActivas: "Aprobado",
      evaluacion: "Aprobado",
      planificacionEnsenanza: "Aprobado",
      dedu: "Aprobado",
      didu: "Aprobado",
      concursosInvestigacion: "Aprobado",
      aS: "Aprobado",
      stem: "Aprobado",
      coil: "Aprobado",
      didactica: "Aprobado",
    },
  },
]

export default function GestionDocente() {
  const [docentes, setDocentes] = useState<Docente[]>(docentesIniciales)
  const [docentesFiltrados, setDocentesFiltrados] = useState<Docente[]>(docentesIniciales)
  const [busqueda, setBusqueda] = useState("")
  const [filtroDepto, setFiltroDepto] = useState<string>("todos")
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [filtrosColumna, setFiltrosColumna] = useState<{ [key: string]: string[] }>({})
  const [columnaFiltroActiva, setColumnaFiltroActiva] = useState<string | null>(null)
  const [posicionFiltro, setPosicionFiltro] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const filtroRef = useRef<HTMLDivElement>(null)
  const [cabecerasFijadas, setCabecerasFijadas] = useState(false)

  // Estado para el formulario
  const [docenteActual, setDocenteActual] = useState<Docente | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Update the form data to include course information
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    departamento: "",
    especialidad: "",
    estado: "Activo" as "Activo" | "Inactivo",
    cursos: {
      modeloEducativo: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      perspectivaGenero: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      neurodiversidadInclusion: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      metodologiasActivas: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      evaluacion: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      planificacionEnsenanza: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      dedu: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      didu: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      concursosInvestigacion: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      aS: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      stem: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      coil: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      didactica: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
    },
  })

  // Update the handleFormChange function to handle course status changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Check if this is a course field
    if (name.includes("cursos.")) {
      const courseName = name.split(".")[1]
      setFormData({
        ...formData,
        cursos: {
          ...formData.cursos,
          [courseName]: value as "Aprobado" | "No Aprobado" | "No Inscrito",
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Abrir diálogo para crear nuevo docente
  const handleNuevoDocente = () => {
    setDocenteActual(null)
    setFormData({
      nombre: "",
      apellido: "",
      rut: "",
      email: "",
      departamento: "",
      especialidad: "",
      estado: "Activo",
      cursos: {
        modeloEducativo: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        perspectivaGenero: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        neurodiversidadInclusion: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        metodologiasActivas: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        evaluacion: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        planificacionEnsenanza: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        dedu: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        didu: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        concursosInvestigacion: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        aS: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        stem: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        coil: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
        didactica: "No Inscrito" as "Aprobado" | "No Aprobado" | "No Inscrito",
      },
    })
    setIsDialogOpen(true)
  }

  // Update the handleEditarDocente function
  const handleEditarDocente = (docente: Docente) => {
    setDocenteActual(docente)
    setFormData({
      nombre: docente.nombre,
      apellido: docente.apellido,
      rut: docente.rut,
      email: docente.email,
      departamento: docente.departamento,
      especialidad: docente.especialidad,
      estado: docente.estado,
      cursos: { ...docente.cursos },
    })
    setIsDialogOpen(true)
  }

  // Abrir diálogo para eliminar docente
  const handleEliminarDialogo = (docente: Docente) => {
    setDocenteActual(docente)
    setIsDeleteDialogOpen(true)
  }

  // Eliminar docente
  const handleEliminarDocente = () => {
    if (docenteActual) {
      setDocentes(docentes.filter((d) => d.id !== docenteActual.id))
      setIsDeleteDialogOpen(false)
    }
  }

  // Guardar docente (nuevo o editado)
  const handleGuardarDocente = () => {
    if (docenteActual) {
      // Editar docente existente
      setDocentes(docentes.map((d) => (d.id === docenteActual.id ? { ...formData, id: docenteActual.id } : d)))
    } else {
      // Crear nuevo docente
      const nuevoId = Math.max(...docentes.map((d) => d.id)) + 1
      setDocentes([...docentes, { ...formData, id: nuevoId }])
    }
    setIsDialogOpen(false)
  }

  const handleGuardarCurso = () => {
    if (docenteActual) {
      // Editar docente existente
      setDocentes(docentes.map((d) => (d.id === docenteActual.id ? { ...d, ...formData } : d)))
    } else {
      // Crear nuevo docente
      const nuevoId = Math.max(...docentes.map((d) => d.id)) + 1
      setDocentes([...docentes, { ...formData, id: nuevoId }])
    }
    setIsDialogOpen(false)
  }

  const handleEliminarCurso = () => {
    if (docenteActual) {
      setDocentes(docentes.filter((d) => d.id !== docenteActual.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const handleClickColumna = (columna: string, e: React.MouseEvent) => {
    e.preventDefault()

    // Si ya está abierto el mismo filtro, cerrarlo
    if (columnaFiltroActiva === columna) {
      setColumnaFiltroActiva(null)
      return
    }

    // Establecer la posición del filtro
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setPosicionFiltro({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    })

    setColumnaFiltroActiva(columna)
  }

  // Obtener departamentos únicos para el filtro
  const departamentos = Array.from(new Set(docentes.map((d) => d.departamento)))

  const aplicarFiltros = (docentes: Docente[]) => {
    if (Object.keys(filtrosColumna).length === 0) {
      return docentes
    }

    return docentes.filter((docente) => {
      // Verificar cada filtro activo
      for (const [columna, valores] of Object.entries(filtrosColumna)) {
        if (valores.length === 0) continue

        // Filtrar según la columna
        switch (columna) {
          case "nombre":
            const nombreCompleto = `${docente.nombre} ${docente.apellido}`
            if (!valores.some((valor) => nombreCompleto.includes(valor))) return false
            break
          case "rut":
            if (!valores.includes(docente.rut)) return false
            break
          case "email":
            if (!valores.includes(docente.email)) return false
            break
          case "departamento":
            if (!valores.includes(docente.departamento)) return false
            break
          case "estado":
            if (!valores.includes(docente.estado)) return false
            break
          case "modeloEducativo":
            if (!valores.includes(docente.cursos.modeloEducativo)) return false
            break
          case "perspectivaGenero":
            if (!valores.includes(docente.cursos.perspectivaGenero)) return false
            break
          case "neurodiversidadInclusion":
            if (!valores.includes(docente.cursos.neurodiversidadInclusion)) return false
            break
          case "metodologiasActivas":
            if (!valores.includes(docente.cursos.metodologiasActivas)) return false
            break
          case "evaluacion":
            if (!valores.includes(docente.cursos.evaluacion)) return false
            break
          case "planificacionEnsenanza":
            if (!valores.includes(docente.cursos.planificacionEnsenanza)) return false
            break
          case "dedu":
            if (!valores.includes(docente.cursos.dedu)) return false
            break
          case "didu":
            if (!valores.includes(docente.cursos.didu)) return false
            break
          case "concursosInvestigacion":
            if (!valores.includes(docente.cursos.concursosInvestigacion)) return false
            break
          case "aS":
            if (!valores.includes(docente.cursos.aS)) return false
            break
          case "stem":
            if (!valores.includes(docente.cursos.stem)) return false
            break
          case "coil":
            if (!valores.includes(docente.cursos.coil)) return false
            break
          case "didactica":
            if (!valores.includes(docente.cursos.didactica)) return false
            break
          case "nivel":
            // Determinar el nivel del docente
            const tieneNivelInicial = docente.cursos.modeloEducativo === "Aprobado"

            const tieneAmbientesPropicios =
              docente.cursos.perspectivaGenero === "Aprobado" || docente.cursos.neurodiversidadInclusion === "Aprobado"

            const tieneEnsenanzaAula =
              docente.cursos.metodologiasActivas === "Aprobado" || docente.cursos.evaluacion === "Aprobado"

            const tienePlanificacion = docente.cursos.planificacionEnsenanza === "Aprobado"

            const tieneReflexion =
              docente.cursos.dedu === "Aprobado" ||
              docente.cursos.didu === "Aprobado" ||
              docente.cursos.concursosInvestigacion === "Aprobado"

            const tieneNivelIntermedio =
              tieneNivelInicial && tieneAmbientesPropicios && tieneEnsenanzaAula && tienePlanificacion && tieneReflexion

            const tieneMetodologiasVinculadas =
              docente.cursos.aS === "Aprobado" ||
              docente.cursos.stem === "Aprobado" ||
              docente.cursos.coil === "Aprobado"

            const tieneDidactica = docente.cursos.didactica === "Aprobado"

            const tieneNivelAvanzado = tieneNivelIntermedio && tieneMetodologiasVinculadas && tieneDidactica

            let nivel = "Sin nivel"

            if (tieneNivelAvanzado) {
              nivel = "Avanzado"
            } else if (tieneNivelIntermedio) {
              nivel = "Intermedio"
            } else if (tieneNivelInicial) {
              nivel = "Inicial"
            }

            if (!valores.includes(nivel)) return false
            break
        }
      }

      return true
    })
  }

  // Replace the table rendering with this updated version that includes course information
  useEffect(() => {
    let resultado = [...docentes]

    // Aplicar filtro de búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase()
      resultado = resultado.filter(
        (docente) =>
          `${docente.nombre} ${docente.apellido}`.toLowerCase().includes(busquedaLower) ||
          docente.rut.toLowerCase().includes(busquedaLower) ||
          docente.email.toLowerCase().includes(busquedaLower),
      )
    }

    // Aplicar filtro de departamento
    if (filtroDepto !== "todos") {
      resultado = resultado.filter((docente) => docente.departamento === filtroDepto)
    }

    // Aplicar filtro de estado
    if (filtroEstado !== "todos") {
      resultado = resultado.filter((docente) => docente.estado === filtroEstado)
    }

    // Aplicar filtros de columna
    resultado = aplicarFiltros(resultado)

    setDocentesFiltrados(resultado)
  }, [docentes, busqueda, filtroDepto, filtroEstado, filtrosColumna])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtroRef.current && !filtroRef.current.contains(event.target as Node)) {
        setColumnaFiltroActiva(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Función para verificar si una columna tiene filtros aplicados
  const tieneFiltroPorColumna = (columna: string) => {
    if (columna === "nombre") {
      return (
        (filtrosColumna["nombre"] && filtrosColumna["nombre"].length > 0) ||
        (filtrosColumna["apellido"] && filtrosColumna["apellido"].length > 0)
      )
    }
    return filtrosColumna[columna] && filtrosColumna[columna].length > 0
  }

  return (
    <div className="space-y-6">
      <BreadcrumbNav current="GESTIÓN DOCENTE" />

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión Docente</h1>
          <Button onClick={handleNuevoDocente} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Docente
          </Button>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, apellido, RUT o email..."
              className="pl-10"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => setCabecerasFijadas(!cabecerasFijadas)}
            >
              <PinIcon className="mr-2 h-4 w-4" /> {cabecerasFijadas ? "Desfijar Cabecera" : "Fijar Cabecera"}
            </Button>
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => {
                setBusqueda("")
                setFiltroDepto("todos")
                setFiltroEstado("todos")
                setFiltrosColumna({})
              }}
            >
              <X className="mr-2 h-4 w-4" /> Limpiar filtros
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" /> Departamento
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFiltroDepto("todos")}>Todos</DropdownMenuItem>
                {departamentos.map((depto) => (
                  <DropdownMenuItem key={depto} onClick={() => setFiltroDepto(depto)}>
                    {depto}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabla de docentes con cursos */}
        <div className={`border rounded-md ${cabecerasFijadas ? "max-h-[70vh] overflow-y-auto" : "overflow-x-auto"}`}>
          <Table>
            <TableHeader className={cabecerasFijadas ? "sticky top-0 bg-white z-10" : ""}>
              <TableRow>
                <TableHead
                  rowSpan={3}
                  className={`cursor-pointer border border-gray-300 ${tieneFiltroPorColumna("nombre") ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  onClick={(e) => handleClickColumna("nombre", e)}
                >
                  Nombre
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("nombre") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  rowSpan={3}
                  className={`cursor-pointer border border-gray-300 ${tieneFiltroPorColumna("rut") ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  onClick={(e) => handleClickColumna("rut", e)}
                >
                  RUT
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("rut") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  rowSpan={3}
                  className={`cursor-pointer border border-gray-300 ${tieneFiltroPorColumna("email") ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  onClick={(e) => handleClickColumna("email", e)}
                >
                  Email
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("email") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  rowSpan={3}
                  className={`cursor-pointer border border-gray-300 ${tieneFiltroPorColumna("departamento") ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  onClick={(e) => handleClickColumna("departamento", e)}
                >
                  Departamento
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("departamento") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead rowSpan={3} className="text-center border border-gray-300">
                  Perfil
                </TableHead>
                <TableHead colSpan={1} className="text-center border border-gray-300">
                  INICIAL
                </TableHead>
                <TableHead colSpan={9} className="text-center border border-gray-300">
                  INTERMEDIO
                </TableHead>
                <TableHead colSpan={3} className="text-center border border-gray-300">
                  AVANZADO
                </TableHead>
                <TableHead
                  rowSpan={3}
                  className={`text-center cursor-pointer border border-gray-300 ${tieneFiltroPorColumna("nivel") ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  onClick={(e) => handleClickColumna("nivel", e)}
                >
                  Nivel
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("nivel") && <Filter className="h-3 w-3 inline ml-1" />}
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
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("modeloEducativo") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("modeloEducativo", e)}
                >
                  Modelo Educativo
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("modeloEducativo") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>

                {/* Nivel Intermedio - Ambientes propicios */}
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("perspectivaGenero") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("perspectivaGenero", e)}
                >
                  Perspectiva de género
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("perspectivaGenero") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("neurodiversidadInclusion") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("neurodiversidadInclusion", e)}
                >
                  Neurodiversidad e Inclusión
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("neurodiversidadInclusion") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>

                {/* Nivel Intermedio - Enseñanza en aula */}
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("metodologiasActivas") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("metodologiasActivas", e)}
                >
                  Metodologías Activas
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("metodologiasActivas") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("evaluacion") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("evaluacion", e)}
                >
                  Evaluación
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("evaluacion") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>

                {/* Nivel Intermedio - Planificación */}
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("planificacionEnsenanza") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("planificacionEnsenanza", e)}
                >
                  Planificación de la enseñanza
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("planificacionEnsenanza") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>

                {/* Nivel Intermedio - Reflexión */}
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("dedu") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("dedu", e)}
                >
                  DEDU
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("dedu") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("didu") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("didu", e)}
                >
                  DIDU
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("didu") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("concursosInvestigacion") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("concursosInvestigacion", e)}
                >
                  Concursos Investigación
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("concursosInvestigacion") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>

                {/* Nivel Avanzado - Metodologías vinculadas */}
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("aS") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("aS", e)}
                >
                  A+S
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("aS") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("stem") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("stem", e)}
                >
                  STEM
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("stem") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("coil") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("coil", e)}
                >
                  COIL
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("coil") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>

                {/* Nivel Avanzado - Didáctica */}
                <TableHead
                  className={`text-center cursor-pointer border border-gray-300 ${
                    tieneFiltroPorColumna("didactica") ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={(e) => handleClickColumna("didactica", e)}
                >
                  DIDÁCTICA
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                  {tieneFiltroPorColumna("didactica") && <Filter className="h-3 w-3 inline ml-1" />}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docentesFiltrados.length > 0 ? (
                docentesFiltrados.map((docente) => (
                  <TableRow key={docente.id}>
                    <TableCell className="border border-gray-200">{`${docente.nombre} ${docente.apellido}`}</TableCell>
                    <TableCell className="border border-gray-200">{docente.rut}</TableCell>
                    <TableCell className="border border-gray-200">{docente.email}</TableCell>
                    <TableCell className="border border-gray-200">{docente.departamento}</TableCell>
                    <TableCell className="border border-gray-200 text-center">
                      <Link
                        href={`/perfil-docente/${docente.id}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Ver perfil
                      </Link>
                    </TableCell>

                    {/* Nivel Inicial */}
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.modeloEducativo === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.modeloEducativo === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.modeloEducativo}
                      </span>
                    </TableCell>

                    {/* Nivel Intermedio - Ambientes propicios */}
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.perspectivaGenero === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.perspectivaGenero === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.perspectivaGenero}
                      </span>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.neurodiversidadInclusion === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.neurodiversidadInclusion === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.neurodiversidadInclusion}
                      </span>
                    </TableCell>

                    {/* Nivel Intermedio - Enseñanza en aula */}
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.metodologiasActivas === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.metodologiasActivas === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.metodologiasActivas}
                      </span>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.evaluacion === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.evaluacion === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.evaluacion}
                      </span>
                    </TableCell>

                    {/* Nivel Intermedio - Planificación */}
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.planificacionEnsenanza === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.planificacionEnsenanza === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.planificacionEnsenanza}
                      </span>
                    </TableCell>

                    {/* Nivel Intermedio - Reflexión */}
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.dedu === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.dedu === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.dedu}
                      </span>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.didu === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.didu === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.didu}
                      </span>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.concursosInvestigacion === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.concursosInvestigacion === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.concursosInvestigacion}
                      </span>
                    </TableCell>

                    {/* Nivel Avanzado - Metodologías vinculadas */}
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.aS === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.aS === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.aS}
                      </span>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.stem === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.stem === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.stem}
                      </span>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.coil === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.coil === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.coil}
                      </span>
                    </TableCell>

                    {/* Nivel Avanzado - Didáctica */}
                    <TableCell className="border border-gray-200 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          docente.cursos.didactica === "Aprobado"
                            ? "bg-green-100 text-green-800"
                            : docente.cursos.didactica === "No Aprobado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {docente.cursos.didactica}
                      </span>
                    </TableCell>

                    <TableCell className="border border-gray-200 text-center">
                      {(() => {
                        // Verificar nivel Inicial (al menos un curso aprobado en cada categoría)
                        const tieneNivelInicial = docente.cursos.modeloEducativo === "Aprobado"

                        // Verificar nivel Intermedio (al menos un curso aprobado en cada categoría)
                        const tieneAmbientesPropicios =
                          docente.cursos.perspectivaGenero === "Aprobado" ||
                          docente.cursos.neurodiversidadInclusion === "Aprobado"

                        const tieneEnsenanzaAula =
                          docente.cursos.metodologiasActivas === "Aprobado" || docente.cursos.evaluacion === "Aprobado"

                        const tienePlanificacion = docente.cursos.planificacionEnsenanza === "Aprobado"

                        const tieneReflexion =
                          docente.cursos.dedu === "Aprobado" ||
                          docente.cursos.didu === "Aprobado" ||
                          docente.cursos.concursosInvestigacion === "Aprobado"

                        const tieneNivelIntermedio =
                          tieneNivelInicial &&
                          tieneAmbientesPropicios &&
                          tieneEnsenanzaAula &&
                          tienePlanificacion &&
                          tieneReflexion

                        // Verificar nivel Avanzado (al menos un curso aprobado en cada categoría)
                        const tieneMetodologiasVinculadas =
                          docente.cursos.aS === "Aprobado" ||
                          docente.cursos.stem === "Aprobado" ||
                          docente.cursos.coil === "Aprobado"

                        const tieneDidactica = docente.cursos.didactica === "Aprobado"

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

                    <TableCell className="border border-gray-200 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditarDocente(docente)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEliminarDialogo(docente)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={21} className="text-center py-4 border border-gray-200">
                    No se encontraron docentes con los filtros aplicados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {columnaFiltroActiva && (
            <div
              ref={filtroRef}
              className="absolute bg-white border border-gray-300 rounded-md shadow-lg z-50 w-64"
              style={{ top: posicionFiltro.top, left: posicionFiltro.left }}
            >
              <div className="p-3 border-b">
                <h3 className="font-medium">Filtrar {columnaFiltroActiva}</h3>
              </div>
              <div className="p-3 border-b">
                <div className="flex flex-col space-y-2">
                  {columnaFiltroActiva === "nombre" && (
                    <>
                      <button className="flex items-center text-sm hover:bg-gray-100 p-1 rounded">
                        <ArrowUp className="h-4 w-4 mr-2" /> Ordenar A a la Z
                      </button>
                      <button className="flex items-center text-sm hover:bg-gray-100 p-1 rounded">
                        <ArrowDown className="h-4 w-4 mr-2" /> Ordenar Z a la A
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="p-3 border-b">
                <div className="flex items-center mb-2">
                  <Search className="h-4 w-4 mr-2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full text-sm border-none focus:outline-none"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {(() => {
                    // Generar opciones según la columna
                    let opciones: string[] = []

                    switch (columnaFiltroActiva) {
                      case "nombre":
                        opciones = Array.from(new Set(docentes.map((d) => `${d.nombre} ${d.apellido}`)))
                        break
                      case "rut":
                        opciones = Array.from(new Set(docentes.map((d) => d.rut)))
                        break
                      case "email":
                        opciones = Array.from(new Set(docentes.map((d) => d.email)))
                        break
                      case "departamento":
                        opciones = Array.from(new Set(docentes.map((d) => d.departamento)))
                        break
                      case "estado":
                        opciones = ["Activo", "Inactivo"]
                        break
                      case "modeloEducativo":
                      case "perspectivaGenero":
                      case "neurodiversidadInclusion":
                      case "metodologiasActivas":
                      case "evaluacion":
                      case "planificacionEnsenanza":
                      case "dedu":
                      case "didu":
                      case "concursosInvestigacion":
                      case "aS":
                      case "stem":
                      case "coil":
                      case "didactica":
                        opciones = ["Aprobado", "No Aprobado", "No Inscrito"]
                        break
                      case "nivel":
                        opciones = ["Avanzado", "Intermedio", "Inicial", "Sin nivel"]
                        break
                    }

                    return opciones.map((opcion, index) => {
                      const isSelected = filtrosColumna[columnaFiltroActiva]?.includes(opcion)

                      return (
                        <div key={index} className="flex items-center mb-1">
                          <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 p-1 rounded w-full">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={isSelected}
                              onChange={() => {
                                setFiltrosColumna((prev) => {
                                  const prevValues = prev[columnaFiltroActiva] || []
                                  const newValues = isSelected
                                    ? prevValues.filter((v) => v !== opcion)
                                    : [...prevValues, opcion]

                                  return {
                                    ...prev,
                                    [columnaFiltroActiva]: newValues,
                                  }
                                })
                              }}
                            />
                            {isSelected && <Check className="h-4 w-4 mr-1 text-blue-600" />}
                            {opcion}
                          </label>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
              <div className="p-3 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => setColumnaFiltroActiva(null)}>
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    // Aplicar filtro
                    setColumnaFiltroActiva(null)
                  }}
                >
                  Aceptar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Diálogo para crear/editar docente */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{docenteActual ? "Editar Docente" : "Nuevo Docente"}</DialogTitle>
            <DialogDescription>
              {docenteActual
                ? "Modifica los datos del docente seleccionado."
                : "Completa el formulario para agregar un nuevo docente."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleFormChange} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleFormChange} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="rut">RUT</Label>
              <Input id="rut" name="rut" value={formData.rut} onChange={handleFormChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleFormChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Input
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="especialidad">Especialidad</Label>
                <Input
                  id="especialidad"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Select
                value={formData.estado}
                onValueChange={(value) => setFormData({ ...formData, estado: value as "Activo" | "Inactivo" })}
              >
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sección de cursos */}
            <div className="mt-4">
              <h3 className="font-semibold mb-4">Estado de cursos</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Nivel Inicial */}
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium mb-2">Nivel Inicial</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cursos.modeloEducativo">Modelo Educativo</Label>
                      <Select
                        value={formData.cursos.modeloEducativo}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              modeloEducativo: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.modeloEducativo">
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
                </div>

                {/* Nivel Intermedio */}
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium mb-2">Nivel Intermedio - Ambientes propicios</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cursos.perspectivaGenero">Perspectiva de género</Label>
                      <Select
                        value={formData.cursos.perspectivaGenero}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              perspectivaGenero: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.perspectivaGenero">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aprobado">Aprobado</SelectItem>
                          <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                          <SelectItem value="No Inscrito">No Inscrito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cursos.neurodiversidadInclusion">Neurodiversidad e Inclusión</Label>
                      <Select
                        value={formData.cursos.neurodiversidadInclusion}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              neurodiversidadInclusion: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.neurodiversidadInclusion">
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
                </div>

                <div className="border p-4 rounded-md">
                  <h4 className="font-medium mb-2">Nivel Intermedio - Enseñanza en aula</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cursos.metodologiasActivas">Metodologías Activas</Label>
                      <Select
                        value={formData.cursos.metodologiasActivas}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              metodologiasActivas: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.metodologiasActivas">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aprobado">Aprobado</SelectItem>
                          <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                          <SelectItem value="No Inscrito">No Inscrito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cursos.evaluacion">Evaluación</Label>
                      <Select
                        value={formData.cursos.evaluacion}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              evaluacion: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.evaluacion">
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
                </div>

                <div className="border p-4 rounded-md">
                  <h4 className="font-medium mb-2">Nivel Intermedio - Planificación</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cursos.planificacionEnsenanza">Planificación de la enseñanza</Label>
                      <Select
                        value={formData.cursos.planificacionEnsenanza}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              planificacionEnsenanza: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.planificacionEnsenanza">
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
                </div>

                <div className="border p-4 rounded-md">
                  <h4 className="font-medium mb-2">Nivel Intermedio - Reflexión</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cursos.dedu">DEDU</Label>
                      <Select
                        value={formData.cursos.dedu}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              dedu: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.dedu">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aprobado">Aprobado</SelectItem>
                          <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                          <SelectItem value="No Inscrito">No Inscrito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cursos.didu">DIDU</Label>
                      <Select
                        value={formData.cursos.didu}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              didu: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.didu">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aprobado">Aprobado</SelectItem>
                          <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                          <SelectItem value="No Inscrito">No Inscrito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cursos.concursosInvestigacion">Concursos Investigación</Label>
                      <Select
                        value={formData.cursos.concursosInvestigacion}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              concursosInvestigacion: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.concursosInvestigacion">
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
                </div>

                {/* Nivel Avanzado */}
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium mb-2">Nivel Avanzado - Metodologías vinculadas</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cursos.aS">A+S</Label>
                      <Select
                        value={formData.cursos.aS}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              aS: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.aS">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aprobado">Aprobado</SelectItem>
                          <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                          <SelectItem value="No Inscrito">No Inscrito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cursos.stem">STEM</Label>
                      <Select
                        value={formData.cursos.stem}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              stem: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.stem">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aprobado">Aprobado</SelectItem>
                          <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                          <SelectItem value="No Inscrito">No Inscrito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cursos.coil">COIL</Label>
                      <Select
                        value={formData.cursos.coil}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              coil: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.coil">
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
                </div>

                <div className="border p-4 rounded-md">
                  <h4 className="font-medium mb-2">Nivel Avanzado - Didáctica</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cursos.didactica">DIDÁCTICA</Label>
                      <Select
                        value={formData.cursos.didactica}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            cursos: {
                              ...formData.cursos,
                              didactica: value as "Aprobado" | "No Aprobado" | "No Inscrito",
                            },
                          })
                        }
                      >
                        <SelectTrigger id="cursos.didactica">
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
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGuardarCurso}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar al docente{" "}
              {docenteActual ? `${docenteActual.nombre} ${docenteActual.apellido}` : ""}? Esta acción no se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleEliminarDocente}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
