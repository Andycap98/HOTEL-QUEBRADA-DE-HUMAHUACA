import {useParams,Link} from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import { useReservas } from '../context/ReservasContext'
import Navbar from '../components/Navbar'
//vamos a crear la funcion que devuelva comprobantes

export default function Comprobante(){
    const {codigo}= useParams()
    const {usuarioActual}=useAuth()
    const {getReserva,getHabitacion,costosPorTipo}=useReservas()
    const reserva=getReserva(codigo)
    const habitacion=reserva ? getHabitacion(reserva.codigoHabitacion) :null
    if (!reserva || !habitacion){
        return(
            <div className='min-h-screan bg-slate-100'>
                <Navbar/>
                <div className='max-w-xl mx-auto py-16 text-center'>
                    <p className='text-slate-500'>
                        Comprobante No Encontrado! 
                    </p>

                    <Link to="/Dashboard" className='mt-4 text-amber-600 hover:underline inlinelook'>
                    
                    IR AL INICIO
                    </Link>

                </div>

            </div>
        )
    } 
    return (
        <div className='min-h-screan bg-slate-100'>
            <Navbar/>
            <main className='max-w-2x1 mx-auto px-4 py-8'>
                <div className='bg-green-50 border border-green-200 text-green-700 rouded-xl px-6 py-4 mb-6 flex items-center gap-3 '>
                    <span className='text-2xl '>
                        ✅
                    </span>

                    <div>
                        <p className='font-semibold '>
                            RESERVA CONFIRMADA EXITOSAMENTE! 
                        </p>
                        <p className='text-sm opacity-80'>
                             no te olvides de Guardar Este comprobante para tus REGISTROS! 
                        </p>
                    </div>
                    
                </div>
               
               {/* comprobante  */}
                <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                    {/* header (parte de arriba) */}

                    <div className='bg-slate-900 px-8 py-6 flex justify-between items-start'>
                        <div>
                            <p className='text-amber-400 text-2xl font-bold'> 
                                🏨 HOTEL QUEBRADA DE HUMAHUACA
                            </p>

                            <p className='text-slate-400 text-sm mt-1'>
                                comprobante de reserva 
                            </p>

                        </div>

                        <div className='text-right '>
                            <p className='text-white font-mono text-lg font-bold'>
                                {reserva.codigo}
                            </p>

                            <p className='text-slate-400 text-sm'>
                                {reserva.fecha}
                            </p>
                        </div>

                    </div>
                    {/* cuerpo del comprobante (escrito dentro) */}
                    <div className='p-8'>
                        {/* pasajero */}
                        <section className='mb-6'>
                               <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-3'>
                                   Datos del Pasajero
                               </h2>
                               {/*datos del pasajero */}
                               <div className='grid grid-cols-2 gap-4 text-sm'>
                                       {[
                                        ['Nombre y Apellido', '${usuarioActual.nombre} ${usuarioActual.apellido}'],
                                        ['DNI', reserva.usuarioDni],
                                        ['Nacionalidad', usuarioActual.Nacionalidad],
                                        ['Tipo de Cuenta', usuarioActual.Tipo],
                                       ] .map(([label,vol])=>(
                                        <div key={label} className='bg-slate-50 rounded-lg p-3'>
                                        <p  className='text-slate-400 text-xs'>
                                            {label}
                                        </p> 
                                            <p className='text-slate-800 font-semibold capitalize mt-0.5'>
                                                {vol}
                                            </p> 
                                        </div>
                                       ))}
                               </div>
                        </section>

                        <hr className='border-slate-100 my-6' />
                        {/* habitacion */}

                        <section className='mb-6'>
                            <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-3'>
                                Habitacion
                            </h2>
                            <div className='grid grid-cols-2 gap-4 text-sm'>
                                {[
                                    ['Codigo',habitacion.codigo],
                                    ['Tipo',habitacion.tipo],
                                    ['Descripción',habitacion.descripcion],
                                 {/* en join vamos a recibir un array tipo objeto que nos devolvera clave/valor */}
                                    ['Servicios',habitacion.servicios.join(', ')],





                                ].map(([label,vol])=>(
                                    <div key={label} className={`bg-slate-50 rounded-lg p-3 ${label === 'Descripción' || label === 'Servicios' ? 'col-span-2' : ''}`}>
                                        <p  className='text-slate-400 text-xs'>
                                            {label}
                                        </p> 
                                            <p className='text-slate-800 font-semibold capitalize mt-0.5'>
                                                {vol}
                                            </p> 
                                    </div>
                                ))}
                            </div>
                        </section>
                        <hr className='border-slate-100 my-6' />

                        {/*costos */}

                        <section>
                            <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-3'>
                                Resumen de Costos:
                            </h2>

                            <div className='space-y-2 text-sm'>
                                <div className='flex justify-between'>
                                    <span className='text-slate-500'>
                                       Costos por Noche: 
                                    </span>
                                    <span className='text-slate-700'>
                                        ${costosPorTipo[habitacion.tipo]}
                                    </span>
                                </div>

                                <div>
                                     <div className='flex justify-between'>
                                    <span className='text-slate-500'>
                                       Cantidad de Noches
                                    </span>
                                    <span className='text-slate-700'>
                                        ${reserva.cantidadDias}
                                    </span>
                                </div>
                                <div className='border-t border-slate-200 pt-3 flex justify-between items-center mt-3'>
                                    <span className='font-bold text-slate-800'>
                                       Total - ${costosPorTipo[habitacion.tipo]} x {reserva.cantidadDias} Noches
                                    </span>
                                    <span className='text-2xl font-bold text-amber-500'>
                                        ${reserva.costoTotal}
                                    </span>
                                </div>

                                </div>
                            </div>
                        </section>
                    </div>
                    {/*footer */}

                    <div className='bg-slate-50 px-8 py-4 text-center text-slate-400 text-xs border-t'>
                        Comprobante Emitido el {reserva.fecha} . HOTEL QUEBRADA DE HUMAHUACA 
                    </div>
                    {/* ACCIONES  */}

                    <div className='flex gap-3 mt-6'>
                        <Link to="/Dashboard" className="flex-1 text-center border border-slate-300 text-slate-700 font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                        ir al Dashboard 
                        </Link>
                        <Link to="/habitaciones" className='flex-1 text-center bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 rounded-xl transition-colors'>
                         Reserva 
                        </Link>
                    </div>
                 
                </div>
                
            </main> 
        </div>
    )

}