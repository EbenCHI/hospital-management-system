import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorAPI } from '../services/api';

const specializationColors = {
  'Cardiology': 'badge-red',
  'Neurology': 'badge-purple',
  'Orthopedics': 'badge-blue',
  'Pediatrics': 'badge-green',
  'Dermatology': 'badge-yellow',
};

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await doctorAPI.getAll();
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await doctorAPI.delete(id);
      setMessage('Doctor deleted successfully');
      fetchDoctors();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {message && <div className="alert alert-success">✅ {message}</div>}

      <div className="page-header">
        <div>
          <h1 className="page-title">Doctors</h1>
          <p className="page-subtitle">{doctors.length} doctor(s) on staff</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/doctors/add')}>
          ＋ Add Doctor
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading"><div className="spinner"></div>Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚕️</div>
            <h3>No doctors registered</h3>
            <p>Add your first doctor to get started</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id}>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    #{String(d.id).padStart(3, '0')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: '#ECFDF5', color: '#059669',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 13
                      }}>
                        {d.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{d.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${specializationColors[d.specialization] || 'badge-gray'}`}>
                      {d.specialization}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{d.contact || '—'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(d.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
