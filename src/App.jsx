import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Product from './pages/Product/Product'
import Success from './pages/Success/Success'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'

import Header from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="page-container">
          <div className="content-wrap">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="/product/:productId" element={<Product />}/>
              <Route path="/success" element={<Success />}/>
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App
