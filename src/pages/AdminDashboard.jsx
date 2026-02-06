import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Trash2, Plus, Edit3, X } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const {
        products, categories,
        addCategory, removeCategory,
        addProduct, deleteProduct,
        addSupplier
    } = useStore();

    const [view, setView] = useState('products'); // products | categories | add-product | product-detail
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Form States
    const [newCat, setNewCat] = useState('');

    // New Product Form State
    const [newProd, setNewProd] = useState({
        name: '', category: '', image: '', variants: [{ price: 0, mrp: 0, weight: '' }]
    });

    // Supplier Form State
    const [newSupplier, setNewSupplier] = useState({ name: '', price: '', location: '' });

    if (!user) return <Navigate to="/login" replace />;

    const handleAddProduct = (e) => {
        e.preventDefault();
        addProduct(newProd);
        setView('products');
        setNewProd({ name: '', category: '', image: '', variants: [{ price: 0, mrp: 0, weight: '' }] });
    };

    const handleAddVariantStart = () => {
        setNewProd({ ...newProd, variants: [...newProd.variants, { price: 0, mrp: 0, weight: '' }] });
    };

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...newProd.variants];
        // If field is numeric, parse it
        if (field === 'price' || field === 'mrp') {
            updatedVariants[index][field] = parseFloat(value) || 0;
        } else {
            updatedVariants[index][field] = value;
        }
        setNewProd({ ...newProd, variants: updatedVariants });
    };

    const handleAddSupplier = (e) => {
        e.preventDefault();
        if (selectedProduct) {
            addSupplier(selectedProduct.id, { ...newSupplier, price: Number(newSupplier.price) });
            setNewSupplier({ name: '', price: '', location: '' });
            alert('Supplier Added');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--primary-color)' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className={`btn ${view === 'products' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('products')}>Products</button>
                    <button className={`btn ${view === 'categories' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('categories')}>Categories</button>
                </div>
            </header>

            {/* CATEGORIES MANAGEMENT */}
            {view === 'categories' && (
                <div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <input
                            type="text"
                            placeholder="New Category Name"
                            value={newCat}
                            onChange={e => setNewCat(e.target.value)}
                            style={{ padding: '0.5rem', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <button className="btn btn-primary" onClick={() => { if (newCat) { addCategory(newCat); setNewCat(''); } }}>Add</button>
                    </div>
                    <ul style={{ display: 'grid', gap: '1rem' }}>
                        {categories.map(cat => (
                            <li key={cat} style={{ background: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                                {cat}
                                <button onClick={() => removeCategory(cat)} style={{ color: 'red' }}><Trash2 size={18} /></button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* PRODUCTS LIST */}
            {view === 'products' && (
                <div>
                    <button className="btn btn-primary" style={{ marginBottom: '1.5rem' }} onClick={() => setView('add-product')}>
                        <Plus size={18} style={{ marginRight: '8px' }} /> Add New Product
                    </button>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {products.map(p => (
                            <div key={p.id} style={{ background: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{p.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{p.category}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-secondary" onClick={() => { setSelectedProduct(p); setView('product-detail'); }}>
                                        View Suppliers
                                    </button>
                                    <button onClick={() => deleteProduct(p.id)} style={{ color: 'red', background: 'none' }}><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ADD PRODUCT FORM */}
            {view === 'add-product' && (
                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px' }}>
                    <h3>Add New Product</h3>
                    <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <input required placeholder="Product Name" value={newProd.name} onChange={e => setNewProd({ ...newProd, name: e.target.value })} style={inputStyle} />
                        <select required value={newProd.category} onChange={e => setNewProd({ ...newProd, category: e.target.value })} style={inputStyle}>
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input required placeholder="Image URL" value={newProd.image} onChange={e => setNewProd({ ...newProd, image: e.target.value })} style={inputStyle} />

                        <h4>Variants</h4>
                        {newProd.variants.map((v, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                                <input placeholder="Weight (e.g. 10Gms)" value={v.weight} onChange={e => handleVariantChange(idx, 'weight', e.target.value)} style={inputStyle} />
                                <input type="number" placeholder="Price" value={v.price} onChange={e => handleVariantChange(idx, 'price', e.target.value)} style={inputStyle} />
                                <input type="number" placeholder="MRP" value={v.mrp} onChange={e => handleVariantChange(idx, 'mrp', e.target.value)} style={inputStyle} />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddVariantStart} style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>+ Add Variant</button>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setView('products')}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Product</button>
                        </div>
                    </form>
                </div>
            )}

            {/* PRODUCT DETAIL & SUPPLIERS */}
            {view === 'product-detail' && selectedProduct && (
                <div>
                    <button onClick={() => setView('products')} style={{ marginBottom: '1rem', background: 'none', color: '#666' }}>&larr; Back to Products</button>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
                        <h2>{selectedProduct.name}</h2>
                        <p className="text-medium" style={{ marginBottom: '2rem' }}>Manage Suppliers</p>

                        <div style={{ marginBottom: '2rem' }}>
                            <h4>Add Supplier Info</h4>
                            <form onSubmit={handleAddSupplier} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.8rem' }}>Supplier Name</label>
                                    <input required value={newSupplier.name} onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })} style={inputStyle} />
                                </div>
                                <div style={{ width: '100px' }}>
                                    <label style={{ fontSize: '0.8rem' }}>Price</label>
                                    <input required type="number" value={newSupplier.price} onChange={e => setNewSupplier({ ...newSupplier, price: e.target.value })} style={inputStyle} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.8rem' }}>Location/Notes</label>
                                    <input value={newSupplier.location} onChange={e => setNewSupplier({ ...newSupplier, location: e.target.value })} style={inputStyle} />
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>

                        <h4>Existing Suppliers</h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                                    <th style={{ padding: '0.5rem' }}>Name</th>
                                    <th style={{ padding: '0.5rem' }}>Price</th>
                                    <th style={{ padding: '0.5rem' }}>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* We need to re-find the product from state to see updates immediately */}
                                {products.find(p => p.id === selectedProduct.id)?.suppliers?.map((s, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td style={{ padding: '0.5rem' }}>{s.name}</td>
                                        <td style={{ padding: '0.5rem', color: 'green', fontWeight: 'bold' }}>₹{s.price}</td>
                                        <td style={{ padding: '0.5rem', color: '#666' }}>{s.location}</td>
                                    </tr>
                                ))}
                                {(!selectedProduct.suppliers || selectedProduct.suppliers.length === 0) && (
                                    <tr><td colSpan="3" style={{ padding: '1rem', textAlign: 'center', color: '#999' }}>No suppliers record found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
};

export default AdminDashboard;
