import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
      <div className='menu'>
        <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/register"><li>Register</li></Link>
            <Link to="/login"><li>Login</li></Link>
        </ul>
      </div>
    </div>
  )
}
