import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, FileText, ShoppingBag, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPDF = () => {
        setIsGenerating(true);
        try {
            const doc = new jsPDF();

            // Brand Colors
            const primaryColor = [76, 175, 80]; // Green 500

            // Header Section
            // doc.setFillColor(...primaryColor);
            // doc.rect(0, 0, 210, 40, 'F');

            doc.setFontSize(22);
            doc.setTextColor(46, 125, 50); // Darker Green
            doc.text("VNR STORE", 14, 20);

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text("Premium Grocery & Milk Store", 14, 26);
            doc.text("Hyderabad, India", 14, 30);
            doc.text(`Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 35);

            // Invoice Title
            doc.setFontSize(16);
            doc.setTextColor(0);
            doc.text("ORDER SUMMARY", 150, 20, { align: 'right' });

            // User Details (Placeholder for manual entry if printed)
            // doc.setDrawColor(200);
            // doc.line(14, 45, 196, 45);

            // Table Columns
            const tableColumn = ["#", "Product Name", "Weight", "Rate", "Qty", "Total"];
            const tableRows = [];

            cart.forEach((item, index) => {
                const itemTotal = Number(item.selectedVariant.price) * item.quantity;
                const productData = [
                    index + 1,
                    item.name,
                    item.selectedVariant.weight,
                    `Rs. ${Number(item.selectedVariant.price).toFixed(2)}`,
                    item.quantity,
                    `Rs. ${itemTotal.toFixed(2)}`
                ];
                tableRows.push(productData);
            });

            // Calculate Totals using data directly to be sure
            const grandTotal = cart.reduce((acc, item) => acc + (Number(item.selectedVariant.price) * item.quantity), 0);
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

            // Add Summary Rows
            tableRows.push(["", "", "", "", "", ""]); // Spacer
            tableRows.push(["", "", "", "Total Items", totalItems, ""]);
            tableRows.push(["", "", "", "Grand Total", "", `Rs. ${grandTotal.toFixed(2)}`]);

            // Generate Table
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 45,
                theme: 'grid',
                headStyles: {
                    fillColor: [46, 125, 50],
                    textColor: 255,
                    fontSize: 10,
                    fontStyle: 'bold'
                },
                columnStyles: {
                    0: { cellWidth: 10 },
                    1: { cellWidth: 'auto' }, // Product Name
                    2: { cellWidth: 25 },
                    3: { cellWidth: 25, halign: 'right' },
                    4: { cellWidth: 15, halign: 'center' },
                    5: { cellWidth: 30, halign: 'right' }
                },
                footStyles: {
                    fillColor: [240, 240, 240],
                    textColor: 0,
                    fontStyle: 'bold'
                },
                styles: {
                    fontSize: 10,
                    cellPadding: 3,
                    valign: 'middle'
                },
                didParseCell: function (data) {
                    // Style the Grand Total row
                    if (data.row.index === tableRows.length - 1 && data.column.index === 5) {
                        data.cell.styles.fillColor = [232, 245, 233];
                        data.cell.styles.textColor = [46, 125, 50];
                        data.cell.styles.fontStyle = 'bold';
                    }
                }
            });

            // Footer
            const finalY = (doc).lastAutoTable.finalY || 150;
            doc.setFontSize(10);
            doc.setTextColor(120);
            doc.text("Thank you for shopping with VNR Store!", 105, finalY + 20, { align: 'center' });
            doc.text("Call us: +91 98765 43210", 105, finalY + 26, { align: 'center' });

            doc.save(`VNR_Order_${Date.now()}.pdf`);
        } catch (error) {
            console.error("PDF Generation Error", error);
            alert("Failed to generate PDF");
        } finally {
            setIsGenerating(false);
        }
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

            <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

                {/* Cart Items List */}
                <div style={{ background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', gridColumn: 'span 2' }}>
                    {cart.map((item) => (
                        <div key={item.uniqueId} style={{
                            display: 'flex',
                            padding: '1.5rem',
                            borderBottom: '1px solid #f0f0f0',
                            gap: '1.5rem',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <img src={item.image || 'https://placehold.co/100'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />

                            <div style={{ flex: 1, minWidth: '150px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: '600' }}>{item.name}</h3>
                                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                                    Pack: <span style={{ fontWeight: '500', color: '#333' }}>{item.selectedVariant.weight}G</span>
                                </div>
                                <div style={{ fontWeight: 'bold', color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                                    ₹{item.selectedVariant.price}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '20px', backgroundColor: '#f9f9f9' }}>
                                    <button onClick={() => updateQuantity(item.uniqueId, -1)} style={{ padding: '0.5rem 0.8rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#555' }}>-</button>
                                    <span style={{ padding: '0.2rem 0.5rem', minWidth: '30px', textAlign: 'center', fontWeight: '600' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.uniqueId, 1)} style={{ padding: '0.5rem 0.8rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#555' }}>+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.uniqueId)} style={{ color: '#ff5252', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }} title="Remove Item">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div style={{ padding: '1.5rem', textAlign: 'right' }}>
                        <button onClick={clearCart} style={{ color: '#888', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }}>
                            Clear Shopping Cart
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px' }}>
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Order Summary</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#555' }}>
                        <span>Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                        <span>₹{getCartTotal().toFixed(2)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.4rem' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--primary-color)' }}>₹{getCartTotal().toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleDownloadPDF}
                        className="btn btn-primary"
                        disabled={isGenerating}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '1rem', fontSize: '1.1rem' }}
                    >
                        {isGenerating ? 'Generating...' : <><FileText size={20} /> Download Order PDF</>}
                    </button>

                    <p style={{ fontSize: '0.85rem', color: '#888', textAlign: 'center', lineHeight: '1.5' }}>
                        Download the PDF order summary to share via WhatsApp or save for your records.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default CartPage;
