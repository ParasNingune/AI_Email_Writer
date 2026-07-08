# AI Email Writer

AI Email Writer is a full-stack app that generates email replies with Google Gemini.

## What’s Included

- **Backend**: Flask API (`/backend`) for reply generation
- **Frontend**: React + Vite web UI (`/frontend`)
- **Extension**: Chrome extension for Gmail (`/extension`)

## Tech Stack

- Python 3.11, Flask, Requests
- React 19, Vite, Material UI, Axios
- Chrome Extension (Manifest v3)
- Google Gemini API

## Project Structure

```text
AI_Email_Writer/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env.example
└── extension/
    ├── manifest.json
    ├── content.js
    └── content.css
```

## Prerequisites

- Python 3.11+
- Node.js 18+
- Gemini API key: https://makersuite.google.com/app/apikey

## Local Setup

### 1) Start Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
```

Set your key in `backend/.env`:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

Run the API:

```bash
python app.py
```

Backend runs on `http://localhost:8080`.

### 2) Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Endpoint

### `POST /api/email/generate`

Request:

```json
{
  "emailContent": "Original email content",
  "tone": "Professional"
}
```

Response: plain text generated reply.

## Chrome Extension Setup (Optional)

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `extension/` folder
5. Open Gmail and start composing/replying

## Notes

- `frontend/src/App.jsx` currently calls a deployed backend URL directly.
- `extension/content.js` also calls the deployed backend URL directly.
- If you want both to use local backend, update those URLs to `http://localhost:8080/api/email/generate`.

## Useful Commands

### Frontend

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

### Backend (production-style local run)

```bash
gunicorn --bind 0.0.0.0:8080 --workers 4 app:app
```
