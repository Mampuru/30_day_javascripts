// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      navigate('/billing');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignUp = () => {
    // For demo purposes, we just store the user in localStorage
    localStorage.setItem('user', JSON.stringify({ username, password }));
    navigate('/signup');
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <br/>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default Login;
