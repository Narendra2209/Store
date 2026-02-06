import React, { useState } from 'react';
import './PageCommon.css';

const Milk = () => {
    const [quantity, setQuantity] = useState('');
    const [fat, setFat] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState(0);

    // Rate configuration 
    const RATE_PER_FAT_PER_LITER = 7.5;

    const calculateTotal = () => {
        const qty = parseFloat(quantity) || 0;
        const fatVal = parseFloat(fat) || 0;

        // Logic: Total Price = Quantity * Fat * Rate Factor
        const total = qty * fatVal * RATE_PER_FAT_PER_LITER;
        setCalculatedPrice(Math.round(total * 100) / 100);
    };

    return (
        <div style={{ minHeight: '80vh', backgroundColor: '#f4f6f8', paddingBottom: '3rem' }}>
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">MILK COLLECTION</h1>
                    <p>Calculate price based on Quantity and Fat content.</p>
                </div>
            </header>

            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="product-card" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)', textAlign: 'center', textTransform: 'uppercase' }}>
                        Price Calculator
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-medium)' }}>
                                Quantity (Liters)
                            </label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => { setQuantity(e.target.value); }}
                                onKeyUp={calculateTotal}
                                placeholder="Enter milk quantity"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1.2rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-medium)' }}>
                                Fat Content (%)
                            </label>
                            <input
                                type="number"
                                value={fat}
                                onChange={(e) => { setFat(e.target.value); }}
                                onKeyUp={calculateTotal}
                                placeholder="Enter fat percentage"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1.2rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <button
                            onClick={calculateTotal}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}
                        >
                            Calculate Price
                        </button>

                        {calculatedPrice > 0 && (
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1.5rem',
                                backgroundColor: 'var(--secondary-color)',
                                borderRadius: 'var(--radius-md)',
                                textAlign: 'center'
                            }}>
                                <span style={{ display: 'block', fontSize: '1rem', color: 'var(--text-medium)', marginBottom: '0.5rem' }}>
                                    Estimated Amount
                                </span>
                                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                                    ₹{calculatedPrice}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Milk;
