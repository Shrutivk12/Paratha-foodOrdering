import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>We specialize in delivering freshly made, authentic parathas with a focus on quality, taste, and timely service.</p>
                <div className='footer-social-icons'>
                    <i className="fa-brands fa-facebook-f fa-xs"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-whatsapp"></i>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 9988776655</li>
                    <li>paratha@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2025 © Paratha - All rights reserved</p>
      
    </div>
  )
}

export default Footer
