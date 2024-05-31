// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import BillingSystem from './BillingSystem';
import SignUp from './SignUp';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/billing" element={<BillingSystem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


