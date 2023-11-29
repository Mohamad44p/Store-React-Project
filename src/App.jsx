// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage'; 
import Navbar from './components/Navbar'; // Import Navbar component
import { Provider } from 'react-redux';
import store from './store/store';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar /> {/* Navbar without the prop */}
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/About" element={<AboutUs />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
