import React, { useContext, useState } from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NavBar = ({setShowLogin}) => {

  let [menu, setMenu] = useState("home");
  const{getTotalAmount, loggedIn, setLoggedIn, url} = useContext(StoreContext);

  const navigate = useNavigate();
  const logout = async() => {
    try{
      const response = await axios.get(`${url}/user/logout`, {withCredentials: true});
      if(response.data.success){
        setLoggedIn(false);
        toast.success(response.data.message);
        navigate("/");
      }
      else{
        toast.error(response.data.message)
      }
    }catch(err){
      toast.error(err.response?.data?.message || "Cannot logout");
    }
  }

  return (
    <>
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => {setMenu("home")}} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='/#food-display' onClick={() => {setMenu("menu")}} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='/#footer' onClick={() => {setMenu("contact-us")}} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <Link to='/cart'>
        <div className="navbar-cart-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <div className={getTotalAmount() ? "dot":""}></div>
        </div></Link>
        {(!loggedIn)
          ?<button onClick={ () => {setShowLogin(true)}} style={{color:"black"}}>Sign in</button>
          :<div className='navbar-profile'>
            <div className="profile"><i className="fa-solid fa-circle-user"></i></div>
            <ul className="nav-profile-dropdown">
              <li onClick={() => {navigate("/myorders")}}><i className="fa-solid fa-basket-shopping"></i><p>Orders</p> </li>
              <li onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i><p>Logout</p> </li>
            </ul>
          </div> 
        }
        
      </div>
    </div>
    </>
  )
}

export default NavBar
