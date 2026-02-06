import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('vnr_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('vnr_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, variantIndex = 0) => {
        setCart(prev => {
            // Create a unique ID for cart item based on product ID AND variant
            const variant = product.variants[variantIndex];
            const uniqueId = `${product.id}-${variantIndex}`;

            const existing = prev.find(item => item.uniqueId === uniqueId);
            if (existing) {
                return prev.map(item => item.uniqueId === uniqueId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }

            return [...prev, {
                ...product,
                uniqueId,
                selectedVariant: variant,
                quantity: 1
            }];
        });
    };

    const removeFromCart = (uniqueId) => {
        setCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
    };

    const updateQuantity = (uniqueId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.uniqueId === uniqueId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (Number(item.selectedVariant.price) * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
