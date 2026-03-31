import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { patientAPI } from '../services/api';

export default function EditPatient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', age: '', gender: '', disease: '', contact: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const res = await patientAPI.getById(id);
      const p = res.data;
      setForm({
        name: p.name || '',
        age: p.age || '',
        gender: p.gender || '',
        disease: p.disease || '',
        contact: p.contact || '',
      });
    } catch (err) {
      setError('Patient not found');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await patientAPI.update(id, { ...form, age: parseInt(form.age) });
      navigate('/patients');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating patient.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="loading"><div className="spinner"></div>Loading patient...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Patient</h1>
          <p className="page-subtitle">Update patient information</p>
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
              <input name="name" type="text" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Age *</label>
              <input name="age" type="number" min="0" max="150" value={form.age} onChange={handleChange} required />
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
              <input name="contact" type="text" value={form.contact} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label>Disease / Condition</label>
              <input name="disease" type="text" value={form.disease} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? (
                <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div> Updating...</>
              ) : '✓ Update Patient'}
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
