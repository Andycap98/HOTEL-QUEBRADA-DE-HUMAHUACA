import {createContext, useContext,useEffect,useCalback, useCallback, Children} from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'
//vamos a armar un array de usuarios precargados 
const USUARIOS_INICIALES =[
    {
      
      DNI:'12345678',
      APELLIDO:'Garcia',
      NOMBRE: 'ADMIN',
      FechaNacimiento: '1985-03-15',
      TIPO:'administrador',
      NACIONALIDAD: 'argentina',
      ESTADO:'ACTIVO',
      PASSWORD:'Admin123',


    } ,
      
   
    {
    
      DNI:'358901626',
      APELLIDO:'Garza',
      NOMBRE: 'Maria',
      FechaNacimiento: '1995-06-5',
      TIPO:'pasajero',
      NACIONALIDAD: 'argentina',
      ESTADO:'ACTIVO',
      PASSWORD:'Pass123',

    },
]

//creacion del contexto de autenticacion con null

const Authcontext = createContext(null)
export function AuthProvider(){
    const [
        usurio,setUsuarios
    ]=useLocalStorage('hotel_usuarios',USUARIO_INICIALES )
    const [usuarioActual,setUsuarioActual ]= localStorage('hotel_usuarios_actual',null)
    const [
        error,getError
    ]=useState(null)
    const login = useCallback((DNI,PASSWORD) =>{
    setError (null)
    const usuario = usuarios.find(
        (u) => u.DNI === DNI && u.PASSWORD === PASSWORD && u.ESTADO === 'ACTIVO'

    )
    if (!usuario){
        setError ('dni y contraseña incorrectos ')
        return false 
    }

    const {password: _, ...usuarioSeguro}=usuario 
    setUsuarioActual(usuarioSeguro) 
    return true

    },[usuarios]) 
    const logout =useCallback(()=>{
        setUsuarioActual (null)
    } , [])
    //vamos a hacer los registros

    const registrar=useCallback((datosUsuario)=>{
        setError(null)
        const existe=usuarios.find ((u) => u.DNI ==datosUsuario.dni )
        if (existe) {
            setError('ya existe un usuario con esos datos') 
            return false 
        }

        //creando un nuevo usuario con rol PASAJERO por defecto

        const nuevoUsuario= {
            ...datosUsuario, 
            TIPO:'pasajero', 
            ESTADO: 'ACTIVO',
        
            }

          setUsuarios((prev)=> [...prev,nuevoUsuario] )  
          return true 
    },[usuarios,setUsuarios] )
   
    // verificar si el usuario es pasajero o administrador

      const esPasajero = usuarioActual?.tipo === 'pasajero'
      const esAdmin = usuarioActual?.tipo=== 'administrador'
      const estaAutenticado = !!usuarioActual 

      const value = {
        usuarioActual,
        estaAutenticado,
        esPasajero,
        esAdmin,
        login,
        logout,
        registrar,
        error,
        setError,


      }

      // vamos a retornar el provider envolviendo a todo para poder ingresar a la app

      return(
        <Authcontext.Provider value={value}>
            {Children}</Authcontext.Provider>
      )

} 
//hook personalizado para consumir el contexto de autenticacion

export function useAuth(){
    const context = useContext(Authcontext)
    if (!context) {
        throw new Error('useAuth debe usarse dentro de <AuthProvider>')
    }

    //devolver un text

    return context 
}


