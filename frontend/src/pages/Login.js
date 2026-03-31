import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Demo auth - in production, connect to backend auth
    await new Promise(r => setTimeout(r, 800));
    if (form.username === 'admin' && form.password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid credentials. Use admin / admin123');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="icon">🏥</div>
          <h1>MediCare HMS</h1>
          <p>Hospital Management System</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                Signing in...
              </>
            ) : '🔐 Sign In'}
          </button>
        </form>

        <div className="login-hint">
          <span>ℹ️</span>
          <div>
            <strong>Demo Credentials:</strong><br />
            Username: <code>admin</code> &nbsp;|&nbsp; Password: <code>admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
