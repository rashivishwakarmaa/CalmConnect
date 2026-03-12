import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatWidget from './ChatWidget';
import './Layout.css';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar navbar-expand-lg navbar-calm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/logo.svg" alt="CalmConnect" width="144" height="31" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/about">About Us</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/exercises">Exercises</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/appointments">Appointments</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/my-appointments">My Appointments</NavLink></li>
            </ul>
            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item d-flex align-items-center gap-2">
                  <span className="navbar-text">Welcome, {user.name}</span>
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main className="main-content container py-4">{children}</main>
      <footer className="footer-calm">
        <p>&copy; 2024 CalmConnect. All rights reserved.</p>
      </footer>
      <ChatWidget />
    </div>
  );
}
