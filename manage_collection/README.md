# Manage Collection

Scripts to manage a media collection

## `make generate_metadata_files`

Generate `*.json` files for all media files which don't already have one. Initial metadata comes from images' EXIF data and file information.

## `make remove_json_files`

Remove all media files' corresponding `*.json` files, so that we can regenerate them from scratch. Don't do this after any metadata has been added manually.
