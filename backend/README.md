# AI Email Writer - Python Backend

A Flask-based REST API for generating AI-powered email replies using Google's Gemini API.

## Features

- Generate professional email replies with customizable tone
- RESTful API endpoint
- CORS enabled for cross-origin requests
- Docker support
- Environment-based configuration

## Prerequisites

- Python 3.11+
- pip
- Google Gemini API key

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```
GEMINI_API_URL=https://generativelanguage.googleapis.com
GEMINI_API_KEY=your_actual_api_key_here
PORT=8080
```

### 3. Run the Application

#### Development Mode

```bash
python app.py
```

#### Production Mode with Gunicorn

```bash
gunicorn --bind 0.0.0.0:8080 --workers 4 app:app
```

The server will start on `http://localhost:8080`

## API Endpoints

### Generate Email Reply

**Endpoint:** `POST /api/email/generate`

**Request Body:**
```json
{
  "emailContent": "Your original email content here",
  "tone": "professional"
}
```

**Response:**
```json
"Generated email reply text..."
```

### Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "service": "email-writer-python"
}
```

## Docker

### Build Docker Image

```bash
docker build -t email-writer-python .
```

### Run Docker Container

```bash
docker run -p 8080:8080 \
  -e GEMINI_API_KEY=your_api_key_here \
  -e GEMINI_API_URL=https://generativelanguage.googleapis.com \
  email-writer-python
```

## Project Structure

```
python-backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker configuration
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- API request failures
- Response parsing errors
- Unexpected errors

All errors return appropriate HTTP status codes and error messages.

## Development

To run in development mode with auto-reload:

```bash
python app.py
```

The Flask development server will start with debug mode enabled.

## License

MIT
