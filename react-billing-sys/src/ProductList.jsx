// src/ProjectList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css'; // CSS file for styling

const products = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
  { id: 3, name: 'Product C', price: 300 },
];

function ProductList() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const goToCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div className="project-list">
      <h2>Available Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R{product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <button onClick={goToCart}>Go to Cart ({cart.length})</button>
    </div>
  );
}

export default ProductList;
