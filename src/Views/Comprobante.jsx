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

                            <P className='text-slate-400 text-sm mt-1'>
                                comprobante de reserva 
                            </P>
                        </div>

                    </div>
                 
                </div>
                
            </main> 
        </div>
    )

}