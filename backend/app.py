# type: ignore
import binascii
import json
import os
import sys
from datetime import datetime
from PIL import Image
import logging


from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from settings import get_settings
from utils import hex_to_file_path, read_json_file

app = Flask(__name__)

app.logger.setLevel(logging.INFO)
stream_handler = logging.StreamHandler(sys.stderr)
stream_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
stream_handler.setFormatter(formatter)
app.logger.addHandler(stream_handler)

cors = CORS(app, origins=["http://localhost:3000", "http://192.168.50.188:3000"])

THUMBNAIL_HEIGHT = 150


def _data_from_hex(hex_string):
    filepath = hex_to_file_path(hex_string)
    return read_json_file(f"{filepath}.json")


@app.route("/image/<hex_string>")
def serve_image(hex_string):
    data = _data_from_hex(hex_string)
    filepath = data["filepath"]
    app.logger.info(f"image: {filepath}")
    return send_file(filepath, mimetype=data["mimetype"])


@app.route("/thumbnail/<hex_string>")
def serve_thumbnail(hex_string):
    cache_dir = get_settings().thumbnail_cache_dir
    thumbnail_path = os.path.join(cache_dir, f"{hex_string}.jpg")
    if not os.path.exists(thumbnail_path):
        data = _data_from_hex(hex_string)
        original_image = Image.open(data["filepath"])
        height = THUMBNAIL_HEIGHT
        width = height * (data["width"] / data["height"])
        thumbnail_size = (height, width)  # Adjust as needed
        thumbnail = original_image.copy()
        thumbnail.thumbnail(thumbnail_size)
        thumbnail.save(thumbnail_path, format="JPEG")
    return send_file(thumbnail_path, mimetype="image/jpeg")


## API functions


@app.route("/api/images", methods=["GET"])
def get_images_metadata():
    config = get_settings()
    files = _fetch_json_files(config.media_dir)
    data = [json.load(open(file, "r")) for file in files]
    items_by_datetime = sorted(data, key=lambda x: f"{x['datetime']}{x['filepath']}")
    return {"items": items_by_datetime}


@app.route("/")
def root():
    return "<h1>Hello world</h1>"


def _fetch_json_files(root_dir):
    json_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".json"):
                json_files.append(os.path.join(root, file))
    json_files.remove(f"{root_dir}/files.json")  # Nothing to do with this project
    return json_files


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
