import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2>VNR Store</h2>
                        <p className="text-medium">
                            Fresh milk and daily essentials delivered to your doorstep. Pure, hygienic, and on time.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><Facebook size={18} /></a>
                            <a href="#" className="social-icon"><Instagram size={18} /></a>
                            <a href="#" className="social-icon"><Twitter size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/milk">Milk Subscription</Link></li>
                            <li><Link to="/store">Store</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer-heading">Contact Us</h3>
                        <ul className="footer-contact">
                            <li><Phone size={18} /> +91 98765 43210</li>
                            <li><Mail size={18} /> support@vnrstore.com</li>
                            <li>📍 Hyderabad, India</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} VNR Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
