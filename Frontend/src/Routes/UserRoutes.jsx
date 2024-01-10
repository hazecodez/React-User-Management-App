import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/User/Home'
import Login from '../Pages/User/Login'
import Signup from '../Pages/User/Signup'
import Profile from '../Pages/User/Profile'

function UserRoutes() {
  return (
    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>} />
    </Routes>
  )
}

export default UserRoutes