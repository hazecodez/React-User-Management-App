import React from 'react'
import Header from '../../Components/Admin/Header'
import Footer from '../../Components/Admin/Footer'
import UserList from '../../Components/Admin/UserList'


function Home() {
  return (
    <div>
      <Header/>
      <UserList/>
      <Footer/>
    </div>
  )
}

export default Home
