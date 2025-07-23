import React, { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import MyOrders from './pages/MyOrders/MyOrders'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer} from 'react-toastify'


const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin ? <LoginPopup setShowLogin = {setShowLogin}/> : <></>}
    <div className='app'>
      <NavBar setShowLogin = {setShowLogin}/>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/cart' element={ <Cart/> }/>
        <Route path='/myorders' element={ <MyOrders/> }/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
