import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Register from './Components/Login/Registro'; 
import Login from './Components/Login/Login';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/registro" element={<Register />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
