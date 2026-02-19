import React from 'react'
import logo from '../assets/header.png'
import { Link } from 'react-router-dom'
import '../Styles/Header.css'

const Cpheader = () => {
  return (
    <header className="header">
      <div className="left">
        <img
          src={logo}
          alt="KL University"
          className="logo"
        />
        <h2 className="title">Remote Internship Management</h2>
      </div>

      <div className="right">
        <Link to="/login" className="login">Login</Link>
        <Link to="/register" className="register">Register</Link>
      </div>
    </header>
  )
}

export default Cpheader