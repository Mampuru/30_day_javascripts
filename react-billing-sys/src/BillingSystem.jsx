// src/BillingSystem.js
import React, { useState } from 'react';
import './App.css';

function BillingSystem() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    if (name && price) {
      setItems([...items, { name, price: parseFloat(price) }]);
      setName('');
      setPrice('');
    }
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <h1>Billing System</h1>
      <div className="input-section">
        <input 
          type="text" 
          placeholder="Item Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Item Price" 
          value={price}
          onChange={(e) => setPrice(e.target.value)} 
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="items-section">
        <h2>Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}: R{item.price.toFixed(2)}</li>
          ))}
        </ul>
      </div>
      <div className="total-section">
        <h2>Total: R{getTotal()}</h2>
      </div>
    </div>
  );
}

export default BillingSystem;
