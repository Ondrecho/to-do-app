# To-Do Backend (Spring Boot)

This folder contains a Spring Boot + Gradle backend for the To-Do application.

Quick start (development)

1. Open a terminal in `code/server`.
2. Run the application with Gradle:

	 Unix / macOS:

	 ./gradlew bootRun

	 Windows (PowerShell / cmd):

	 .\\gradlew.bat bootRun

The server listens on port 5001 and uses context path `/api` so it matches the client `API_URL` setting.

Developer conveniences
- H2 console: http://localhost:5001/h2-console (enabled for dev)
- Swagger UI: http://localhost:5001/swagger-ui/index.html
- OpenAPI JSON: http://localhost:5001/v3/api-docs

Configuration and environment
- Default dev datasource: H2 in-memory (configured in `application.properties`).
- JWT secret and expiration (recommended to set as environment variables):

	- `jwt.secret` (recommended: set via environment variable `JWT_SECRET` in production)
	- `jwt.expiration-ms` (token lifetime in milliseconds, default 3600000)

API endpoints (examples)

- Register:

	curl -X POST "http://localhost:5001/api/auth/register" -H "Content-Type: application/json" -d '{"username":"alice","password":"pass"}'

- Login:

	curl -X POST "http://localhost:5001/api/auth/login" -H "Content-Type: application/json" -d '{"username":"alice","password":"pass"}'

- Get tasks (authenticated):

	curl -X GET "http://localhost:5001/api/task" -H "Authorization: Bearer <token>"

- Create task (authenticated):

	curl -X POST "http://localhost:5001/api/task" -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"title":"Test","description":"Desc"}'

Notes for production
- Disable H2 console and use a production database such as Postgres. Add `application-prod.properties` and configure datasource URL, username and password.
- Supply a strong `jwt.secret` via environment variable or a secrets manager. Do not commit secrets to the repository.

Roadmap (next tasks)
- Harden authentication and session handling (refresh tokens optional).
- Add unit and integration tests (controllers and services).
- Add Dockerfile and `docker-compose.yml` (server + postgres + client) for local and CI runs.

