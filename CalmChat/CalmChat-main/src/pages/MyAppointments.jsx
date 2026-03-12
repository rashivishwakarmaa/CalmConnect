import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAppointments } from '../api';

const STATUS_STYLES = {
  confirmed: { bg: 'status-confirmed', label: 'Confirmed', icon: '✓' },
  pending: { bg: 'status-pending', label: 'Pending', icon: '○' },
  cancelled: { bg: 'status-cancelled', label: 'Cancelled', icon: '✕' },
};

export default function MyAppointments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    getAppointments()
      .then((data) => setAppointments(data.appointments || []))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) return null;

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
  );

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="my-appointments-page py-5">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="page-title mb-1">Your Appointments</h1>
            <p className="text-muted mb-0">
              View and manage your scheduled consultations
            </p>
          </div>
          <Link to="/appointments" className="btn btn-book">
            Book New Appointment
          </Link>
        </div>

        {loading ? (
          <div className="appointments-loading text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-3">Loading your appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="appointments-empty card border-0 shadow-sm">
            <div className="card-body text-center py-5 px-4">
              <div className="empty-icon mb-3">📅</div>
              <h4 className="mb-2">No appointments yet</h4>
              <p className="text-muted mb-4">
                Schedule a consultation with our mental health specialists
              </p>
              <Link to="/appointments" className="btn btn-book">
                Book Your First Appointment
              </Link>
            </div>
          </div>
        ) : (
          <div className="appointments-grid">
            {sortedAppointments.map((apt) => {
              const statusKey = (apt.status || 'pending').toLowerCase();
              const statusStyle = STATUS_STYLES[statusKey] || STATUS_STYLES.pending;
              return (
                <div
                  key={apt.id}
                  className="appointment-card card border-0 shadow-sm h-100"
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="appointment-id text-muted">
                        #{apt.id?.slice(0, 8)}
                      </span>
                      <span
                        className={`badge status-badge ${statusStyle.bg} text-uppercase`}
                      >
                        {statusStyle.icon} {statusStyle.label}
                      </span>
                    </div>
                    <h5 className="appointment-doctor mb-3">{apt.doctor}</h5>
                    <div className="appointment-details">
                      <div className="detail-row">
                        <span className="detail-label">Date</span>
                        <span className="detail-value">{formatDate(apt.appointmentDate)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Time</span>
                        <span className="detail-value">{apt.appointmentTime || '—'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Reason</span>
                        <span className="detail-value">{apt.reason}</span>
                      </div>
                      {apt.notes && (
                        <div className="detail-row">
                          <span className="detail-label">Notes</span>
                          <span className="detail-value text-muted">{apt.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
