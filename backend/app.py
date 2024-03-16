# type: ignore
import binascii
import json
import os
from datetime import datetime

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from settings import get_settings

app = Flask(__name__)
cors = CORS(app, origins=["http://localhost:3000"])

@app.route("/api/images", methods=["GET"])
def get_images_metadata():
    config = get_settings()
    files = _fetch_json_files(config.media_dir)
    data = [json.load(open(file, 'r')) for file in files[0:5]]
    return data


@app.route("/")
def root():
    return "<h1>Hello world</h1>"


def _fetch_json_files(root_dir):
    json_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.json'):
                json_files.append(os.path.join(root, file))
    json_files.remove(f"{root_dir}/files.json")  # Nothing to do with this project
    return json_files


if __name__ == "__main__":
    app.run(debug=True)
