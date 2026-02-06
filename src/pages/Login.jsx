import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            navigate('/admin');
        } else {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '1rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>Admin Login</h2>

                {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: '#888' }} />
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: '#888' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
