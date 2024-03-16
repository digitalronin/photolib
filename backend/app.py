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

@app.route("/")
def root():
    return "<h1>Hello world</h1>"

if __name__ == "__main__":
    app.run(debug=True)
