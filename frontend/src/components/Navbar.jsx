import React from 'react'
import  './navbar.css'
// import {Link} from 

const Navbar = () => {
  return (
    <div className="navContainer">
      <h1>vegi Bassket</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>                
      </ul>
      <div className="btn">
      <button>Login</button>
      </div>
    </div>
  )
}

export default Navbar