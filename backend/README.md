# Vue Assignment Backend

Node.js + Express + TypeScript backend for the Vue 3 mini e-commerce home assignment.

## Stack

- Node.js
- Express
- TypeScript
- Winston
- CORS
- Helmet
- Zod
- In-memory mock data

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

## Main endpoints

```bash
GET    /health
GET    /api/products
GET    /api/products/:id
GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:productId
DELETE /api/cart/items/:productId
DELETE /api/cart
POST   /api/cart/checkout
```

## Product filtering and sorting

Filtering and sorting are implemented server-side.

Examples:

```bash
GET /api/products?name=course
GET /api/products?category=ebook
GET /api/products?sortBy=price&sortOrder=asc
GET /api/products?name=vue&category=online-course&sortBy=name&sortOrder=desc
```

## Architecture

```text
src/
  app.ts
  server.ts
  config/
  errors/
  middleware/
  modules/
    cart/
    products/
  routes/
  types/
  utils/
```

Routes stay thin. Controllers handle HTTP request/response. Services own business logic. Middleware owns cross-cutting concerns.
