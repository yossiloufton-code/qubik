# Docker Compose Flow

This project can run as two containers:

- `frontend`: Vue production build served by Nginx
- `backend`: Node.js + Express API

The frontend calls the backend through `/api`.
Nginx proxies `/api` requests to the backend container.

## Run

From the project root:

```bash
docker compose up --build
```

Open:

```bash
http://localhost:8080
```

Backend health check through the frontend proxy:

```bash
http://localhost:8080/health
```

Backend direct access:

```bash
http://localhost:3000/health
```

## Stop

```bash
docker compose down
```

## Rebuild from scratch

```bash
docker compose down
docker compose build --no-cache
docker compose up
```

## Notes

For Docker, the frontend is built with:

```bash
VITE_API_BASE_URL=/api
```

This is important because the browser cannot call Docker service names like `http://backend:3000`.
Only containers can resolve `backend`.
The browser calls `http://localhost:8080/api`, and Nginx forwards it internally to `http://backend:3000/api`.
