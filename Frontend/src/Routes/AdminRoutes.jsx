import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Home from '../Pages/Admin/Home'
import AddUserPage from '../Pages/Admin/AddUserPage'
import EditUserPage from '../Pages/Admin/EditUserPage'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Login/> } />
        <Route path='/dashboard' element={ <Home/> } />
        <Route path='/addUser' element={ <AddUserPage/> } />
        <Route path='/editUser' element={ <EditUserPage/> } />
      </Routes>
    </div>
  )
}

export default AdminRoutes
