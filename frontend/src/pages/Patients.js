import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientAPI } from '../services/api';

export default function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async (query = '') => {
    setLoading(true);
    try {
      const res = await patientAPI.getAll(query);
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchPatients(val);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      await patientAPI.delete(id);
      setMessage('Patient deleted successfully');
      fetchPatients(search);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const genderBadge = (gender) => {
    return gender === 'Male' ? 'badge-blue' : gender === 'Female' ? 'badge-purple' : 'badge-gray';
  };

  return (
    <div>
      {message && <div className="alert alert-success">✅ {message}</div>}

      <div className="page-header">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">{patients.length} patient(s) registered</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/patients/add')}>
          ＋ Add Patient
        </button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>Loading patients...
          </div>
        ) : patients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏥</div>
            <h3>No patients found</h3>
            <p>Add a new patient to get started</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Disease</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    #{String(p.id).padStart(3, '0')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: 'var(--primary-light)', color: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 13
                      }}>
                        {p.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{p.name}</span>
                    </div>
                  </td>
                  <td>{p.age} yrs</td>
                  <td><span className={`badge ${genderBadge(p.gender)}`}>{p.gender}</span></td>
                  <td>{p.disease ? <span className="badge badge-yellow">{p.disease}</span> : <span style={{ color: 'var(--text-light)' }}>—</span>}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{p.contact || '—'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => navigate(`/patients/edit/${p.id}`)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(p.id)}
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
