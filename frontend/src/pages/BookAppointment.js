import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI, patientAPI, doctorAPI } from '../services/api';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientId: '', doctorId: '', appointmentDate: '', status: 'SCHEDULED', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([patientAPI.getAll(), doctorAPI.getAll()])
      .then(([pRes, dRes]) => {
        setPatients(pRes.data);
        setDoctors(dRes.data);
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        patientId: parseInt(form.patientId),
        doctorId: parseInt(form.doctorId),
        appointmentDate: new Date(form.appointmentDate).toISOString().slice(0, 19),
        status: form.status,
        notes: form.notes,
      };
      await appointmentAPI.create(payload);
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.error || 'Error booking appointment.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="loading"><div className="spinner"></div>Loading...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Book Appointment</h1>
          <p className="page-subtitle">Schedule a new patient-doctor appointment</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/appointments')}>
          ← Back to Appointments
        </button>
      </div>

      <div className="form-card">
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        {patients.length === 0 || doctors.length === 0 ? (
          <div className="alert alert-info">
            ℹ️ You need at least one patient and one doctor to book an appointment.
            {patients.length === 0 && (
              <button className="btn btn-primary btn-sm" style={{ marginLeft: 12 }} onClick={() => navigate('/patients/add')}>
                Add Patient
              </button>
            )}
            {doctors.length === 0 && (
              <button className="btn btn-success btn-sm" style={{ marginLeft: 8 }} onClick={() => navigate('/doctors/add')}>
                Add Doctor
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Select Patient *</label>
                <select name="patientId" value={form.patientId} onChange={handleChange} required>
                  <option value="">Choose a patient</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.disease || 'No condition listed'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Select Doctor *</label>
                <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
                  <option value="">Choose a doctor</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialization}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Appointment Date & Time *</label>
                <input
                  name="appointmentDate"
                  type="datetime-local"
                  value={form.appointmentDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Notes</label>
                <textarea
                  name="notes"
                  placeholder="Additional notes or reason for visit..."
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? (
                  <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div> Booking...</>
                ) : '📅 Confirm Appointment'}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate('/appointments')}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
