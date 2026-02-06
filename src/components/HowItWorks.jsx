import React from 'react';
import './HowItWorks.css';

const steps = [
    {
        step: 1,
        title: "Select Products",
        desc: "Choose from our wide range of fresh milk and daily essentials."
    },
    {
        step: 2,
        title: "Subscribe or Order",
        desc: "Set up a daily subscription or place a one-time order."
    },
    {
        step: 3,
        title: "Fast Delivery",
        desc: "Get your order delivered to your doorstep early morning."
    }
];

const HowItWorks = () => {
    return (
        <section className="hiw-section">
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <div className="hiw-grid">
                    {steps.map((item, index) => (
                        <div className="hiw-card" key={index}>
                            <div className="step-number">{item.step}</div>
                            <h3 className="hiw-title">{item.title}</h3>
                            <p className="hiw-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
