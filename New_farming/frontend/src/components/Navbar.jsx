import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <header>
        <div className="logo">
          Big_veggi
        </div>
        <div className="links">
          <Link>Home</Link>
          <Link>Contacts</Link>
          <Link>About</Link>
        </div>
        <button type='login'>Login</button>
      </header>
    </div>
  )
}

export default Navbar