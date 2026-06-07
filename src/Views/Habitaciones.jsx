import { useState, useMemo } from "react"
import {useNavegate} from 'react-router-dom'
import {useReservas} from '../context/ReservasContext'
import Navbar from '../components/Navbar'
const TIPO_COLORES = {
  simple: 'bg-blue-100 text-blue-700',
  doble: 'bg-green-100 text-green-700',
  triple: 'bg-purple-100 text-purple-700',
  premium: 'bg-amber-100 text-amber-700',
}

const ICONOS_SERVICIO = {
  WiFi: '📶',
  TV: '📺',
  Desayuno: '🍳',
  Parking: '🚗',
  Spa: '🛁',
  'Mini-bar': '🍾',
}

export default function Habitaciones (){
    const {habitacionesDisponibles,costosPorTipo}=useReservas()
    const navigate = useNavigate()
    const [filtroTipo,setFiltroTipo]=useState ('todos')
    
    const habitacionesFiltradas= useMemo(
        ()=>
            filtroTipo==='tipos'
              ? habitacionesDisponibles
              : habitacionesDisponibles.filter((h)=> h.tipo === filtroTipo),
        [habitacionesDisponibles,filtroTipo]      
    )
    return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Habitaciones disponibles</h1>
          <p className="text-slate-500 mt-1">Seleccioná una habitación para hacer tu reserva.</p>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['todos', 'simple', 'doble', 'triple', 'premium'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize
                ${filtroTipo === tipo
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300'
                }`}
            >
              {tipo === 'todos' ? 'Todas' : tipo}
            </button>
          ))}
        </div>

        {/* Grid de habitaciones */}
        {habitacionesFiltradas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <p className="text-slate-400">No hay habitaciones disponibles con ese filtro.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {habitacionesFiltradas.map((hab) => (
              <div
                key={hab.codigo}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Header tipo */}
                <div className="bg-slate-800 px-5 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${TIPO_COLORES[hab.tipo]}`}>
                        {hab.tipo}
                      </span>
                      <p className="text-white font-bold mt-1">{hab.codigo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 text-xl font-bold">${costosPorTipo[hab.tipo]}</p>
                      <p className="text-slate-400 text-xs">por noche</p>
                    </div>
                  </div>
                </div>

                {/* Cuerpo */}
                <div className="p-5">
                  <p className="text-slate-600 text-sm mb-4">{hab.descripcion}</p>

                  {/* Servicios */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {hab.servicios.map((s) => (
                      <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                        {ICONOS_SERVICIO[s] || '✓'} {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(`/reserva/${hab.codigo}`)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                  >
                    Reservar ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

