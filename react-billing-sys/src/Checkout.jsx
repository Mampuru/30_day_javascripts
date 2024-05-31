// src/Checkout.js
import React, { useState, useEffect } from 'react';
import './Checkout.css'; // CSS file for styling

function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Here you would normally handle the checkout process, e.g., save order to database
    alert('Checkout successful!');
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - R{item.price}
          </li>
        ))}
      </ul>
      <div className="checkout-total">
        Total: R{getTotal()}
      </div>
      <button onClick={handleCheckout}>Confirm and Pay</button>
    </div>
  );
}

export default Checkout;
