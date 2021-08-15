from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import os
import random
import requests
import src.services.providers.python.fetch_git_data
import src.services.providers.python.fetch_lingo_data
import src.services.providers.python.fetch_lab_data


def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    @app.route('/data', methods=["GET"])
    def check():
        data = json.loads(request.get_data().decode('UTF-8'))
        extension = data["extension"]

        if extension == "github":
            return fetch_git_data.github_data(data["account"])
        elif extension == "duolingo":
            return fetch_lingo_data.duolingo_data(data["account"])
        elif extension == "gitlab":
            return fetch_lab_data.gitlab_data(data["account"])

    return app
