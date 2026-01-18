// Authentication JavaScript

const API_BASE = 'http://localhost:5000/api';

// Check if user is logged in (global function for use in other scripts)
window.checkSession = async function() {
    try {
        const response = await fetch(`${API_BASE}/session`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        return data.authenticated ? data.user : null;
    } catch (error) {
        console.error('Session check error:', error);
        return null;
    }
};

// Display alert message
function showAlert(message, type = 'danger') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', async function() {
    const loginForm = document.getElementById('loginForm');
    const registerToggle = document.getElementById('registerToggle');

    // Check if user is already logged in
    const user = await checkSession();
    if (user && window.location.pathname.includes('login.html')) {
        // Redirect to appointments if already logged in
        window.location.href = 'appointments.html';
        return;
    }

    // Update navigation based on session
    updateNavigation(user);

    // Handle login form
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_BASE}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    showAlert('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'appointments.html';
                    }, 1000);
                } else {
                    showAlert(data.error || 'Login failed. Please try again.', 'danger');
                }
            } catch (error) {
                console.error('Login error:', error);
                showAlert('Connection error. Please check if the server is running.', 'danger');
            }
        });
    }

    // Handle register toggle (convert form to registration)
    if (registerToggle) {
        registerToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const form = document.getElementById('loginForm');
            const header = document.querySelector('.login-header h2');
            const subtitle = document.querySelector('.login-header p');
            const submitBtn = form.querySelector('button[type="submit"]');
            const registerLink = document.querySelector('.register-link p');

            // Add name field if not exists
            if (!document.getElementById('name')) {
                const emailField = document.getElementById('email');
                const nameField = document.createElement('div');
                nameField.className = 'mb-3';
                nameField.innerHTML = `
                    <label for="name" class="form-label">Full Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your full name"
                    />
                `;
                form.insertBefore(nameField, emailField.parentElement);
            }

            // Change form to registration
            header.textContent = 'Create Account';
            subtitle.textContent = 'Register for a new CalmConnect account';
            submitBtn.textContent = 'Register';
            registerLink.innerHTML = 'Already have an account? <a href="#" id="loginToggle">Login here</a>';

            // Update form handler
            form.onsubmit = async function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                try {
                    const response = await fetch(`${API_BASE}/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({ name, email, password }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showAlert('Registration successful! Please login.', 'success');
                        // Switch back to login form after 2 seconds
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                    } else {
                        showAlert(data.error || 'Registration failed. Please try again.', 'danger');
                    }
                } catch (error) {
                    console.error('Registration error:', error);
                    showAlert('Connection error. Please check if the server is running.', 'danger');
                }
            };

            // Add login toggle handler
            document.getElementById('loginToggle').addEventListener('click', function(e) {
                e.preventDefault();
                location.reload();
            });
        });
    }

    // Handle logout
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', async function(e) {
            e.preventDefault();
            try {
                await fetch(`${API_BASE}/logout`, {
                    method: 'POST',
                    credentials: 'include'
                });
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Logout error:', error);
            }
        });
    }
});

// Update navigation based on authentication status
async function updateNavigation(user) {
    const loginNavLink = document.getElementById('loginNavLink');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');

    if (user) {
        if (loginNavLink) loginNavLink.style.display = 'none';
        if (userInfo) {
            userInfo.style.display = 'block';
            if (userName) userName.textContent = user.name;
        }
    } else {
        if (loginNavLink) loginNavLink.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    }
}
