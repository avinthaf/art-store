import React from 'react';

import './MobileMenu.css'

const MobileMenu = ({open}) => {
  return (
    <div className="mobile-menu" style={{ left: open? '0' : '-100vw' }}>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/contact">Contact</a>
            </li>
        </ul>
    </div>
  )
}

export default MobileMenu;