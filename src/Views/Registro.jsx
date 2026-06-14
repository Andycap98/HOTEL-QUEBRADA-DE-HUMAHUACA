import { useState,useEffect } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { use } from 'react'

{/* vamos a crear un enum de nacionalidades, enum es una estructura de tipo listas */}

const NACIONALIDADES = [
    'argentina','boliviana','uruguaya', 'chilena','brasileña','paraguaya','chino','cubana','puertoriqueña','mexicana','otras'
]

export default function Registro(){
    const {registrar, estaAutenticado, error, setError} = useAuth()
    const navigate = useNavigate()
    const [form, setForm]= useState({
        dni: '',
        nombre:'',
        apellido: '',
        fechaNacimiento:'',
        nacionalidad:'',
        password:'',
        confirmPassword:'',

    })
    const [errores,setErrores]= useState({})
    const [exito,setExito] =useState(false)
    const [loading,setLoading]= useState (false)
    useEffect(()=> {
        if (estaAutenticado) navigate('/dashboard')

    },[estaAutenticado,navigate] )

    useEffect(()=>()=> setError(null),[setError])
   
    {/* parte de validaciones  */}
    const validar= ()=> {
        if (!form.dni.trim()|| !/^\d{7,8}$/.est(form.dni)) errs.dni='dni de 7 u 8 digitos'
        if (!form.nombre.trim()|| form.nombre.length < 2) errs.nombre='nombre obligatorio min 2 caracteres'
        if (!form.apellido.trim()|| form.nombre.length<2) errs.apellido=' apellido obligatorio min 2 caracteres'
        if (!form.fechaNacimiento){
            errs.fechaNacimiento= 'fecha de nacimiento obligatoria'
        } else {
            const edad= new Date().getFullYear() - new Date(form.fechaNacimiento).getFullYear() 
            if (edad<18) errs.fechaNacimiento='debe ser mayor a 18'

        }
        if (!form.nacionalidad) errs.nacionalidad='seleccioná una nacionalidad'
        if (!form.password || form.password.length<6) errs.password='la contraseña debe ser mayor a 6 caracteres'
        if (!form.password !== form.confirmPassword)  errs.confirmPassword='las contraseñas no coinciden'
        return errs 
    }
    const handlechange = (e) => {
        const {name,value}= e.target
        setForm((prev)=>({...prev,[name]:value}))
        if (errores[name]) setErrores((prev)=>({...prev, [name]: ''}))
    
    } 
    const handlesubmit = async (e) => {
        e.preventDefault()
        const errs = validar()
        if (Object.keys(errs).length>0) return setErrores(errs) 

        setLoading(true)
        
        await new Promise ((r)=> setTimeout(r,400))
        const ok= registrar(form)
        setLoading (false)
        if (ok) {
            setExito(true) 
            setTimeout(()=> navigate('/Login'),2000) 
        }
    }
    const inputClass = (campo) =>
    `w-full px-4 py-2.5 rounded-lg border text-slate-800 outline-none transition-all
    ${errores[campo] ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏨</div>
          <h1 className="text-3xl font-bold text-white">HotelSPA</h1>
          <p className="text-slate-400 mt-1">Crear cuenta de pasajero</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Registro</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
              ⚠️ {error}
            </div>
          )}

          {exito && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-5 text-sm">
              ✅ ¡Cuenta creada exitosamente! Redirigiendo al login...
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Fila DNI y Fecha */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">DNI *</label>
                <input type="text" name="dni" value={form.dni} onChange={handleChange}
                  placeholder="12345678" maxLength={8} className={inputClass('dni')} />
                {errores.dni && <p className="text-red-500 text-xs mt-1">{errores.dni}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de nacimiento *</label>
                <input type="date" name="fechaNacimiento" value={form.fechaNacimiento}
                  onChange={handleChange} className={inputClass('fechaNacimiento')} />
                {errores.fechaNacimiento && <p className="text-red-500 text-xs mt-1">{errores.fechaNacimiento}</p>}
              </div>
            </div>

            {/* Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre *</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange}
                  placeholder="María" className={inputClass('nombre')} />
                {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Apellido *</label>
                <input type="text" name="apellido" value={form.apellido} onChange={handleChange}
                  placeholder="López" className={inputClass('apellido')} />
                {errores.apellido && <p className="text-red-500 text-xs mt-1">{errores.apellido}</p>}
              </div>
            </div>

            {/* Nacionalidad */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nacionalidad *</label>
              <select name="nacionalidad" value={form.nacionalidad} onChange={handleChange}
                className={inputClass('nacionalidad')}>
                <option value="">Seleccioná una opción...</option>
                {NACIONALIDADES.map((n) => (
                  <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
                ))}
              </select>
              {errores.nacionalidad && <p className="text-red-500 text-xs mt-1">{errores.nacionalidad}</p>}
            </div>

            {/* Contraseñas */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña *</label>
                <input type="password" name="password" value={form.password} onChange={handleChange}
                  placeholder="••••••" className={inputClass('password')} />
                {errores.password && <p className="text-red-500 text-xs mt-1">{errores.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar contraseña *</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword}
                  onChange={handleChange} placeholder="••••••" className={inputClass('confirmPassword')} />
                {errores.confirmPassword && <p className="text-red-500 text-xs mt-1">{errores.confirmPassword}</p>}
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors">
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-5">
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="text-amber-600 font-medium hover:underline">Iniciá sesión</Link>
          </p>
        </div>
      </div>
    </div>
  )
}


