from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import os
import random
import requests

from src.services.providers.python.fetch_git_data import github_data

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    EXTENSIONS = {"github":github_data}
    @app.route('/data', methods = ["GET"])
    def check():
        print("hello there child")
        data = json.loads(request.get_data().decode('UTF-8'))

        return EXTENSIONS[data["extension"]](data["username"])

    return app
