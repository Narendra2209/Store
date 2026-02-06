import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        Fresh Milk & Daily Essentials Delivered to Your Door
                    </h1>
                    <p className="hero-subtitle">
                        Pure milk, trusted brands, fast local delivery. Experience the freshness every morning with VNR Store.
                    </p>
                    <div className="hero-actions">
                        <Link to="/milk" className="btn btn-primary">
                            Order Now <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </Link>
                        <Link to="/store" className="btn btn-secondary">
                            Browse Store <ShoppingBag size={18} style={{ marginLeft: '8px' }} />
                        </Link>
                    </div>
                </div>
                <div className="hero-image">
                    {/* Using a high quality placeholder since generation failed. In prod, this would be an actual asset. */}
                    <img
                        src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop"
                        alt="Grocery Delivery"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
