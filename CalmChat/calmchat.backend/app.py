from flask import (
    Flask,
    request,
    jsonify,
    render_template,
)  # Import render_template if needed
from flask_cors import CORS
import google.generativeai as genai
import os 
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return (
        "Welcome to CalmChat!"  # You can return simple text or render an HTML template
    )


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    prompt_parts = [
        "You are CalmChat, a friendly, non-judgmental mental health support chatbot. ",
        "You are not a doctor, but you offer kind, thoughtful, and supportive responses. ",
        "If someone expresses being in danger, advise them to seek help immediately.\n\n",
        f"User: {user_input}\nCalmChat:",
    ]

    try:
        response = model.generate_content(prompt_parts)
        reply = response.text.strip()
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(
        port=5000, debug=True
    )  # It's helpful to run with debug=True during development
