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
          <NavLink to="/cart" className="navbar-cart-link">
            Cart
          </NavLink>
          <hr/>
          <div className="qty">
            {cartQty}
          </div>
        </div>
        <NavLink to="/" className="navbar-logo">
          John Doe Art
        </NavLink>
        <ul className="navbar-menu">
          <li>
            <NavLink exact to="/" className="navbar-menu-item" activeClassName="active">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navbar-menu-item" activeClassName="active">
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="navbar-menu-item" activeClassName="active">
              CONTACT
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className='mobile-nav'>
        <Hamburger toggled={isOpen} toggle={setOpen} />
        <a href="/" className="navbar-logo">
          John Doe Art
        </a>
        <div className="cart">
          <NavLink to="/cart" className="navbar-cart-link">
            Cart
          </NavLink>
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