import { useState,useEffect } from "react"
import {useNavigate,Link} from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

export default function Login (){
    const {login,estaAutenticado,error,setError}= useAuth()
    const navigate =useNavigate()
    const [form,setForm]=useState({dni: '',password:''})
    const [errores,setrrores]=useState({})
    const [loading,setLoading]= useState(false)

    {/* si ya esta autenticado redirigir */}
    useEffect (
        ()=> {
            if (estaAutenticado) navigate('/dashboard')
        },[estaAutenticado,navigate]
    )
    {/**limpiar el error del contexto  */}
    useEffect (()=>()=> setError(null),[setError])
  
    {/*  validacion*/}
    const validar =()=>{
        const errs ={}
        if (!form.dni.trim()) errs.dni='el DNI es OBLIGATORIO'
        else if (!/^\d{7,8}$/.test(form.dni)) errs.dni= 'el DNI tiene que tener 7 u 8 digitos' 
        if (!form.password) errs.password='la contraseña ES OBLIGATORIA'
        else if (form.password.length<6) errs.password='minimo 6 caracteres'
        return errs
    }

    const handleChange =(e)=> {
        const {name,value}= e.target
        setForm ((prev)=>({...prev,[name]: ''}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault ()
        const errs = validar () 
        if (Object.keys(errs).length>0) return setErrores (errs) 
        setLoading (true) 
       
        {/* simular un pequeño delay  */}     
        await new Promise ((r) => setTimeout(r,400))
        const Ok = login (form.dni, form.password)
        setLoading (false)
        if (Ok) navigate ('/dashboard')  
        
    }
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏨</div>
          <h1 className="text-3xl font-bold text-white">HotelSPA</h1>
          <p className="text-slate-400 mt-1">Sistema de Gestión Hotelera</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Iniciar sesión</h2>

          {/* Error global */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* DNI */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                DNI / Documento
              </label>
              <input
                type="text"
                name="dni"
                value={form.dni}
                onChange={handleChange}
                placeholder="Ej: 12345678"
                maxLength={8}
                className={`w-full px-4 py-2.5 rounded-lg border text-slate-800 outline-none transition-all
                  ${errores.dni ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
              />
              {errores.dni && <p className="text-red-500 text-xs mt-1">{errores.dni}</p>}
            </div>

            {/* Contraseña */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg border text-slate-800 outline-none transition-all
                  ${errores.password ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'}`}
              />
              {errores.password && (
                <p className="text-red-500 text-xs mt-1">{errores.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-5">
            ¿No tenés cuenta?{' '}
            <Link to="/registro" className="text-amber-600 font-medium hover:underline">
              Registrate
            </Link>
          </p>

          {/* Credenciales de prueba */}
          <div className="mt-6 bg-slate-50 rounded-lg p-4 text-xs text-slate-500">
            <p className="font-semibold mb-1 text-slate-600">Cuentas de prueba:</p>
            <p>👤 Admin: DNI <strong>12345678</strong> / pass: <strong>admin123</strong></p>
            <p>🧳 Pasajero: DNI <strong>87654321</strong> / pass: <strong>pass123</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}

