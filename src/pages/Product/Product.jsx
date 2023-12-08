import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useParams, NavLink } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage";

import './Product.css'

import Alert from '../../components/Alert/Alert';

const Product = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [submitted, setSubmitState] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productDocRef = doc(db, 'products', productId)

      try {
        const productDocSnapshot = await getDoc(productDocRef)
        if (productDocSnapshot.exists()) {
          setProduct(productDocSnapshot.data());
        } else {
          console.log(`Product with ID ${productId} does not exist.`)
        }
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error)
      }
    }

    fetchProduct()
  }, [productId])

  if (!product) {
    return <div>Loading...</div>
  }

  const { productId:id, title, price, description, image, category } = product

  const handleOnSubmit = (e, name, price, image) => {
    e.preventDefault()

    price = parseInt(price.toString().split(".").join(""))

    const url = 'https://art-store-server.onrender.com/api/create-checkout-session'
    
    const data = {
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name,
              images:[image]
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ]
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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

  function addToCart(productId, quantity) {
    // Get the cart data from secure storage
    let cartItems = secureLocalStorage.getItem('cart') || []
  
    // Check if the product is already in the cart
    const existingProductIndex = cartItems.findIndex(item => item.productId === productId)
  
    if (existingProductIndex !== -1) {
      // If the product exists, update the quantity
      cartItems[existingProductIndex].quantity += quantity
    } else {
      // If the product doesn't exist, add it to the cart
      const newCartItem = { productId, quantity }
      cartItems.push(newCartItem)
    }
  
    // Save the updated cart data to secure storage
    secureLocalStorage.setItem('cart', cartItems)

    setSubmitState(true)
    setTimeout(() => {
      setSubmitState(false)
      window.location.reload();
    }, 1000)
  
  }

  return (
    <div className="Product">
      <Alert isOpen={submitted} setSubmitState={setSubmitState}>Item added to cart!</Alert>
      <nav aria-label="breadcrumb">
        <div className="breadcrumb">
          <NavLink exact to="/" className="breadcrumb-link">Home</NavLink>
            <span className="breadcrumb-separator"> / </span>
          {/* <NavLink to={`/category/${category}`} className="breadcrumb-link">{`${category}`}</NavLink>
          <span className="breadcrumb-separator"> / </span> */}
          <span className="breadcrumb-current">{title}</span>
        </div>
      </nav>
      <div className="product-details">
        <div className="left">
          <img src={image} alt={title} className="product-image" />
        </div>
          <div className="right">
          <h3 className="product-title">{title}</h3>
          <span className="product-price">${price}</span>
          <p className="product-description">{description}</p>
          <div className="actions">
            <form onSubmit={(e) => handleOnSubmit(e, title, price, image)}>
              <button className="black" type="submit">
                Buy now
              </button>
            </form>
            <button onClick={() => addToCart(id, 1)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
