# Quick Start Guide

## Prerequisites
- Python 3.11+
- Node.js 18+
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Setup (5 minutes)

### Step 1: Start the Backend

```bash
# Navigate to backend directory
cd Backend/python-backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here

# Start the server
python app.py
```

Backend will be running at `http://localhost:8080` ✅

### Step 2: Start the Frontend

Open a new terminal:

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be running at `http://localhost:5173` ✅

### Step 3: Test the Application

1. Open your browser and go to `http://localhost:5173`
2. Enter an email content in the text area
3. Select a tone (optional)
4. Click "Generate Reply"
5. The AI will generate a professional email reply!

### Step 4: Install Chrome Extension (Optional)

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer Mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `Extension/` folder
5. Make sure to update the `API_URL` in `Extension/content.js` to `http://localhost:8080`
6. Open Gmail and compose a reply - you'll see the "AI Reply" button!

## 🔧 Configuration

### Backend Configuration
Edit `Backend/python-backend/.env`:
```env
GEMINI_API_URL=https://generativelanguage.googleapis.com
GEMINI_API_KEY=your_actual_api_key_here
PORT=8080
```

### Frontend Configuration
Edit `Frontend/.env`:
```env
VITE_API_URL=http://localhost:8080
```

### Extension Configuration
Edit `Extension/content.js` line 55:
```javascript
const API_URL = 'http://localhost:8080';
```

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'flask'`
```bash
pip install -r requirements.txt
```

**Problem:** `API Key not configured`
- Make sure you've created the `.env` file
- Check that `GEMINI_API_KEY` is set correctly

**Problem:** Port 8080 already in use
```bash
# Use a different port
PORT=8081 python app.py
```

### Frontend Issues

**Problem:** Cannot connect to backend
- Make sure backend is running on port 8080
- Check `Frontend/.env` has correct `VITE_API_URL`
- Restart the frontend dev server after changing `.env`

**Problem:** CORS errors
- The Python backend has CORS enabled by default
- Make sure you're using the correct backend URL

### Extension Issues

**Problem:** "AI Reply" button doesn't appear
- Make sure the extension is loaded and enabled
- Check that you're on a Gmail compose window
- Open DevTools Console to check for errors

**Problem:** API request fails from extension
- Update the `API_URL` in `content.js`
- Check that backend is running and accessible


## ✅ Success!

You should now have:
- ✅ Backend running on http://localhost:8080
- ✅ Frontend running on http://localhost:5173
- ✅ Chrome extension working in Gmail

Enjoy your AI Email Writer! 🎉
