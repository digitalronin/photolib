"""
Traverse the MEDIA_DIR directory tree and generate a stub .json
metadata file for any image/video files which don't already have
one.
"""

import os
import re
from datetime import datetime
import mimetypes
import json
import logging
from PIL import Image
from PIL.ExifTags import TAGS
from backend.settings import get_settings

config = get_settings()
logger = logging.getLogger(__name__)

def main():
    _generate_image_metadata()


def _generate_image_metadata():
    all_files = _get_media_filenames(config.media_dir, config.image_suffixes)
    for file in all_files:
        _ensure_metadata_file_exists(file)

def _ensure_metadata_file_exists(filepath: str):
    json_file = filepath + ".json"
    if not os.path.isfile(json_file):
        _create_metadata_file(filepath)


def _create_metadata_file(filepath: str):
    json_file = filepath + ".json"
    logger.info(json_file)
    exif_data = _get_exif_data(filepath)

    data = {
            "filepath": filepath,
            "datetime": exif_data.get("DateTime"),
            "orientation": exif_data.get("Orientation"),
            "subject_location": exif_data.get("SubjectLocation"),
            "width": exif_data.get("ExifImageWidth"),
            "height": exif_data.get("ExifImageHeight"),
            "latitude": exif_data.get("latitude"),
            "longitude": exif_data.get("longitude"),
            "mimetype": _get_image_mimetype(filepath),
            }

    if data["datetime"] is None:
        data["datetime"] = _guess_datetime_from_filepath(filepath)

    with open(json_file, "w") as file:
        file.write(json.dumps(data))


def _get_image_mimetype(image_path):
    return mimetypes.guess_type(image_path)[0]


def _get_exif_data(image_path):
    try:
        with Image.open(image_path) as img:
            exif_info = {}
            exif_data = img._getexif()
            if exif_data is None:
                exif_info = {
                        "ExifImageWidth": img.width,
                        "ExifImageHeight": img.height,
                        }
            else:
                for tag, value in exif_data.items():
                    tag_name = TAGS.get(tag, tag)
                    exif_info[tag_name] = value
                if "GPSInfo" in exif_info:
                    latitude, longitude = _convert_gps_coordinates(exif_info["GPSInfo"])
                    exif_info["latitude"] = latitude
                    exif_info["longitude"] = longitude
            return exif_info
    except Exception as e:
        print("Error:", e)
        return None


def _convert_gps_coordinates(gps_info):
    latitude_ref = gps_info.get(1, 'N')
    latitude = gps_info.get(2, (0.0, 0.0, 0.0))
    longitude_ref = gps_info.get(3, 'E')
    longitude = gps_info.get(4, (0.0, 0.0, 0.0))

    latitude_decimal = latitude[0] + latitude[1] / 60 + float(latitude[2]) / 3600
    if latitude_ref == 'S':
        latitude_decimal *= -1

    longitude_decimal = longitude[0] + longitude[1] / 60 + float(longitude[2]) / 3600
    if longitude_ref == 'W':
        longitude_decimal *= -1

    return latitude_decimal, longitude_decimal


def _get_media_filenames(root: str, suffixes: list[str]) -> list[str]:
    files = []
    for dirpath, dirnames, filenames in os.walk(root):
        for suffix in suffixes:
            for filename in filenames:
                if filename.lower().endswith(suffix.lower()):
                    if not filename.startswith("._"):
                        files.append(os.path.join(dirpath, filename))
    return files


def _guess_datetime_from_filepath(file_path: str) -> str | None:
    date_pattern = r'(\d{4})/(\d{2})/(\d{2})'
    match = re.search(date_pattern, file_path)
    if match:
        year = int(match.group(1))
        month = int(match.group(2))
        day = int(match.group(3))
        dt = datetime(year, month, day)
        return dt.strftime("%Y:%m:%d %H:%M:%S")

    return None


if __name__ == "__main__":
    main()
