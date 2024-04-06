# Launch the frontend and backend server processes in a new tmux window
start:
	tmux new-window
	# Split the window vertically into two panes and run shell commands
	tmux send-keys 'cd frontend; make server' C-m
	tmux split-window -h
	tmux send-keys 'cd backend; make server' C-m


install-dependencies:
	npm install
	pip install -r requirements.txt
	pip install -r requirements-dev.txt


format-code:
	npx eslint --fix frontend
	npx prettier --write frontend  # TODO eslint should be doing this automatically, but it isn't
	black backend
