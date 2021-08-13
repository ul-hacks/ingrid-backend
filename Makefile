
# build command
build:
	docker build -t ulhacks/ingrid-backend-rust:latest -f Dockerfile-rust .
	docker build -t ulhacks/ingrid-backend-go:latest -f Dockerfile-golang .

# compose command
run:
	docker-compose up