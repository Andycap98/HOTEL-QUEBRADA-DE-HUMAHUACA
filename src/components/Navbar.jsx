import {Link, useNavigate} from 'react-router-dom'// permite recorrer la pagina sin actualizar la pagina
import { useAuth} from '../context//AuthContext'// hook personbalizado que nos permite accder a datos del usuario y frunciones relacionadas
// vamos a def y exportar el conponente navbar para def nuestra barra de navegacion
export default function Navbar(){
    const {usuarioActual, esPasajero, esAdmin, logut }= useAuth()
    const navegate = useNavigate()
    // vamos a crear una funcion q se ejecuta cuando el usuario hace clic en el boton cerrar sesion
    const handleLogout= () => {//funcion landa
        logut()//funcion para cerrar sesion y autom me lleva al login
        navegate('/login')
    }
    // retornar el componente para renderizar las patallas
     return (
        <nav className='bg-snate-900 text-white px-6 py-4 flex items-center justify-between shadow-lg'>
            <Link to="/dashboard" className= "text-xl font-bold traking-wide text-ambar-400" >
            
            HOTEL QUEBRADA DE HUMAHUACA</Link>
            <div clasname="flex items-center gap-6 text-sm">
                <Link to="/dashboard" className= "hover:text-ambar-400 transition-colors">
                inicio
                </Link>
                {esPasajero &&(
                    <Link to="/habitaciones" className="hover:text-ambar-400 transition-colors">
                        habitaciones
                    </Link>
                )}
                {esAdmin &&(
                     <Link to="/admin" className="hover:text-ambar-400 transition-colors">
                        Administración
                    </Link>
                )}
                <div clasName="flex items-center gap-3 border-l border-slate-700 pm-6">
                    <span className="text-slate-300">
                           {usuarioActual?.nombre} {usuarioActual?.apellido}
                           <span className="ml-2 text-xs bg-ambar-500 text-slate-900 px-2 py-0.5 rounded-full font-semibold uppercase">
                            {usuarioActual?.tipo} //traigo para saber si es adm o pasajero
                           </span>
                    </span>
                    //crear el boton cierre de sesion
                    
                    <button 
                    onClick={handleLogout}
                    className="bg-slate-700 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-color text-xs font-mediun"
                    > Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
     )
}

