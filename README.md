# CalmConnect - Mental Health Support Platform

A comprehensive web application for mental health support, featuring a chatbot, appointment booking system, and user authentication.

## Features

- 🏠 **Responsive Frontend** - Beautiful, modern UI with Bootstrap
- 💬 **AI Chatbot** - Mental health support chatbot powered by Google Gemini AI
- 🔐 **User Authentication** - Secure login and registration system
- 📅 **Appointment Booking** - Book appointments with mental health specialists
- 🎨 **Modern Design** - Professional, calming interface

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. **Clone or navigate to the project directory**

2. **Install Python dependencies:**
   ```bash
   pip install flask flask-cors google-generativeai python-dotenv
   ```
   
   Or install from requirements.txt:
   ```bash
   cd CalmChat/calmchat.backend
   pip install -r requirements.txt
   ```

3. **Optional - Configure Google AI (for chatbot):**
   
   Create a `.env` file in `CalmChat/calmchat.backend/` directory:
   ```
   GOOGLE_API_KEY=your_api_key_here
   SECRET_KEY=your_secret_key_here
   ```
   
   Note: The application works without the Google API key, but the chatbot feature will be disabled.

## Running the Application

### Option 1: Using the startup script (Windows)
- Double-click `start_server.bat` or `start_server.ps1`

### Option 2: Manual start
```bash
cd CalmChat/calmchat.backend
python app.py
```

### Option 3: PowerShell script
```powershell
.\start_server.ps1
```

The server will start on **http://localhost:5000**

## Access the Application

Once the server is running, open your browser and navigate to:

- **Homepage:** http://localhost:5000
- **Login/Register:** http://localhost:5000/login.html
- **Appointments:** http://localhost:5000/appointments.html
- **About:** http://localhost:5000/about.html
- **Contact:** http://localhost:5000/contact.html

## Project Structure

```
CalmConnect/
├── frontend/                 # Frontend HTML/CSS/JS files
│   ├── index.html           # Homepage
│   ├── login.html           # Login/Registration page
│   ├── appointments.html    # Appointment booking page
│   ├── auth.js              # Authentication JavaScript
│   ├── appointments.js      # Appointment management JavaScript
│   └── chatbot.js           # Chatbot integration
│
├── CalmChat/
│   └── calmchat.backend/    # Backend Flask application
│       ├── app.py           # Main Flask application
│       ├── requirements.txt # Python dependencies
│       └── data/            # Data storage (auto-created)
│           ├── users.json   # User accounts
│           └── appointments.json  # Appointments
│
└── start_server.bat         # Windows startup script
```

## Features Details

### 1. Chatbot
- AI-powered mental health support
- Available on all pages via floating button
- Requires Google API key for full functionality

### 2. User Authentication
- Secure registration and login
- Session-based authentication
- Password hashing with SHA-256

### 3. Appointment Booking
- Book appointments with registered doctors
- View appointment history
- Date and time selection
- Status tracking

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/session` - Check session status

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get user's appointments
- `GET /api/appointments/<id>` - Get specific appointment

### Chat
- `POST /chat` - Send message to chatbot

## Troubleshooting

### Server won't start
1. Ensure Python is installed: `python --version`
2. Install dependencies: `pip install flask flask-cors google-generativeai python-dotenv`
3. Check if port 5000 is available

### Chatbot not working
- The chatbot works without API key but shows a message
- To enable AI chatbot, add `GOOGLE_API_KEY` to `.env` file

### Static files not loading
- Ensure you're accessing via `http://localhost:5000` (not file://)
- Check browser console for errors

## Development

The server runs in debug mode, so code changes will auto-reload.

## Security Notes

- Change `SECRET_KEY` in production
- Use HTTPS in production
- Consider migrating to a proper database (SQLite/PostgreSQL)
- Implement rate limiting for API endpoints

## License

This project is for educational/development purposes.

## Support

For issues or questions, check the application or contact support through the Contact page.
