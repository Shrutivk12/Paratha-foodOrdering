import React from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets';

const NavBar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo" />
        <div className="profile"><i className="fa-solid fa-circle-user"></i></div>
      
    </div>
  )
}

export default NavBar
