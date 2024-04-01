import json


def hex_to_file_path(hex_string):
    bytes_array = bytes.fromhex(hex_string)
    file_path = bytes_array.decode("utf-8")
    return file_path


def read_json_file(filename):
    """Reads the specified JSON file and returns its data."""
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data
