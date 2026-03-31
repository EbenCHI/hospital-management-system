import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, patientAPI, doctorAPI, appointmentAPI } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0 });
  const [recentPatients, setRecentPatients] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, patientsRes, appointmentsRes] = await Promise.all([
        dashboardAPI.getStats(),
        patientAPI.getAll(),
        appointmentAPI.getAll(),
      ]);
      setStats(statsRes.data);
      setRecentPatients(patientsRes.data.slice(-5).reverse());
      setRecentAppointments(appointmentsRes.data.slice(-5).reverse());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Patients',
      value: stats.totalPatients,
      icon: '♡',
      bg: '#EFF6FF',
      color: '#2563EB',
      change: 'Registered patients',
      path: '/patients',
    },
    {
      label: 'Total Doctors',
      value: stats.totalDoctors,
      icon: '⚕',
      bg: '#ECFDF5',
      color: '#059669',
      change: 'Medical staff',
      path: '/doctors',
    },
    {
      label: 'Appointments',
      value: stats.totalAppointments,
      icon: '📅',
      bg: '#F5F3FF',
      color: '#7C3AED',
      change: 'Scheduled visits',
      path: '/appointments',
    },
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      {/* Stat Cards */}
      <div className="dashboard-grid">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="stat-card"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(card.path)}
          >
            <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
              <span style={{ fontSize: 22 }}>{card.icon}</span>
            </div>
            <div className="stat-content">
              <div className="stat-value" style={{ color: card.color }}>{card.value}</div>
              <div className="stat-label">{card.label}</div>
              <div className="stat-change" style={{ color: card.color, opacity: 0.7 }}>
                {card.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/patients/add')}>
            ＋ Add Patient
          </button>
          <button className="btn btn-success" onClick={() => navigate('/doctors/add')}>
            ＋ Add Doctor
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/appointments/book')}>
            📅 Book Appointment
          </button>
        </div>
      </div>

      {/* Recent Data */}
      <div className="recent-section">
        {/* Recent Patients */}
        <div className="table-container">
          <div className="table-header">
            <h3>Recent Patients</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/patients')}>
              View All
            </button>
          </div>
          {recentPatients.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px 20px' }}>
              <div className="empty-icon">🏥</div>
              <p>No patients yet</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Disease</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td>{p.age}</td>
                    <td>
                      <span className="badge badge-blue">{p.disease || 'N/A'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Appointments */}
        <div className="table-container">
          <div className="table-header">
            <h3>Recent Appointments</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/appointments')}>
              View All
            </button>
          </div>
          {recentAppointments.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px 20px' }}>
              <div className="empty-icon">📅</div>
              <p>No appointments yet</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 500 }}>{a.patient?.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{a.doctor?.name}</td>
                    <td>
                      <span className={`badge ${a.status === 'SCHEDULED' ? 'badge-green' : 'badge-gray'}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
