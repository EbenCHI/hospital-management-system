import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../services/api';

export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await appointmentAPI.getAll();
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await appointmentAPI.delete(id);
      setMessage('Appointment cancelled successfully');
      fetchAppointments();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div>
      {message && <div className="alert alert-success">✅ {message}</div>}

      <div className="page-header">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">{appointments.length} appointment(s) scheduled</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/appointments/book')}>
          📅 Book Appointment
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading"><div className="spinner"></div>Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No appointments scheduled</h3>
            <p>Book your first appointment to get started</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    #{String(a.id).padStart(3, '0')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 6,
                        background: 'var(--primary-light)', color: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 12
                      }}>
                        {a.patient?.name?.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 500 }}>{a.patient?.name}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 500 }}>{a.doctor?.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        {a.doctor?.specialization}
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: 13 }}>
                    {formatDate(a.appointmentDate)}
                  </td>
                  <td>
                    <span className={`badge ${
                      a.status === 'SCHEDULED' ? 'badge-green' :
                      a.status === 'COMPLETED' ? 'badge-blue' :
                      'badge-gray'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: 150 }}>
                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.notes || '—'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
                      ✕ Cancel
                    </button>
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
