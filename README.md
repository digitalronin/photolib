# Photo Library

Web application to display and manage a collection of photos and videos.

# `backend`

Python Flask API and media server web application.

```
cd backend
make server
```

# `frontend`

React JS web UI.

```
cd frontend
make server
```

# `manage_collection`

Scripts to manage the media files collection - mainly generating initial `*.json` metadata files for any media files which don't already have them.

## TODO

- [ ] 
- [ ] 
- [ ] sync with phone/google photos/whatever?
- [ ] enable moving photo to different folder
- [ ] prettier timeline view
- [ ] show geo-location
- [ ] edit date
- [ ] add description
- [ ] albums (add to/remove from album, create new albums)
- [ ] allow tagging (add/remove tags, create new tags)
- [ ] setup pre-commit with code formatting
- [ ] convert HEIC files to jpgs (could be multiple jpgs per heic)
- [ ] create metadata for video files
- [ ] allow vague dates (e.g. January 2021, or "Sometime between X and Y")
- [x] next/previous function when viewing displayed images
- [x] Add links to jump to years

## Desired Features

### Gallery

- Full page display
- Click to advance to next/previous photo

Filter photos by combinations of:

- Tags
- Title substring
- Album
- Date range
- Media type (photo/video)
- Location

- Sort by date ascending/descending

### Edit metadata

- Title
- Tags
- Date
- Location
- Add/remove from album
- Create/delete albums

### Slideshow

- Nice transitions
- Shuffle or not
- Adjust speed
- Pause/Resume
- Display/hide metadata

### Manage collection

- Detect newly-added items
- Auto-detect metadata from EXIF and/or filename
- Auto-generate thumbnails
- Move new items to appropriate sub-folder
- Detect individuals from content


```heic-to-jpeg
import os
import pyheif
from PIL import Image

def convert_heic_to_jpg(heic_file, jpg_file):
    heif_image = pyheif.read(heic_file)
    image = Image.frombytes(
        heif_image.mode,
        heif_image.size,
        heif_image.data,
        "raw",
        heif_image.mode,
        heif_image.stride,
    )
    image.save(jpg_file, "JPEG")

# Directory containing HEIC files
input_directory = "/path/to/your/heic/files"

# Directory to save JPG files
output_directory = "/path/to/your/output/directory"

# Convert each HEIC file in the input directory to JPG
for filename in os.listdir(input_directory):
    if filename.endswith(".heic"):
        heic_file = os.path.join(input_directory, filename)
        jpg_file = os.path.join(output_directory, os.path.splitext(filename)[0] + ".jpg")
        convert_heic_to_jpg(heic_file, jpg_file)
```
