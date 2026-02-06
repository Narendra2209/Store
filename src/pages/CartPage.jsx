import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, FileText, ShoppingBag } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.setTextColor(46, 125, 50); // Primary Green
        doc.text("VNR Store - Order Summary", 14, 22);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

        // Table Data
        const tableColumn = ["Product Name", "Weight", "Price", "Qty", "Total"];
        const tableRows = [];

        cart.forEach(item => {
            const itemTotal = Number(item.selectedVariant.price) * item.quantity;
            const productData = [
                item.name,
                item.selectedVariant.weight,
                `Rs. ${item.selectedVariant.price}`,
                item.quantity,
                `Rs. ${itemTotal}`
            ];
            tableRows.push(productData);
        });

        // Add Total Row
        tableRows.push(["", "", "", "Grand Total", `Rs. ${getCartTotal()}`]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [46, 125, 50] }, // Green Header
            styles: { fontSize: 10, cellPadding: 3 },
        });

        doc.save("VNR_Store_Order.pdf");
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', minHeight: '60vh', textAlign: 'center' }}>
                <ShoppingBag size={64} style={{ color: '#ddd', marginBottom: '1rem' }} />
                <h2 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Your Cart is Empty</h2>
                <p style={{ color: '#666', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
                <a href="/store" className="btn btn-primary" style={{ display: 'inline-block' }}>Start Shopping</a>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Your Shopping Cart</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>

                {/* Cart Items List */}
                <div style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    {cart.map((item) => (
                        <div key={item.uniqueId} style={{
                            display: 'flex',
                            padding: '1.5rem',
                            borderBottom: '1px solid #eee',
                            gap: '1.5rem',
                            alignItems: 'center'
                        }}>
                            <img src={item.image || 'https://placehold.co/100'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />

                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                                    Pack: {item.selectedVariant.weight}
                                </div>
                                <div style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                    ₹{item.selectedVariant.price}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <button onClick={() => updateQuantity(item.uniqueId, -1)} style={{ padding: '0.25rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>-</button>
                                    <span style={{ padding: '0.25rem 0.5rem', minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.uniqueId, 1)} style={{ padding: '0.25rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.uniqueId)} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div style={{ padding: '1rem', textAlign: 'right' }}>
                        <button onClick={clearCart} style={{ color: '#666', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
                            Clear Cart
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px' }}>
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>Order Summary</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span>Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                        <span>₹{getCartTotal()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--primary-color)' }}>₹{getCartTotal()}</span>
                    </div>

                    <button onClick={handleDownloadPDF} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <FileText size={20} /> Download Order PDF
                    </button>

                    <p style={{ fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>
                        Download the PDF to order these items via WhatsApp or Phone.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default CartPage;
