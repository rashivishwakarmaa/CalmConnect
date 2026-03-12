import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login, register } from '../api';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/appointments');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ msg: '', type: '' });
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password);
        setAlert({ msg: 'Registration successful! Please login.', type: 'success' });
        setIsRegister(false);
        setName('');
      } else {
        const data = await login(email, password);
        setUser(data.user);
        setAlert({ msg: 'Login successful! Redirecting...', type: 'success' });
        setTimeout(() => navigate('/appointments'), 800);
      }
    } catch (err) {
      setAlert({ msg: err.message || 'Something went wrong', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isRegister ? 'Register for a new CalmConnect account' : 'Sign in to your CalmConnect account'}</p>
        </div>
        <div className="login-body">
          {alert.msg && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              {alert.msg}
              <button type="button" className="btn-close" onClick={() => setAlert({ msg: '', type: '' })} aria-label="Close" />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your full name" />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn btn-primary btn-login w-100" disabled={loading}>
              {loading ? 'Please wait...' : (isRegister ? 'Register' : 'Sign In')}
            </button>
          </form>
          <p className="register-link mt-3 text-center">
            {isRegister ? (
              <>Already have an account? <button type="button" className="btn-link" onClick={() => setIsRegister(false)}>Login here</button></>
            ) : (
              <>Don&apos;t have an account? <button type="button" className="btn-link" onClick={() => setIsRegister(true)}>Register here</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
