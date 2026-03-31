import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import AddPatient from './pages/AddPatient';
import EditPatient from './pages/EditPatient';
import Doctors from './pages/Doctors';
import AddDoctor from './pages/AddDoctor';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/patients/edit/:id" element={<EditPatient />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/add" element={<AddDoctor />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/book" element={<BookAppointment />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
