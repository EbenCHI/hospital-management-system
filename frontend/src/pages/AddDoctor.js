import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorAPI } from '../services/api';

const specializations = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'Dermatology', 'Oncology', 'Radiology', 'Psychiatry',
  'Gynecology', 'Ophthalmology', 'ENT', 'General Medicine',
];

export default function AddDoctor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', specialization: '', contact: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await doctorAPI.create(form);
      navigate('/doctors');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating doctor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add New Doctor</h1>
          <p className="page-subtitle">Register a new doctor in the system</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/doctors')}>
          ← Back to Doctors
        </button>
      </div>

      <div className="form-card">
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="name"
                type="text"
                placeholder="e.g. Dr. Sarah Johnson"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Specialization *</label>
              <select name="specialization" value={form.specialization} onChange={handleChange} required>
                <option value="">Select specialization</option>
                {specializations.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label>Contact Number</label>
              <input
                name="contact"
                type="text"
                placeholder="e.g. +1-555-0100"
                value={form.contact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? (
                <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div> Saving...</>
              ) : '✓ Register Doctor'}
            </button>
            <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate('/doctors')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
