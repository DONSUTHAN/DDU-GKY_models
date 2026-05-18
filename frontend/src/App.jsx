import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import {Routes , Route} from 'react-router-dom'
import Products from './components/Products'

 
const App = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Products/>
    </>
  )
}




export default App