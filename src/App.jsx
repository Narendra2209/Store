import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Milk from './pages/Milk';
import Store from './pages/Store';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import CartPage from './pages/CartPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/milk" element={<Milk />} />
                <Route path="/store" element={<Store />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
