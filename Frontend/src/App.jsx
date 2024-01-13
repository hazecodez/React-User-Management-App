import React from 'react'
// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRoutes from './Routes/userRoutes';
import AdminRoutes from './Routes/AdminRoutes';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<UserRoutes/>} />
        <Route path='/admin/*' element={ <AdminRoutes/> } />
      </Routes>
    </Router>
  )
}

export default App