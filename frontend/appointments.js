// Appointments JavaScript

const API_BASE = 'http://localhost:5000/api';

// Check authentication and load user data
async function initAppointments() {
    const user = await checkSession();
    
    if (!user) {
        // Redirect to login if not authenticated
        alert('Please login to book appointments.');
        window.location.href = 'login.html';
        return;
    }

    // Update UI with user info
    updateUserInfo(user);
    
    // Set minimum date to today
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Pre-fill form with user data
    const nameInput = document.getElementById('patientName');
    const emailInput = document.getElementById('patientEmail');
    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';

    // Load existing appointments
    await loadAppointments(user.email);
}

// Update user info display
function updateUserInfo(user) {
    const userInfoSection = document.getElementById('userInfoSection');
    const displayUserName = document.getElementById('displayUserName');
    const displayUserEmail = document.getElementById('displayUserEmail');

    if (userInfoSection && user) {
        userInfoSection.style.display = 'block';
        if (displayUserName) displayUserName.textContent = user.name || '';
        if (displayUserEmail) displayUserEmail.textContent = user.email || '';
    }
}

// Load appointments for the user
async function loadAppointments(userEmail) {
    try {
        const response = await fetch(`${API_BASE}/appointments`, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            displayAppointments(data.appointments || []);
        }
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

// Display appointments
function displayAppointments(appointments) {
    const container = document.getElementById('appointmentsContainer');
    const listSection = document.getElementById('appointmentsList');

    if (!container) return;

    if (appointments.length === 0) {
        container.innerHTML = '<p class="text-muted">No appointments booked yet.</p>';
        if (listSection) listSection.style.display = 'none';
        return;
    }

    if (listSection) listSection.style.display = 'block';

    // Sort appointments by date (newest first)
    appointments.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

    container.innerHTML = appointments.map(apt => {
        const date = new Date(apt.appointmentDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const time = apt.appointmentTime || 'Not specified';
        const statusBadge = apt.status === 'pending' 
            ? '<span class="badge bg-warning">Pending</span>'
            : '<span class="badge bg-success">Confirmed</span>';

        return `
            <div class="appointment-item">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5>Appointment #${apt.id}</h5>
                    ${statusBadge}
                </div>
                <p><strong>Doctor:</strong> ${apt.doctor}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Patient:</strong> ${apt.patientName}</p>
                <p><strong>Contact:</strong> ${apt.patientPhone}</p>
                <p><strong>Reason:</strong> ${apt.reason}</p>
                ${apt.notes ? `<p><strong>Notes:</strong> ${apt.notes}</p>` : ''}
                <small class="text-muted">Booked on: ${new Date(apt.created_at).toLocaleString()}</small>
            </div>
        `;
    }).join('');
}

// Handle appointment form submission
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');

    // Initialize appointments page
    initAppointments();

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(appointmentForm);
            const data = {
                patientName: formData.get('patientName'),
                patientEmail: formData.get('patientEmail'),
                patientPhone: formData.get('patientPhone'),
                doctor: formData.get('doctor'),
                appointmentDate: formData.get('appointmentDate'),
                appointmentTime: formData.get('appointmentTime'),
                reason: formData.get('reason'),
                notes: formData.get('notes') || ''
            };

            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Booking...';

            try {
                const response = await fetch(`${API_BASE}/appointments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    showAlert('Appointment booked successfully!', 'success');
                    appointmentForm.reset();
                    
                    // Reload appointments list
                    const user = await checkSession();
                    if (user) {
                        await loadAppointments(user.email);
                    }
                    
                    // Scroll to appointments list
                    setTimeout(() => {
                        document.getElementById('appointmentsList')?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                } else {
                    showAlert(result.error || 'Failed to book appointment. Please try again.', 'danger');
                }
            } catch (error) {
                console.error('Appointment booking error:', error);
                showAlert('Connection error. Please check if the server is running.', 'danger');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});

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
