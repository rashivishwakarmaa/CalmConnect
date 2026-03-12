from flask import Flask, request, jsonify, session
from flask_cors import CORS
import google.generativeai as genai
import os
import json
import hashlib
import uuid
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
_api_key = os.getenv("GOOGLE_API_KEY")
if _api_key:
    genai.configure(api_key=_api_key)
    model = genai.GenerativeModel("gemini-2.5-flash")
else:
    model = None

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
USERS_FILE = DATA_DIR / "users.json"
APPOINTMENTS_FILE = DATA_DIR / "appointments.json"

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "calmconnect-dev-secret-key")
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176",
    "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5175", "http://127.0.0.1:5176",
    "http://localhost:3000", "http://127.0.0.1:3000",
])


def load_json(path, default):
    if path.exists():
        with open(path, "r") as f:
            return json.load(f)
    return default


def save_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2)


def hash_password(pw):
    return hashlib.sha256(pw.encode()).hexdigest()


def ensure_demo_user():
    """Create demo user if no users exist."""
    users = load_json(USERS_FILE, [])
    if not users:
        users.append({
            "id": str(uuid.uuid4()),
            "name": "Demo User",
            "email": "demo@calmconnect.com",
            "password_hash": hash_password("demo123"),
        })
        save_json(USERS_FILE, users)


ensure_demo_user()


# API: Session
@app.route("/api/session", methods=["GET"])
def api_session():
    user = session.get("user")
    if user:
        return jsonify({"authenticated": True, "user": user})
    return jsonify({"authenticated": False})


# API: Register
@app.route("/api/register", methods=["POST"])
def api_register():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    users = load_json(USERS_FILE, [])
    if any(u["email"] == email for u in users):
        return jsonify({"error": "Email already registered"}), 400

    users.append({
        "id": str(uuid.uuid4()),
        "name": name,
        "email": email,
        "password_hash": hash_password(password),
    })
    save_json(USERS_FILE, users)
    return jsonify({"message": "Registration successful"})


# API: Login
@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    users = load_json(USERS_FILE, [])
    pw_hash = hash_password(password)
    user = next((u for u in users if u["email"] == email and u["password_hash"] == pw_hash), None)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    session["user"] = {"id": user["id"], "name": user["name"], "email": user["email"]}
    return jsonify({"user": session["user"]})


# API: Logout
@app.route("/api/logout", methods=["POST"])
def api_logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out"})


# API: Appointments - GET
@app.route("/api/appointments", methods=["GET"])
def api_appointments_get():
    user = session.get("user")
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    appointments = load_json(APPOINTMENTS_FILE, [])
    user_appointments = [a for a in appointments if a.get("patientEmail", "").lower() == user["email"].lower()]
    return jsonify({"appointments": user_appointments})


# API: Appointments - POST
@app.route("/api/appointments", methods=["POST"])
def api_appointments_post():
    user = session.get("user")
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json() or {}
    required = ["patientName", "patientEmail", "patientPhone", "doctor", "appointmentDate", "appointmentTime", "reason"]
    for k in required:
        if not data.get(k):
            return jsonify({"error": f"Missing required field: {k}"}), 400

    appointments = load_json(APPOINTMENTS_FILE, [])
    apt = {
        "id": str(uuid.uuid4()),
        "patientName": data["patientName"],
        "patientEmail": data["patientEmail"],
        "patientPhone": data["patientPhone"],
        "doctor": data["doctor"],
        "appointmentDate": data["appointmentDate"],
        "appointmentTime": data["appointmentTime"],
        "reason": data["reason"],
        "notes": data.get("notes", ""),
        "status": "pending",
        "created_at": str(Path(__file__).resolve()),  # placeholder - we'll use datetime
    }
    try:
        from datetime import datetime
        apt["created_at"] = datetime.utcnow().isoformat()
    except Exception:
        pass
    appointments.append(apt)
    save_json(APPOINTMENTS_FILE, appointments)
    return jsonify({"message": "Appointment booked", "appointment": apt})


def _fallback_reply(user_input):
    """Return a supportive fallback when the AI model is unavailable."""
    msg = (user_input or "").lower()
    if any(w in msg for w in ["sad", "depressed", "down", "unhappy"]):
        return "I'm sorry you're feeling this way. It takes courage to share that. Remember, you're not alone—consider reaching out to someone you trust or one of our specialists from the Contact page. Would you like to talk more?"
    if any(w in msg for w in ["anxious", "anxiety", "worried", "stress"]):
        return "Anxiety can feel overwhelming. Try taking a few slow, deep breaths. Many find the breathing exercises on our Exercises page helpful. If this persists, speaking with a professional can make a real difference."
    if any(w in msg for w in ["help", "emergency", "suicide", "hurt", "danger"]):
        return "Your safety matters. Please reach out immediately: consider calling a helpline or visiting the nearest emergency room. You can also contact one of our specialists from the Contact page."
    if any(w in msg for w in ["hello", "hi", "hey"]):
        return "Hello! I'm here to listen. How are you feeling today?"
    return "Thanks for reaching out. I'm here to support you. If you'd like more personalized help, our specialists on the Contact page are available. How are you feeling right now?"


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    user_input = (data.get("message") or "").strip()

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    if model:
        prompt_parts = [
            "You are CalmChat, a friendly, non-judgmental mental health support chatbot. ",
            "You are not a doctor, but you offer kind, thoughtful, and supportive responses. ",
            "If someone expresses being in danger, advise them to seek help immediately.\n\n",
            f"User: {user_input}\nCalmChat:",
        ]
        try:
            response = model.generate_content(prompt_parts)
            reply = (response.text or "").strip()
            if reply:
                return jsonify({"reply": reply})
        except Exception:
            pass

    reply = _fallback_reply(user_input)
    return jsonify({"reply": reply})


@app.route("/")
def index():
    return jsonify({
        "message": "CalmConnect API",
        "docs": "Frontend runs at http://localhost:5174 (npm run dev)"
    })


if __name__ == "__main__":
    app.run(
        port=5000, debug=True
    )  # It's helpful to run with debug=True during development
