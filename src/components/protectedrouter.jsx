//sirve para proteger mis rutas de acceso al sistema por ej protege los roles del pasajero o adm

import {Navegate,Outlet} from 'react-router-dom'
import {useAuth} from '../context/Authcontext'
export default function ProtectedRoute({soloRol}){
    const{estaAutenticado,usuarioActual}=useAuth()
    //verifica si el usuario no esta autenticado  //tiene q estar autenticado para ingresar
    if (!autenticado) {  
        return <Navegate to="/login" replace/>
      }   
    if (soloRol && usuarioActual?.tipo!== soloRol) {
        return <Navegate to="/dashboard" replace/>
    }  
    return <Outlet/>                  
}

