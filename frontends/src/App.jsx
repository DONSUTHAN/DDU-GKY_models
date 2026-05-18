import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Login from './pages/Login'
// import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Login/>
      {/* <Register/> */}
    </div>
  )
}

export default App