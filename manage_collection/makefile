generate_metadata_files:
	PYTHONPATH=.. python generate_metadata.py

remove_json_files:
	. .env; find "$$MEDIA_DIR" -type f -name '*.json' -print0 | grep -z -v files.json | xargs -0 rm --
