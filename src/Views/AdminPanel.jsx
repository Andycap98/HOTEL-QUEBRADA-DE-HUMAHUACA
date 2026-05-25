//empezamos con las importaciones

import { useState } from 'react'
import { useReservas } from '../context/ReservasContext'
import NavBar from '..components/NavBar'

const ESTADO_BADGE = {
    disponible : 'bg-green-100 text-green-700',
    ocupado: 'bg-red-100 text-red-700',
    
}
export default function AdminPanel (){
   const {
    habitaciones,
    cambiarEstadoHabitacion,
    reservas,
    costosPorTipo
   }=useReservas()
   const [filtro,setFiltro]=useState ('todos')
   // estado para guardar una notificacion temporal

   const [notif,setNotif]= useState (null)

   //vamos a filtrar las habitaciones dependiendo del filtro seleccionado

   const habitacionesFiltradas= 
   filtro === 'todos'
     ? habitaciones 
     : habitaciones.filter ((h)=> h.estado === filtro) 
   const mostrarNotif= (msg)=> {
    setNotif (msg)
    //vamos a eliminar la notif cada 2,5 segundos

    setTimeout(()=>setNotif(null),2500)
   } 

   //vamos a crear la funcion para cambiar el estado de la habitacion

   const toggleEstado = (hab)=> {
    const nuevo =
    hab.estado==='disponible'
    ? 'ocupado'
    : 'disponible'
    cambiarEstadoHabitacion(hab.codigo, nuevo)
    mostrarNotif('${hab.codigo} marcada como ${nuevo}.')

   } 
   //vamos a trabajr con la interfaz visual y retornar la interfaz visual
   return ( 
    <div className="min-h-screem bg-slate-100"> 
         {/* barra de navegacion */}
         < NavBar/> 
         {notif && (
          <div className="fixed top-20 right-6 bg-slate-800 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50 transition-all">
            {notif}
          </div>
         )}
         <main className="max-w-5xl mx-auto px-4 py-4">
          <div className="mb-6"> 

            {/* vamos a crear el titulo principal del panel */}
            <h1 className="text-2x1 font-bold text-slate-800">
              Panel De Administracion 
            </h1>
            <p className="text-slate-500 mt-1">
              Gestion de la disponibilidad de las habitaciones
            </p>
          </div>
          {/*vamos a crear botones de filtro */}

          <div className="flex gap-2 mb-6">
            {/* vamos a crear una la lista de los filtros */}
  {['todos', 'disponible', 'ocupado'].map((f) => (  

            <button
              key={f}

              // Cuando hacemos click cambiamos el filtro
              onClick={() => setFiltro(f)}

              // Clases dinámicas según si está seleccionado
              className={`
                px-4
                py-1.5
                rounded-full
                text-sm
                font-medium
                capitalize
                transition-colors

                ${
                  filtro === f
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300'
                }
              `}
                      >
              {f==='todos' ? 'Todas':f}
              </button>

            ))}



          </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">

          <table className="w-full text-sm">

            {/* CABECERA */}
            <thead className="bg-slate-50 border-b border-slate-200">

              <tr className="text-left text-slate-500">

                <th className="px-6 py-3 font-medium">Código</th>
                <th className="px-6 py-3 font-medium">Tipo</th>
                <th className="px-6 py-3 font-medium">Descripción</th>
                <th className="px-6 py-3 font-medium">Costo/noche</th>
                <th className="px-6 py-3 font-medium">Servicios</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3 font-medium">Acción</th>

              </tr>
            </thead>

            {/* CUERPO DE LA TABLA */}
            <tbody>

              {/* Recorremos habitaciones filtradas */}
              {habitacionesFiltradas.map((hab) => (

                <tr
                  key={hab.codigo}
                  className="
                    border-b
                    last:border-0
                    hover:bg-slate-50
                  "
                >

                  {/* Código habitación */}
                  <td className="px-6 py-4 font-mono font-bold text-slate-700">
                    {hab.codigo}
                  </td>

                  {/* Tipo habitación */}
                  <td className="px-6 py-4 capitalize">
                    {hab.tipo}
                  </td>

                  {/* Descripción */}
                  <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                    {hab.descripcion}
                  </td>

                  {/* Precio */}
                  <td className="px-6 py-4 font-semibold">
                    ${costosPorTipo[hab.tipo]}
                  </td>

                  {/* Servicios */}
                  <td className="px-6 py-4">

                    <div className="flex flex-wrap gap-1">

                      {/* Mostramos solo los primeros 3 servicios */}
                      {hab.servicios.slice(0, 3).map((s) => (

                        <span
                          key={s}
                          className="
                            text-xs
                            bg-slate-100
                            px-1.5
                            py-0.5
                            rounded
                            text-slate-600
                          "
                        >
                          {s}
                        </span>
                      ))}

                      {/* Si tiene más de 3 servicios */}
                      {hab.servicios.length > 3 && (

                        <span className="text-xs text-slate-400">

                          {/* Mostramos cuántos faltan */}
                          +{hab.servicios.length - 3}

                        </span>
                      )}
                    </div>
                  </td>

                  {/* Estado habitación */}
                  <td className="px-6 py-4">

                    <span
                      className={`
                        text-xs
                        font-semibold
                        px-2.5
                        py-1
                        rounded-full
                        capitalize
                        ${ESTADO_BADGE[hab.estado]}
                      `}
                    >

                      {/* Texto del estado */}
                      {hab.estado}

                    </span>
                  </td>

                  {/* Botón acción */}
                  <td className="px-6 py-4">

                    <button

                      // Cambiar estado al hacer click
                      onClick={() => toggleEstado(hab)}

                      // Estilos dinámicos
                      className={`
                        text-xs
                        font-medium
                        px-3
                        py-1.5
                        rounded-lg
                        border
                        transition-colors

                        ${
                          hab.estado === 'disponible'
                            ? 'border-red-200 text-red-600 hover:bg-red-50'
                            : 'border-green-200 text-green-600 hover:bg-green-50'
                        }
                      `}
                    >

                      {/* Texto dinámico */}
                      {hab.estado === 'disponible'
                        ? 'Marcar ocupada'
                        : 'Liberar'}

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ========================= */}
        {/* HISTORIAL DE RESERVAS */}
        {/* ========================= */}

        <div className="bg-white rounded-xl shadow-sm p-6">

          {/* Título */}
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Historial de reservas
          </h2>

          {/* Si no hay reservas */}
          {reservas.length === 0 ? (

            <p className="text-slate-400 text-sm">
              No hay reservas en el sistema.
            </p>

          ) : (

            // Si hay reservas mostramos tabla
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                {/* CABECERA */}
                <thead>

                  <tr className="text-left text-slate-500 border-b">

                    {/* Generamos encabezados automáticamente */}
                    {[
                      'Código reserva',
                      'DNI pasajero',
                      'Habitación',
                      'Fecha',
                      'Días',
                      'Costo total'
                    ].map((h) => (

                      <th
                        key={h}
                        className="pb-2 font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* CUERPO */}
                <tbody>

                  {/* Recorremos reservas */}
                  {reservas.map((r) => (

                    <tr
                      key={r.codigo}
                      className="
                        border-b
                        last:border-0
                        hover:bg-slate-50
                      "
                    >

                      {/* Código reserva */}
                      <td className="py-3 font-mono text-xs text-amber-600">
                        {r.codigo}
                      </td>

                      {/* DNI */}
                      <td className="py-3">
                        {r.usuarioDni}
                      </td>

                      {/* Habitación */}
                      <td className="py-3 font-medium">
                        {r.codigoHabitacion}
                      </td>

                      {/* Fecha */}
                      <td className="py-3 text-slate-500">
                        {r.fecha}
                      </td>

                      {/* Cantidad de días */}
                      <td className="py-3">
                        {r.cantidadDias}
                      </td>

                      {/* Costo total */}
                      <td className="py-3 font-bold">
                        ${r.costoTotal}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </main>
    </div>

   )

}
