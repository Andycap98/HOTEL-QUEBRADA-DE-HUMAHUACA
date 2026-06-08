import { useState,useEffect } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

{/* vamos a crear un enum de nacionalidades, enum es una estructura de tipo listas */}

const NACIONALIDADES = [
    'argentina','boliviana','uruguaya', 'chilena','brasileña','paraguaya','chino','cubana','puertoriqueña','mexicana','otras'
]
