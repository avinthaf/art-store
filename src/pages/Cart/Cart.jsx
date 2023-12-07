import React, { useState, useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../firebase'
import './Cart.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const fetchedCartItems = secureLocalStorage.getItem('cart') || []
    setCartItems(fetchedCartItems)

    const productIds = fetchedCartItems.map(item => item.productId)
    const productQuery = query(collection(db, 'products'), where('productId', 'in', productIds.length > 0 ? productIds : ['']))

    getDocs(productQuery)
      .then(snapshot => {
        const fetchedProducts = snapshot.docs.map(doc => doc.data())
        const updatedCartItems = fetchedCartItems.map(item => {
          const product = fetchedProducts.find(p => p.productId === item.productId)
          const productName = product ? product.title : 'Unknown'
          const totalPrice = product ? product.price * item.quantity : 0
          const { image } = product
          return { ...item, productName, totalPrice, image }
        })
        setCartItems(updatedCartItems)
        const calculatedSubtotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0)
        setSubtotal(calculatedSubtotal)
      })
      .catch(error => {
        console.log('Error fetching product details:', error)
      })
  }, [])

  const updateCartItem = (index, updatedCartItems) => {
    setCartItems(updatedCartItems)
    const calculatedSubtotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0)
    setSubtotal(calculatedSubtotal)
    secureLocalStorage.setItem('cart', updatedCartItems)
  }

  const handleIncreaseQuantity = index => {
    const updatedCartItems = [...cartItems]
    updatedCartItems[index].quantity++
    updateCartItem(index, updatedCartItems)
    window.location.reload()
  }

  const handleDecreaseQuantity = index => {
    const updatedCartItems = [...cartItems]
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--
      updateCartItem(index, updatedCartItems)
    }
    window.location.reload()
  }

  const handleDeleteItem = index => {
    const updatedCartItems = [...cartItems]
    updatedCartItems.splice(index, 1)
    updateCartItem(index, updatedCartItems)
    window.location.reload()
  }

  const createCheckout = (cartItems) => {
    const url = 'https://art-store-server.onrender.com/api/create-checkout-session'

    const line_items = []

    cartItems.map((item) => {
      const { image, productName:name, totalPrice, quantity } = item
      let price = parseInt(totalPrice.toString().split(".").join(""))
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: name,
            images:[image]
          },
          unit_amount: (price/quantity),
        },
        quantity: quantity,
      })
    })

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({line_items})
    })
      .then(response => response.json())
      .then(result => {
        // Handle the response from the server
        window.location.replace(result)
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      })
  } 

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-details">
                  <div className="cart-item-image-container">
                    <img src={item.image} alt={item.productName} className="cart-item-image" />
                  </div>
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.productName}</h3>
                    <p className="cart-item-price">${item.totalPrice && item.totalPrice.toFixed(2)}</p>
                    <div className="cart-item-quantity">
                      <button className="quantity-button" onClick={() => handleDecreaseQuantity(index)}>-</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button className="quantity-button" onClick={() => handleIncreaseQuantity(index)}>+</button>
                    </div>
                  </div>
                </div>
                <button className="delete-button" onClick={() => handleDeleteItem(index)}>REMOVE</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2 className="summary-heading">Order Summary <hr/></h2>
            <div className="summary-subtotal">
              <span className="summary-label">Subtotal:</span>
              <span className="summary-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-shipping">
              <span className="summary-value">Shipping calculated at the next step</span>
            </div>
            <div className="summary-total">
              <span className="summary-label">Total:</span>
              <span className="summary-value">${(subtotal + 20).toFixed(2)}</span>
            </div>
            <button className="checkout-button black" onClick={() => createCheckout(cartItems)}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
