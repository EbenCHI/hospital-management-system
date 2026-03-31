import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientAPI } from '../services/api';

const initialForm = { name: '', age: '', gender: '', disease: '', contact: '' };

export default function AddPatient() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await patientAPI.create({ ...form, age: parseInt(form.age) });
      navigate('/patients');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add New Patient</h1>
          <p className="page-subtitle">Register a new patient in the system</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/patients')}>
          ← Back to Patients
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
                placeholder="e.g. John Smith"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Age *</label>
              <input
                name="age"
                type="number"
                placeholder="e.g. 35"
                min="0"
                max="150"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                name="contact"
                type="text"
                placeholder="e.g. +1-555-0100"
                value={form.contact}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label>Disease / Condition</label>
              <input
                name="disease"
                type="text"
                placeholder="e.g. Hypertension, Diabetes"
                value={form.disease}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? (
                <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div> Saving...</>
              ) : '✓ Register Patient'}
            </button>
            <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate('/patients')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
