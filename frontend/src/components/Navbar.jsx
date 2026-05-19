import React from 'react'
import  './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navContainer">
      <h1>vegi Bassket</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="Product">products</Link>
        <Link to="Login"></Link>
      </div>
      <div className="btn">
      <button>Login</button>
      </div>
    </div>
  )
}

export default Navbar