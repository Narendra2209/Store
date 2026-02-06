import React from 'react';
import { ShieldCheck, Truck, Tag, RefreshCw, CreditCard } from 'lucide-react';
import './Features.css';

const features = [
    {
        icon: <ShieldCheck size={32} />,
        title: "Fresh & Hygienic",
        desc: "Sourced directly for maximum purity."
    },
    {
        icon: <Truck size={32} />,
        title: "Fast Delivery",
        desc: "Doorstep delivery every morning."
    },
    {
        icon: <Tag size={32} />,
        title: "Affordable Prices",
        desc: "Best market rates for daily needs."
    },
    {
        icon: <RefreshCw size={32} />,
        title: "Easy Returns",
        desc: "No questions asked return policy."
    },
    {
        icon: <CreditCard size={32} />,
        title: "Secure Payments",
        desc: "Safe and encrypted transactions."
    }
];

const Features = () => {
    return (
        <section className="features-section">
            <div className="container">
                <h2 className="section-title">Why Choose VNR Store?</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
