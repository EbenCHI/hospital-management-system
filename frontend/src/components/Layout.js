import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '▦', section: 'MAIN' },
  { path: '/patients', label: 'Patients', icon: '♡', section: 'MANAGEMENT' },
  { path: '/doctors', label: 'Doctors', icon: '⚕', section: 'MANAGEMENT' },
  { path: '/appointments', label: 'Appointments', icon: '📅', section: 'MANAGEMENT' },
];

export default function Layout({ children, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back, Admin' },
    '/patients': { title: 'Patient Management', subtitle: 'View and manage all patients' },
    '/patients/add': { title: 'Add New Patient', subtitle: 'Register a new patient' },
    '/doctors': { title: 'Doctor Management', subtitle: 'View and manage all doctors' },
    '/doctors/add': { title: 'Add New Doctor', subtitle: 'Register a new doctor' },
    '/appointments': { title: 'Appointments', subtitle: 'Manage all appointments' },
    '/appointments/book': { title: 'Book Appointment', subtitle: 'Schedule a new appointment' },
  };

  const currentPage = pageTitles[location.pathname] ||
    (location.pathname.includes('/patients/edit') ? { title: 'Edit Patient', subtitle: 'Update patient details' } : { title: 'Hospital Management', subtitle: '' });

  return (
    <div className="app-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🏥</div>
          <h1>MediCare HMS</h1>
          <p>Hospital System</p>
        </div>
        <nav className="sidebar-nav">
          {['MAIN', 'MANAGEMENT'].map(section => (
            <div key={section}>
              <div className="nav-section-label">{section}</div>
              {navItems.filter(i => i.section === section).map(item => (
                <button
                  key={item.path}
                  className={`nav-item ${location.pathname === item.path || location.pathname.startsWith(item.path + '/') ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item" onClick={onLogout}>
            <span style={{ fontSize: 16 }}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h2>{currentPage.title}</h2>
            {currentPage.subtitle && <p>{currentPage.subtitle}</p>}
          </div>
          <div className="topbar-right">
            <div className="user-badge">
              <div className="user-avatar">A</div>
              <span className="user-name">Admin</span>
            </div>
          </div>
        </header>
        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
}
