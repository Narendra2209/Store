import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { cart } = useCart();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Hook usage

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">

                {/* Mobile Toggle & Brand */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button className="mobile-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link to="/" className="nav-brand" onClick={closeMenu}>
                        <span role="img" aria-label="leaf">🌿</span> VNR Store
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/milk" className={`nav-link ${isActive('/milk')}`} onClick={closeMenu}>Milk</Link>
                    <Link to="/store" className={`nav-link ${isActive('/store')}`} onClick={closeMenu}>Store</Link>

                    {/* Mobile Only Actions in Menu */}
                    <div className="mobile-only-actions" style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}>
                        {/* Can add more mobile specific links here */}
                    </div>
                </div>

                {/* Right Actions */}
                <div className="nav-right">
                    {user ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link to="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                Admin
                            </Link>
                            <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                <LogOut size={16} style={{ marginRight: '6px' }} /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            <User size={16} style={{ marginRight: '6px' }} /> Login
                        </Link>
                    )}

                    <Link to="/cart" className="cart-btn">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
