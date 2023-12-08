import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage";
import { Cross as Hamburger } from 'hamburger-react';

import './Navbar.css'

import MobileMenu from '../MobileMenu/MobileMenu.jsx'

const Navbar = () => {
  const [cartQty, setCartQty] = useState(0);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    let cartItemsQty = 0; 
    const cartItems = secureLocalStorage.getItem('cart') || [];
    cartItems.map(({quantity}) => {
      cartItemsQty += quantity
    })
    setCartQty(cartItemsQty)
  }, [setCartQty])
  return (
    <>
      <nav className="navbar">
        <div className="cart">
          <a href="/cart" className="navbar-cart-link">
            Cart
          </a>
          <hr/>
          <div className="qty">
            {cartQty}
          </div>
        </div>
        <a href="/" className="navbar-logo">
          John Doe Art
        </a>
        <ul className="navbar-menu">
          <li>
            <a href="/" className={`navbar-menu-item ${window.location.pathname === '/' && 'active'}`} >
              HOME
            </a>
          </li>
          <li>
            <a href="/about"className={`navbar-menu-item ${window.location.pathname === '/about' && 'active'}`} >
              ABOUT
            </a>
          </li>
          <li>
            <a href="/contact" className={`navbar-menu-item ${window.location.pathname === '/contact' && 'active'}`} >
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
      <nav className='mobile-nav'>
        <Hamburger toggled={isOpen} toggle={setOpen} />
        <a href="/" className="navbar-logo">
          John Doe Art
        </a>
        <div className="cart">
          <a href="/cart" className="navbar-cart-link">
            Cart
          </a>
          <hr />
          <div className="qty">
            {cartQty}
          </div>
        </div>
      </nav>
      <MobileMenu open={isOpen}/>
    </>
  )
}

export default Navbar