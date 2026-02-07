import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, type }) => {
    // Safety Check 1: Product must exist
    if (!product) return null;

    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    // Safety Check 2: Ensure variants array exists and has at least one item
    // If not, use product root properties or defaults
    const hasVariants = product.variants && product.variants.length > 0;
    const variants = hasVariants ? product.variants : [
        {
            price: Number(product.price) || 0,
            mrp: Number(product.mrp) || (Number(product.price) || 0) * 1.2,
            weight: product.weight || 'Std Unit'
        }
    ];

    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const currentVariant = variants[selectedVariantIndex] || variants[0];

    // Safety Check 3: If still no variant (should be impossible due to default above, but good for TS safety mental model)
    if (!currentVariant) return null;

    if (type === 'milk_deprecated') return null; // Just in case

    const handleAddToCart = () => {
        addToCart(product, selectedVariantIndex);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="product-card">
            {/* Discount Badge */}
            <div className="discount-badge">
                {Math.round(((currentVariant.mrp - currentVariant.price) / currentVariant.mrp) * 100)}% OFF
            </div>

            <div className="product-image-wrapper">
                <img
                    src={product.image || 'https://placehold.co/300x300?text=No+Image'}
                    alt={product.name || 'Product'}
                    className="product-image"
                    loading="lazy"
                />
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <div className="company-badge">VNR STORE</div>

                {/* Weight Display */}
                <div className="product-weight">{currentVariant.weight}</div>

                {/* Variant Selectors ( Price Points ) */}
                <div className="variant-selector">
                    {variants.map((variant, idx) => (
                        <button
                            key={idx}
                            className={`variant-btn ${idx === selectedVariantIndex ? 'active' : ''}`}
                            onClick={() => setSelectedVariantIndex(idx)}
                        >
                            {variant.price}
                        </button>
                    ))}
                </div>

                <div className="product-footer">
                    <div className="price-block">
                        {Number(currentVariant.mrp) > Number(currentVariant.price) && <span className="mrp-price">₹{Number(currentVariant.mrp).toFixed(2)}</span>}
                        <span className="current-price">₹{Number(currentVariant.price).toFixed(2)}</span>
                    </div>

                    <button
                        className="add-btn"
                        aria-label="Add to cart"
                        onClick={handleAddToCart}
                        style={{ backgroundColor: added ? '#4caf50' : '' }}
                    >
                        {added ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                </div>

                {/* Show Best Supplier - Lowest Price */}
                {product.suppliers && product.suppliers.length > 0 && (
                    <div className="supplier-info" style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                        {(() => {
                            const cheapestSupplier = product.suppliers.reduce((min, s) => s.price < min.price ? s : min, product.suppliers[0]);
                            return (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Best Rate: <span style={{ fontWeight: '600', color: '#2e7d32' }}>{cheapestSupplier.name}</span></span>
                                    <span style={{ fontWeight: 'bold' }}>₹{cheapestSupplier.price}</span>
                                </div>
                            );
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
