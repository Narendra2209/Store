import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import './PageCommon.css';

const Store = () => {
    const { products, categories } = useStore();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Ensure products is an array before filtering to prevent crashes
    const safeProducts = Array.isArray(products) ? products : [];

    const filteredProducts = safeProducts
        .filter(p => activeCategory === "All" || p.category === activeCategory)
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <header className="page-header" style={{ padding: '2rem 0', marginBottom: '2rem' }}>
                <div className="container" style={{ position: 'relative' }}>
                    <h1 className="page-title" style={{ textTransform: 'uppercase', fontSize: '2rem' }}>Grocery Store</h1>

                    <div className="store-controls" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
                        <div className="search-bar" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                                <input
                                    type="text"
                                    placeholder="Search products or brands..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                {/* Horizontal Scrollable Categories */}
                <div className="filter-tabs" style={{ justifyContent: 'flex-start', overflowX: 'auto', paddingBottom: '1rem' }}>
                    <button
                        className={`filter-tab ${activeCategory === 'All' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('All')}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center" style={{ padding: '4rem', color: '#888' }}>
                        No products found matching your criteria.
                    </div>
                ) : (
                    <div className="products-grid" style={{
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        columnGap: '1rem',
                        rowGap: '2rem'
                    }}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} type="store" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Store;
