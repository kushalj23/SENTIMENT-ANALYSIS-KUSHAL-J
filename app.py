'''from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS # Import CORS to handle cross-origin requests

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Load a pre-trained sentiment analysis model from Hugging Face.
# This will download the model the first time you run it.
try:
    classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    print(f"Error loading model: {e}")
    classifier = None

@app.route('/get_sentiment', methods=['POST'])
def get_sentiment():
    if not classifier:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.json
    text_to_analyze = data.get('text', '')

    if not text_to_analyze:
        return jsonify({"error": "No text provided"}), 400

    result = classifier(text_to_analyze)
    sentiment = result[0]['label']
    score = result[0]['score']

    return jsonify({"sentiment": sentiment, "score": score})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    '''
'''
from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS  # Import CORS to handle cross-origin requests
import os  # Add this for environment variables

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load a pre-trained sentiment analysis model from Hugging Face.
# This will download the model the first time you run it.
try:
    classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    print(f"Error loading model: {e}")
    classifier = None

@app.route('/get_sentiment', methods=['POST'])
def get_sentiment():
    if not classifier:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.json
    text_to_analyze = data.get('text', '')

    if not text_to_analyze:
        return jsonify({"error": "No text provided"}), 400

    result = classifier(text_to_analyze)
    sentiment = result[0]['label']
    score = result[0]['score']

    return jsonify({"sentiment": sentiment, "score": score})

if __name__ == '__main__':
    # Updated for Render: Bind to 0.0.0.0, use PORT env var, disable debug in prod
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)
    '''
from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS # Import CORS to handle cross-origin requests

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Load a pre-trained sentiment analysis model from Hugging Face.
# This will download the model the first time you run it.
try:
    classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    print(f"Error loading model: {e}")
    classifier = None

@app.route('/get_sentiment', methods=['POST'])
def get_sentiment():
    if not classifier:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.json
    text_to_analyze = data.get('text', '')

    if not text_to_analyze:
        return jsonify({"error": "No text provided"}), 400

    result = classifier(text_to_analyze)
    sentiment = result[0]['label']
    score = result[0]['score']

    return jsonify({"sentiment": sentiment, "score": score})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
