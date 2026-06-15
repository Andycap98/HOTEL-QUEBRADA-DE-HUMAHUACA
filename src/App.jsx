import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import{ReservasProvider} from '../context/ReservasContext'

import ProtectedRoute from '../components/protectedrouter'
import Login from '../Views/Login'
import Registro from '../Views/Registro'
import Dashboard from '../Views/Dashboard'
import Habitaciones from '../Views/Habitaciones'
import ReservaConfirmacion from '../Views/ReservasConfirmacion'
import AdminPanel from '../Views/AdminPanel'
import Comprobante from '../Views/Comprobante'

export default function App(){
    return (
      <BrowserRouter>
      
           <AuthProvider>
                <ReservasProvider>
                      <Routes>
                         {/* rutas publicas  */}
                         <Route path ="/login" element={<Login/>} />
                         <Route path="/registro" element={<Registro/>}/>

                         {/* rutas protegidas-solo USUARIOS AUTENTICADOS */}
                         <Route element={<ProtectedRoute/>}>
                            <Route path="/dashboard" element={<Dashboard/>} />
                            <Route path="/comprobante/:codigo" element={<Comprobante/>}/>
                         </Route>
                         {/*rutas protegidas solo para pasajeros */}
                         <Route element={<ProtectedRoute soloRol={"pasajero"}/>}>
                              <Route path="habitaciones" element={<Habitaciones/>}/>
                              <Route path="/reserva/:codigo" element={<ReservaConfirmacion/>}/>
                         </Route>
                          {/* rutas protegidas solo administradores */}
                           <Route element={<ProtectedRoute soloRol={"administrador"}/>}>
                                <Route path= "/admin" element={<AdminPanel/>} />
                           </Route>
                           {/* redireccion por defecto */}
                             <Route path="/" element={<Navigate to="/dashboard" replace />}/>
                             <Route path="*" element={<Navigate to="/dashboard" replace />}/>
                      </Routes>

                </ReservasProvider>
           </AuthProvider>
      </BrowserRouter>
    )
}
