import {useEffect} from 'react';

import './Success.css';
import secureLocalStorage from 'react-secure-storage';

const Success = () => {
  useEffect(() => {
    secureLocalStorage.removeItem('cart')
  }, [])
  return (
    <div className="Success">
        <h1>Thank your for your purchase!</h1>
        <p>Your order should be shipped within 2-5 business days.</p>
    </div>
  )
}

export default Success