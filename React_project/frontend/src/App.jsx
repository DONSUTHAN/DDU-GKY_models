import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
     <Route path='/'element={<Home/>}/>
      <Route path='login'element={<Login/>}/>
       <Route path='/'element={<Product/>}/>
    </Routes>
    </>
  )
}

export default App