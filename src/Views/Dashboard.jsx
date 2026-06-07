import {useMemo} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../context/Authcontext'
import {useReservas} from '../context/ReservasContext'
import Navbar from  '../components/Navbar'

//vamos a traer la reserva que carga un usuario o pasajero
export default function Dashboard (){
    const {usuarioActual,esPasajero,esAdmin}= useAuth()
    const {habitaciones,reservas,getReservasByUsuario,getHabitacion, cancelarReserva}=useReservas()
    //RESERVAS DEL PASAJERO ACTUAL

    const misReservas=useMemo(
        () => (esPasajero ? getReservasByUsuario (usuarioActual?.dni):[]),
        {esPasajero,getReservasByUsuario,usuarioActual}
    )
    // los stats para admin

    const stats = useMemo(
        ()=> ({
            totalHabitaciones: habitaciones.length,
            disponibles: habitaciones.filter ((h)=> h.estado==='disponible').length,
            ocupadas: habitaciones.filter ((h)=> h.estado==='ocupadas').length,
            totalReservas: reservas.length,
        }),[habitaciones,reservas]
    )
    return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Bienvenido/a, {usuarioActual?.nombre} {usuarioActual?.apellido} 👋
          </h1>
          <p className="text-slate-500 mt-1">
            {esPasajero ? 'Gestioná tus reservas desde aquí.' : 'Panel de administración del hotel.'}
          </p>
        </div>

        {/* VISTA ADMINISTRADOR */}
        {esAdmin && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total habitaciones', value: stats.totalHabitaciones, color: 'bg-slate-700' },
                { label: 'Disponibles', value: stats.disponibles, color: 'bg-green-600' },
                { label: 'Ocupadas', value: stats.ocupadas, color: 'bg-red-500' },
                { label: 'Reservas activas', value: stats.totalReservas, color: 'bg-amber-500' },
              ].map((s) => (
                <div key={s.label} className={`${s.color} text-white rounded-xl p-5`}>
                  <p className="text-sm opacity-80">{s.label}</p>
                  <p className="text-3xl font-bold mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Todas las reservas</h2>
              {reservas.length === 0 ? (
                <p className="text-slate-400 text-sm">No hay reservas registradas.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500 border-b">
                        <th className="pb-2 font-medium">Código</th>
                        <th className="pb-2 font-medium">DNI Pasajero</th>
                        <th className="pb-2 font-medium">Habitación</th>
                        <th className="pb-2 font-medium">Fecha</th>
                        <th className="pb-2 font-medium">Días</th>
                        <th className="pb-2 font-medium">Costo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservas.map((r) => (
                        <tr key={r.codigo} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="py-3 font-mono text-xs text-amber-600">{r.codigo}</td>
                          <td className="py-3">{r.usuarioDni}</td>
                          <td className="py-3">{r.codigoHabitacion}</td>
                          <td className="py-3">{r.fecha}</td>
                          <td className="py-3">{r.cantidadDias}</td>
                          <td className="py-3 font-semibold">${r.costoTotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <Link
                to="/admin"
                className="inline-block mt-4 text-sm text-amber-600 hover:underline font-medium"
              >
                Ir al panel de administración →
              </Link>
            </div>
          </>
        )}

        {/* VISTA PASAJERO */}
        {esPasajero && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-amber-500 text-white rounded-xl p-5">
                <p className="text-sm opacity-80">Mis reservas</p>
                <p className="text-3xl font-bold mt-1">{misReservas.length}</p>
              </div>
              <div className="bg-slate-700 text-white rounded-xl p-5">
                <p className="text-sm opacity-80">Total gastado</p>
                <p className="text-3xl font-bold mt-1">
                  ${misReservas.reduce((acc, r) => acc + r.costoTotal, 0)}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Mis reservas</h2>
              <Link
                to="/habitaciones"
                className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                + Nueva reserva
              </Link>
            </div>

            {misReservas.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <div className="text-4xl mb-3">🛏️</div>
                <p className="text-slate-500">Todavía no tenés reservas.</p>
                <Link to="/habitaciones" className="text-amber-600 font-medium hover:underline text-sm mt-2 inline-block">
                  Explorar habitaciones disponibles
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {misReservas.map((r) => {
                  const hab = getHabitacion(r.codigoHabitacion)
                  return (
                    <div key={r.codigo} className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                          {r.codigo}
                        </span>
                        <p className="text-slate-800 font-semibold mt-1">
                          {hab?.tipo.charAt(0).toUpperCase() + hab?.tipo.slice(1)} — {r.codigoHabitacion}
                        </p>
                        <p className="text-slate-500 text-sm">
                          {r.fecha} · {r.cantidadDias} días
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="text-lg font-bold text-slate-800">${r.costoTotal}</span>
                        <div className="flex gap-2">
                          <Link
                            to={`/comprobante/${r.codigo}`}
                            className="text-xs text-amber-600 border border-amber-300 px-3 py-1 rounded-lg hover:bg-amber-50 transition-colors"
                          >
                            Ver comprobante
                          </Link>
                          <button
                            onClick={() => cancelarReserva(r.codigo)}
                            className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

