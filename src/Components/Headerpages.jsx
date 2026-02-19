import React from 'react'
import '../Styles/Header.css'
import logo from '../assets/klu-logo.jpg'
import { Link } from 'react-router-dom'

const HeaderPages = () => {
  return (
    <header className="headerpages">
      <div className="left">
        <img
          src={logo}
          alt="KL University"
          className="logo"
        />
        <h2 className="leftpages">Remote Internship Management</h2>
      </div>

      <div className="right">
        <Link to="/" className="home">Home</Link>
        
      </div>
    </header>
  )
}

export default HeaderPages