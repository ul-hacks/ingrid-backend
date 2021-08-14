
# build command
build:
	docker build -t ulhacks/ingrid-backend-rust:latest -f Dockerfile-rust .
	docker build -t ulhacks/ingrid-backend-go:latest -f Dockerfile-golang .
	docker build -t ulhacks/ingrid-backend-node:latest -f ./src/services/server/node/Dockerfile-node .
	docker build -t ulhacks/ingrid-backend-python:latest -f Dockerfile-python .

node-build:
	docker build -t ulhacks/ingrid-backend-node:latest -f ./src/services/server/node/Dockerfile-node .

# compose command
run:
	docker-compose -f docker-compose.yml up

storage:
	docker-compose -f docker-compose.storages.yml up -d
