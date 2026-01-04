📧 AI Email Writer

An AI-powered email writing assistant built with Python Flask, React, and a custom Chrome Extension, designed to generate intelligent email replies with personalized tones using Google's Gemini API.

**🚀 Features**

✨ AI-Powered Drafting – Automates up to 70% of repetitive email writing using Google Gemini AI.

🎭 Tone Customization – Generates replies with different tones (professional, friendly, casual, etc.) for improved personalization.

🤖 Gemini AI Integration – Uses Google's Gemini API for intelligent email generation.

🌐 Full-Stack Architecture – Python Flask backend, React frontend, and Chrome Extension for real-time use.

🐳 Containerized Deployment – Backend containerized with Docker for easy deployment.

**🛠️ Tech Stack**

Frontend: React, Material-UI, Vite

Backend: Python, Flask, Flask-CORS, Requests

Extension: Custom Chrome Extension (Vanilla JavaScript)

APIs: Google Gemini API for AI-powered email generation

DevOps: Docker, GitHub





**⚙️ Installation & Setup**

1️⃣ **Clone the repository**

```bash
git clone https://github.com/ParasNingune/AI-Email-Writer.git
cd AI-Email-Writer
```

2️⃣ **Backend (Python Flask)**

```bash
cd Backend/python-backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

**Environment Variables:**
- `GEMINI_API_URL` = `https://generativelanguage.googleapis.com`
- `GEMINI_API_KEY` = Your Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
- `PORT` = `8080` (optional, defaults to 8080)

**Run the backend:**
```bash
# Development mode
python app.py
```
3️⃣ **Frontend (React + Vite)**

```bash
cd Frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env if needed (defaults to http://localhost:8080)

# Run development server
npm run dev
```

The frontend will start on `http://localhost:5173`

4️⃣ **Chrome Extension**

1. Navigate to `chrome://extensions/` in your browser
2. Enable **Developer Mode** (top right toggle)
3. Click **Load Unpacked**
4. Select the `Extension/` folder
5. Update the `API_URL` in `Extension/content.js` to match your backend URL

**🌍 Deployment**

- **Frontend**: Can be deployed to Vercel, Netlify, or any static hosting
- **Backend**: Can be deployed to Render, Railway, Heroku, or any platform supporting Python
- **Extension**: Chrome Web Store (for production) or Developer Mode (for testing)
