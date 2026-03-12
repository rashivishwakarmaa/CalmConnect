import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createAppointment } from '../api';

const DOCTORS = [
  'Dr. Sanjeet Diwan (DE Addiction Specialist)',
  'Dr. Vaibhav Dubey',
  'Dr. Hritu Singh',
  'Dr. Mitali Soni Loya',
  'Dr. Manish Borasi',
  'Dr. Rashmi Moghe Hirve',
  'Dr. Sumera Khan Hashmi',
  'Dr. JP Agrawal',
  'Dr. Pritesh Goutam - Nirvana Clinic',
  'Dr. R.N. Sahu',
  'Dr. Chirag Patel',
  'Dr. SK Tondon',
];

const TIMES = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

export default function Appointments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ msg: '', type: '' });
  const [form, setForm] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    notes: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setForm((f) => ({ ...f, patientName: user.name || '', patientEmail: user.email || '' }));
  }, [user, navigate]);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ msg: '', type: '' });
    setSubmitting(true);
    try {
      await createAppointment(form);
      setAlert({ msg: 'Appointment booked successfully! View it in My Appointments.', type: 'success' });
      setForm((f) => ({ ...f, reason: '', notes: '' }));
    } catch (err) {
      setAlert({ msg: err.message || 'Failed to book appointment', type: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="appointment-page py-5">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="card appointment-card">
          <div className="appointment-header">
            <h2>Book Your Appointment</h2>
            <p className="mb-0">Schedule a consultation with our mental health specialists</p>
          </div>
          <div className="card-body p-4">
            <div className="user-info mb-4 p-3 bg-light rounded">
              <strong>Logged in as:</strong> {user.name} | <strong>Email:</strong> {user.email}
            </div>
            {alert.msg && (
              <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
                {alert.msg}
                <button type="button" className="btn-close" onClick={() => setAlert({ msg: '', type: '' })} />
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name *</label>
                  <input type="text" className="form-control" name="patientName" value={form.patientName} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email *</label>
                  <input type="email" className="form-control" name="patientEmail" value={form.patientEmail} onChange={handleChange} required />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Phone *</label>
                  <input type="tel" className="form-control" name="patientPhone" value={form.patientPhone} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Select Doctor *</label>
                  <select className="form-select" name="doctor" value={form.doctor} onChange={handleChange} required>
                    <option value="">Choose...</option>
                    {DOCTORS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Date *</label>
                  <input type="date" className="form-control" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} min={today} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Time *</label>
                  <select className="form-select" name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required>
                    <option value="">Select...</option>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t.slice(0, 2) === '09' || t.slice(0, 2) === '10' || t.slice(0, 2) === '11' ? `${t} AM` : t <= '12' ? `${t} PM` : `${parseInt(t) - 12}:00 PM`}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Reason for Visit *</label>
                <textarea className="form-control" name="reason" value={form.reason} onChange={handleChange} rows={4} required />
              </div>
              <div className="mb-4">
                <label className="form-label">Additional Notes</label>
                <textarea className="form-control" name="notes" value={form.notes} onChange={handleChange} rows={2} />
              </div>
              <button type="submit" className="btn btn-primary btn-book" disabled={submitting}>
                {submitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-5 text-center">
          <div className="card border-0 shadow-sm py-4 px-4">
            <p className="mb-3 text-muted">View and manage your scheduled consultations</p>
            <Link to="/my-appointments" className="btn btn-outline-primary btn-view-appointments">
              View My Appointments →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
