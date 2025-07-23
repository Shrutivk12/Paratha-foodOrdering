import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
          <h2>Hot, Fresh, and Flaky - Parathas Delivered to Your Doorstep!</h2>
          <p>Craving a delicious bite? Order from our wide range of stuffed and plain parathas, made with love and delivered hot.</p>
          <button>Order Now!</button>
      </div>
    </div>
  )
}

export default Header
