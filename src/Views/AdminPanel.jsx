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
   
   

}
