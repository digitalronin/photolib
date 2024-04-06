# Photo Library

Web application to display and manage a collection of photos and videos.

* [Principles](README.md#principles)
* [Desired Features](README.md#desired-features)
  * [Edit metadata](README.md#edit-metadata)
  * [Manage collection](README.md#manage-collection)
* [Developing](README.md#developing)
  * [`backend`](README.md#%60backend%60)
  * [`frontend`](README.md#%60frontend%60)
  * [`manage_collection`](README.md#%60manage_collection%60)

## Principles

- Simplicity > efficiency
- Minimise dependencies (no database until strictly necessary)
- Other peoples' code > code I have to write
- Source files remain untouched in a directory tree broken down into `year/month/day` sub-dirs
- Metadata for `foo.jpg` lives in `foo.jpg.json` in the same directory

## Desired Features

- Timeline view

Filter photos by combinations of:

- Tags
- Title substring
- Album
- Date range
- Media type (photo/video)
- Location

- Sort by date ascending/descending

- Enable user to reorganise photos (i.e. move a 'misfiled' photo to the correct directory path)

### Edit metadata

- Title
- Tags
- Date
- Location
- Add/remove from album
- Create/delete albums

### Manage collection

- Sync from other sources (i.e. smartphones)
- Detect newly-added items
- Import from an unstructured collection of images
- Don't reimport items we already have
- Detect and manage duplicates in the filetree
- Auto-detect metadata from EXIF and/or filename
- Auto-generate thumbnails
- Move new items to appropriate sub-folder
- Detect individuals from content

## Developing

- Create `.env` file based on `dotenv.example`
- Create a symlink to the `.env` file in `manage_collection`
```
cd manage_collection/
ln -s ../.env
```
- Launch the frontend and backend
```
make start
```

### `backend`

Python Flask API and media server web application.

### `frontend`

React JS web UI.

### `manage_collection`

Scripts to manage the media files collection - mainly generating initial `*.json` metadata files for any media files which don't already have them.

