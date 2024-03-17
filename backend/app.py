# type: ignore
import binascii
import json
import os
from datetime import datetime
from PIL import Image
import io


from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from settings import get_settings
from utils import hex_to_file_path, read_json_file

app = Flask(__name__)
cors = CORS(app, origins=["http://localhost:3000", "http://192.168.50.188:3000"])


def _data_from_hex(hex_string):
    filepath = hex_to_file_path(hex_string)
    return read_json_file(f"{filepath}.json")


@app.route("/image/<hex_string>")
def serve_image(hex_string):
    data = _data_from_hex(hex_string)
    filepath = data["filepath"]
    return send_file(filepath, mimetype=data["mimetype"])


@app.route("/thumbnail/<hex_string>")
def serve_thumbnail(hex_string):
    cache_dir = get_settings().thumbnail_cache_dir
    thumbnail_path = os.path.join(cache_dir, f"{hex_string}.jpg")
    if not os.path.exists(thumbnail_path):
        data = _data_from_hex(hex_string)
        original_image = Image.open(data["filepath"])
        thumbnail_size = (100, 100)  # Adjust as needed
        thumbnail = original_image.copy()
        thumbnail.thumbnail(thumbnail_size)
        thumbnail.save(thumbnail_path, format='JPEG')
    return send_file(thumbnail_path, mimetype='image/jpeg')


## API functions

@app.route("/api/images", methods=["GET"])
def get_images_metadata():
    config = get_settings()
    files = _fetch_json_files(config.media_dir)
    data = [json.load(open(file, 'r')) for file in files[0:25]]
    return {"items": data}


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
    app.run(debug=True, host='0.0.0.0')
