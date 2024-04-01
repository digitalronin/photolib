format-code:
	npx eslint --fix frontend
	npx prettier --write frontend  # TODO eslint should be doing this automatically, but it isn't
	black backend
