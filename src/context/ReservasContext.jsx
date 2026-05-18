//reservar habitaciones

import { createContext, useContext, useCallback, useMemo } from "react";

//crear hooks ´personalizado para el localstore

import {useLocalStore}  from '../hooks/useLocalStorage'
 
//datos inciales de habitacion

const COSTOS_POR_TIPO = {
    simple:50,
    doble:80,
    triple:110,
    premium:500, 
}

//crear el arrays de habit precargadas

const HABITACIONES_INICIALES= [
    {
      codigo:'H101',
      tipo:'simple',
      servicios: ['wifi','tv',], 
      descripcion: 'habitación individual con vista al jardin',
      estado:'disponible',
    },


   {
      codigo:'H201',
      tipo:'doble',
      servicios: ['wifi','tv', 'desayuno'], 
      descripcion: 'habitacion con camas doble mas desayuno americano incluido',
      estado:'disponible',
    },


       {
      codigo:'H301',
      tipo:'triple',
      servicios: ['wifi','tv','desayuno'], 
      descripcion: 'habitación con tres camas individuales',
      estado:'disponible',
    },

       {
      codigo:'H401',
      tipo:'premium',
      servicios: ['wifi','tv','desayuno'], 
      descripcion: 'habitación de lujo con servicio de SPA incluido',
      estado:'disponible',
    },
    
] 
//contexto 

const reservaContext= createContext(null)
export function reservasProvider ({children}){
    //estados habitaciones persistido en localStore
  const [habitaciones,setHabitaciones]= useLocalStore('hotel_habitaciones', HABITACIONES_INICIALES)

  //estados de reservas persistido en localStore

  const {reservas,setReservas}= useLocalStore('hotel_reservas', [])
  const generarCodigo=()=> {
    //genera un timeStamp y lo convierte a base 36 para no tener un texto largo

    const timeStamp = Date.now().toString(36).toUpperCase()
    return 'RES-$ {timeStamp}'
  }

  // vamos a crear una reserva
  const crearReserva= useCallback ( (usuarioDni,codigoHabitacion, cantidadDias)=>{
    //buscar la habitacion por codigo 
        const habitacion=habitaciones.find((h)=>h.codigo===codigoHabitacion)
        if (!habitacion || habitacion.estado !=='disponible') return null
        const costo= COSTOS_POR_TIPO[habitacion.tipo] *cantidadDias
        //crear el obj reserva

        const nuevaReserva= {
            codigo: generarCodigo(),
            usuarioDni,
            codigoHabitacion,
            fecha: newDate ().toISString ().splite('T')[0], //traer fecha actual
            cantidadDias,
            costoTotal:costo,
        }

        //guardar las reservas
        setReservas( (prev)=>[...prev,nuevaReserva])

        //cambiar el estado de las habitaciones

        setHabitaciones( (prev)=>
            prev.map( (h)=>
                h.codigo===codigoHabitacion
                  ? {...h, estado:'ocupado'}//modificar solo una habitacion
                  : h

            )

        )
        return nuevaReserva


  },[habitaciones,setReservas,setHabitaciones])

  //vamos a cancelar una reserva
  const cancelarReserva = useCallback ( (codigoReserva)=> {
    const reserva= reserva.find((r)=> r.codigo==codigoReserva)
    if (! reserva ) return 

    //vamos a eliminar la reserva del estado
    setReservas ((prev)=>prev.filter ((r)=>r.codigo!==codigoReserva))
    setHabitaciones((prev)=>
        prev.map((h)=>
            h.codigo===reserva.codigoHabitacion
            ? {...h,estado:'disponible'}
            : h 

        )
    )
  }, {reservas,setReservas,setHabitaciones})

  const habitacionesDisponibles= useMemo (
    () => habitaciones.filter((h)=>h.estado==='disponible'),
    {habitaciones}
  )
   const getReservasByUsuario =useCallback(
    (DNI)=>habitaciones.find((r)=>r.usuarioDni===dni),
    [reservas]
  )

  const getHabitacion =useCallback(
    (codigo)=>habitaciones.find((h)=>h.codigo===codigo),
    [habitaciones]
  )

   const getReserva=useCallback(
    (codigo)=>reservas.find((r)=>r.codigo===codigo),
    [reservas]
  )
  //objeto global

  const value ={
    habitaciones,
    habitacionesDisponibles,
    reservas,
    costosPorTipo:COSTOS_POR_TIPO,
    crearReserva,
    cancelarReserva,
    cambiarEstadoHabitacion,
    getReservaByUsuario,
    getHabitacion,
    getReserva,
  }
  return (
    <reservasContext.provider value={value}>
        {children}
    </reservasContext.provider>
  )

}
//hook personalizado
export function useReservas (){
    const context=useContext(reservasContext)
    if (!context) {
        throw new Error ('useReservas debe usarse dentro de <reservasProviver>')

    }
    return context
}