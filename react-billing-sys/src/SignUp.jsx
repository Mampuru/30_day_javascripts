// src/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    // For demo purposes, we just store the user in localStorage
    localStorage.setItem('user', JSON.stringify({ username, password }));
    navigate('/login');
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Email" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Confirm Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      
    </div>
  );
}

export default SignUp;
