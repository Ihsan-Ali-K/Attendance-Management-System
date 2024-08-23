import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './components/authentication/Login';

import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Register from './components/authentication/Register';

function App() {
 

  return (
    <>
       { <Home  /> }
    
    </>
  );
}

export default App;
