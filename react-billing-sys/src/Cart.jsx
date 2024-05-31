// src/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // CSS file for styling

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const goToCheckout = () => {
    navigate('/checkout');
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - R{item.price}
          </li>
        ))}
      </ul>
      <div className="cart-total">
        Total: R{getTotal()}
      </div>
      <button onClick={goToCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
