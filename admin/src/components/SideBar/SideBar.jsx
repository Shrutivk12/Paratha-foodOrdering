import React from 'react'
import './SideBar.css'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <i className="fa-solid fa-plus"></i>
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <i className="fa-solid fa-list-ul"></i>
                <p>All Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <i className="fa-solid fa-basket-shopping"></i>
                <p>All Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar
