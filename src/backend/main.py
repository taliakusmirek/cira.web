# backend/main.py (Flask example)
from flask import Flask, request, jsonify
from utils.scraper import scrape_page
from utils.scorer import grade_product

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    url = request.json.get('url')
    page_data = scrape_page(url)
    scores = grade_product(page_data)
    return jsonify(scores)
