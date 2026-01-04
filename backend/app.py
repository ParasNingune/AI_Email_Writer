import os
import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load configuration from environment variables
GEMINI_API_URL = os.getenv('GEMINI_API_URL', 'https://generativelanguage.googleapis.com')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print(f"🚀 Flask app initialized")
print(f"🔑 API Key configured: {'Yes' if GEMINI_API_KEY else 'No'}")


def build_prompt(email_content, tone):
    """Build the prompt for email generation"""
    prompt = "Generate a professional email reply for the following email:"
    if tone and tone.strip():
        prompt += f" Use a {tone} tone."
    prompt += f"\nOriginal Email: \n{email_content}"
    return prompt


def extract_response_content(response_data):
    """Extract the text content from Gemini API response"""
    try:
        return response_data['candidates'][0]['content']['parts'][0]['text']
    except (KeyError, IndexError) as e:
        raise ValueError(f"Failed to extract response content: {str(e)}")


def generate_email_reply(email_content, tone):
    """Generate email reply using Gemini API"""
    prompt = build_prompt(email_content, tone)
    
    # Prepare request body according to Gemini API format
    request_body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }
    
    # Send request to Gemini API
    url = f"{GEMINI_API_URL}/v1beta/models/gemini-2.5-flash:generateContent"
    headers = {
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers, json=request_body)
    response.raise_for_status()
    
    # Extract and return response content
    return extract_response_content(response.json())


@app.route('/api/email/generate', methods=['POST'])
def generate_email():
    """API endpoint to generate email reply"""
    try:
        data = request.get_json()
        
        if not data or 'emailContent' not in data:
            return jsonify({'error': 'emailContent is required'}), 400
        
        email_content = data.get('emailContent')
        tone = data.get('tone', '')
        
        # Generate email reply
        reply = generate_email_reply(email_content, tone)
        
        return jsonify(reply), 200
    
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {str(e)}")
        return jsonify({'error': f'API request failed: {str(e)}'}), 500
    except ValueError as e:
        print(f"Response parsing failed: {str(e)}")
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'email-writer-python'}), 200


if __name__ == '__main__':
    if not GEMINI_API_KEY:
        print("Warning: GEMINI_API_KEY environment variable is not set!")
    
    # Run the Flask app
    port = int(os.getenv('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
