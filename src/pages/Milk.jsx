import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, Clock, Droplet, Percent } from 'lucide-react';
import './PageCommon.css';

const Milk = () => {
    // Current date for default input
    const today = new Date().toISOString().split('T')[0];

    const [date, setDate] = useState(today);
    const [session, setSession] = useState('Morning');
    const [quantity, setQuantity] = useState('');
    const [fat, setFat] = useState('');

    // Load records from local storage
    const [records, setRecords] = useState(() => {
        const saved = localStorage.getItem('milk_tracker');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to local storage whenever records change
    useEffect(() => {
        localStorage.setItem('milk_tracker', JSON.stringify(records));
    }, [records]);

    const RATE_PER_FAT_PER_LITER = 7.5;

    const handleAddRecord = (e) => {
        e.preventDefault();

        if (!quantity || !fat || !date) {
            alert("Please fill all fields");
            return;
        }

        const qtyVal = parseFloat(quantity);
        const fatVal = parseFloat(fat);
        const amount = (qtyVal * fatVal * RATE_PER_FAT_PER_LITER).toFixed(2);

        const newRecord = {
            id: Date.now(),
            date: date,
            session: session,
            quantity: qtyVal,
            fat: fatVal,
            amount: parseFloat(amount)
        };

        // Add to top of list
        setRecords([newRecord, ...records]);

        // Reset fields but keep date (often users enter multiple for same day)
        setQuantity('');
        // setFat(''); // Optional: keep fat if it's consistent
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            setRecords(records.filter(r => r.id !== id));
        }
    };

    // Sort records by date (descending) then session
    const sortedRecords = [...records].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA || (a.session === 'Morning' ? 1 : -1);
    });

    const totalAmount = records.reduce((acc, curr) => acc + curr.amount, 0);
    const totalQty = records.reduce((acc, curr) => acc + curr.quantity, 0);

    return (
        <div style={{ minHeight: '90vh', backgroundColor: '#f4f6f8', paddingBottom: '3rem' }}>
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">MILK COLLECTION TRACKER</h1>
                    <p>Track daily milk collection, calculate payments, and manage history.</p>
                </div>
            </header>

            <div className="container" style={{ marginTop: '2rem' }}>
                <div className="milk-dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                    {/* Left Column: Input Form */}
                    <div className="card form-card" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={24} color="var(--primary-color)" />
                            New Entry
                        </h2>

                        <form onSubmit={handleAddRecord}>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    // Max today? Or allow future? Usually passed is fine.
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                                <small style={{ color: '#666', marginTop: '0.25rem', display: 'block' }}>
                                    Default is today. Change for past entries.
                                </small>
                            </div>

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Session</label>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <label style={{ flex: 1, cursor: 'pointer', padding: '0.8rem', border: `1px solid ${session === 'Morning' ? 'var(--primary-color)' : '#ddd'}`, borderRadius: '8px', backgroundColor: session === 'Morning' ? '#e8f5e9' : 'white', textAlign: 'center' }}>
                                        <input
                                            type="radio"
                                            name="session"
                                            value="Morning"
                                            checked={session === 'Morning'}
                                            onChange={(e) => setSession(e.target.value)}
                                            style={{ display: 'none' }}
                                        />
                                        Morning
                                    </label>
                                    <label style={{ flex: 1, cursor: 'pointer', padding: '0.8rem', border: `1px solid ${session === 'Evening' ? 'var(--primary-color)' : '#ddd'}`, borderRadius: '8px', backgroundColor: session === 'Evening' ? '#e8f5e9' : 'white', textAlign: 'center' }}>
                                        <input
                                            type="radio"
                                            name="session"
                                            value="Evening"
                                            checked={session === 'Evening'}
                                            onChange={(e) => setSession(e.target.value)}
                                            style={{ display: 'none' }}
                                        />
                                        Evening
                                    </label>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Quantity (L)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            placeholder="0.00"
                                            style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                        />
                                        <Droplet size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Fat (%)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={fat}
                                            onChange={(e) => setFat(e.target.value)}
                                            placeholder="0.0"
                                            style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                        />
                                        <Percent size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                                <span style={{ color: '#666', fontSize: '0.9rem' }}>Estimated Amount</span>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                    ₹{quantity && fat ? (parseFloat(quantity) * parseFloat(fat) * RATE_PER_FAT_PER_LITER).toFixed(2) : '0.00'}
                                </div>
                                <span style={{ fontSize: '0.8rem', color: '#999' }}>Rate: {RATE_PER_FAT_PER_LITER} / fat / L</span>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                                Add Record
                            </button>
                        </form>
                    </div>

                    {/* Right Column: History Table */}
                    <div className="card history-card" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Collection History</span>
                            <span style={{ fontSize: '1rem', color: 'var(--primary-color)', backgroundColor: '#e8f5e9', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
                                Total: ₹{totalAmount.toFixed(2)}
                            </span>
                        </h2>

                        <div className="table-responsive" style={{ overflowY: 'auto', flex: 1, maxHeight: '600px' }}>
                            {sortedRecords.length === 0 ? (
                                <div style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                                    No records found. Add your first entry!
                                </div>
                            ) : (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', color: '#666' }}>
                                            <th style={{ padding: '1rem 0.5rem' }}>Date</th>
                                            <th style={{ padding: '1rem 0.5rem' }}>Session</th>
                                            <th style={{ padding: '1rem 0.5rem' }}>Qty/Fat</th>
                                            <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Amount</th>
                                            <th style={{ padding: '1rem 0.5rem', width: '40px' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedRecords.map((record) => (
                                            <tr key={record.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                <td style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>
                                                    {new Date(record.date).toLocaleDateString()}
                                                </td>
                                                <td style={{ padding: '1rem 0.5rem' }}>
                                                    <span style={{
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '12px',
                                                        fontSize: '0.85rem',
                                                        backgroundColor: record.session === 'Morning' ? '#fff3e0' : '#e3f2fd',
                                                        color: record.session === 'Morning' ? '#f57c00' : '#1976d2'
                                                    }}>
                                                        {record.session}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem 0.5rem' }}>
                                                    <div style={{ fontWeight: '600' }}>{record.quantity} L</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{record.fat}% Fat</div>
                                                </td>
                                                <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                                    ₹{record.amount.toFixed(2)}
                                                </td>
                                                <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                                                    <button
                                                        onClick={() => handleDelete(record.id)}
                                                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ff5252' }}
                                                        title="Delete Record"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Milk;
