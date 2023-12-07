import React from 'react'

import styles from './Header.module.css'

import Navbar from '../Navbar/Navbar'

const Header = () => {
  return (
    <header className={styles.Header}>
      {/* Add navigation links, search bar, or other header content here */}
      <Navbar />
    </header>
  )
}

export default Header