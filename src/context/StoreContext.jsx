import React, { createContext, useState, useContext, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

// Initial Mock Data
const initialCategories = [
    "personal care",
    "home care",
    "oil sugar and masala",
    "rice .Atta and dals",
    "package food and dry foods",
    "cool drinks",
    "bru packets",
    "రవ్వ"
];
const initialProducts = [
    {
        id: 101,
        name: "ANASA PUVVU (Star Anise)",
        category: "Spices",
        image: "https://placehold.co/300x300/white/e65100?text=Star+Anise",
        variants: [
            { price: 10, mrp: 15, weight: '10Gms' },
            { price: 20, mrp: 30, weight: '25Gms' },
            { price: 30, mrp: 45, weight: '40Gms' },
            { price: 40, mrp: 60, weight: '55Gms' },
            { price: 50, mrp: 75, weight: '70Gms' }
        ],
        suppliers: [
            { name: "Srinivasa Traders", price: 8, location: "Local Market" },
            { name: "AgriDirect", price: 7.5, location: "Farm Gate" }
        ]
    },
    {
        id: 102,
        name: "ROASTED CHANA (Putnalu)",
        category: "Dal & Pulses",
        image: "https://placehold.co/300x300/white/e65100?text=Chana",
        variants: [
            { price: 10, mrp: 15, weight: '100Gms' },
            { price: 20, mrp: 28, weight: '250Gms' },
            { price: 30, mrp: 45, weight: '400Gms' },
            { price: 40, mrp: 60, weight: '550Gms' },
            { price: 50, mrp: 75, weight: '750Gms' }
        ],
        suppliers: [
            { name: "Local Wholesale", price: 70, unit: "kg", location: "City" }
        ]
    },
    // ... adding a few more for initial population
    {
        id: 103,
        name: "ELAICHI (Cardamom)",
        category: "Spices",
        image: "https://placehold.co/300x300/white/e65100?text=Elaichi",
        variants: [
            { price: 10, mrp: 18, weight: '2Gms' },
            { price: 20, mrp: 35, weight: '5Gms' },
            { price: 50, mrp: 80, weight: '12Gms' },
        ],
        suppliers: []
    },
];

export const StoreProvider = ({ children }) => {
    // Try to load from localStorage first
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('vnr_products');
        return saved ? JSON.parse(saved) : initialProducts;
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('vnr_categories');
        return saved ? JSON.parse(saved) : initialCategories;
    });

    useEffect(() => {
        localStorage.setItem('vnr_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('vnr_categories', JSON.stringify(categories));
    }, [categories]);

    const addCategory = (name) => {
        if (!categories.includes(name)) {
            setCategories([...categories, name]);
        }
    };

    const removeCategory = (name) => {
        setCategories(categories.filter(c => c !== name));
    };

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now(), suppliers: [] };
        setProducts([...products, newProduct]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const addSupplier = (productId, supplier) => {
        setProducts(products.map(p => {
            if (p.id === productId) {
                const currentSuppliers = p.suppliers || [];
                return { ...p, suppliers: [...currentSuppliers, supplier] };
            }
            return p;
        }));
    };

    return (
        <StoreContext.Provider value={{
            products, categories,
            addCategory, removeCategory,
            addProduct, updateProduct, deleteProduct,
            addSupplier
        }}>
            {children}
        </StoreContext.Provider>
    );
};
