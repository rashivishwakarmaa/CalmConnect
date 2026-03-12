const API_BASE = 'http://localhost:5000';

export async function fetchApi(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function getSession() {
  return fetchApi('/api/session');
}

export async function login(email, password) {
  return fetchApi('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function register(name, email, password) {
  return fetchApi('/api/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function logout() {
  return fetchApi('/api/logout', { method: 'POST' });
}

export async function getAppointments() {
  return fetchApi('/api/appointments');
}

export async function createAppointment(data) {
  return fetchApi('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function chatUrl() {
  return `${API_BASE}/chat`;
}
