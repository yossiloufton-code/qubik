# Qubik Digital Products Store

A small full-stack mini e-commerce application built as a Vue.js Full Stack Developer home assignment.

The platform sells a limited range of digital products such as e-books, software licenses, online courses, and templates. Users can browse products, view product details, manage a shopping cart, and complete a mock checkout.

---

## Tech Stack

### Frontend

- Vue 3
- TypeScript
- Composition API
- Vue Router
- Pinia
- PrimeVue
- Tailwind CSS
- Vite
- Vitest

### Backend

- Node.js
- Express
- TypeScript
- Winston
- CORS
- Helmet
- Zod
- In-memory mock database

### DevOps / Bonus

- Docker
- Docker Compose
- Nginx for serving the Vue production build
- Nginx reverse proxy for `/api` requests to the backend container

---

## Features

### Product List Page

The product list page allows users to browse available digital products.

Features:

- Fetches products from the backend REST API
- Displays product name
- Displays price
- Displays thumbnail image
- Displays short description
- Displays category
- Clicking a product navigates to the product details page
- Supports server-side filtering by product name
- Supports server-side filtering by category
- Supports server-side sorting by product name
- Supports server-side sorting by price
- Includes loading skeletons
- Includes empty state when no products match the filters
- Includes API error state with retry action

---

### Product Details Page

The product details page displays full information for a selected product.

Features:

- Fetches a single product by ID from the backend
- Displays product name
- Displays price
- Displays large product image
- Displays short description
- Displays long description
- Displays category
- Displays product reviews
- Includes Back to Products navigation
- Includes Add to Cart button
- Updates the global shopping cart state through Pinia
- Handles invalid product IDs gracefully

---

### Shopping Cart Page

The shopping cart page allows users to review and manage selected products.

Features:

- Displays all cart items
- Allows changing product quantities
- Allows removing products from the cart
- Displays dynamically updated total item count
- Displays dynamically updated total price
- Supports clearing the cart
- Supports mock checkout
- Shows checkout success message
- Uses Pinia for global cart state
- Calls backend cart REST endpoints

---

## Project Architecture

The project is split into two apps:

```text
qubik/
  backend/
  frontend/
  docker-compose.yml
  README.md
```

The architecture follows a clean separation of concerns.

---

## Frontend Architecture

```text
frontend/src/
  app/
    router/
      index.ts

  components/
    layout/
    products/
    cart/
    shared/

  composables/
    useApiRequest.ts
    useProducts.ts
    useProductDetails.ts

  pages/
    ProductListPage.vue
    ProductDetailsPage.vue
    ShoppingCartPage.vue
    NotFoundPage.vue

  services/
    apiClient.ts
    productService.ts
    cartService.ts

  stores/
    cart.store.ts
    cart.store.test.ts

  types/
    api.ts
    product.ts
    review.ts
    cart.ts

  utils/
    formatCurrency.ts
    formatCategory.ts
```

Frontend responsibility split:

```text
Pages       -> screen orchestration
Components  -> UI rendering
Composables -> reusable async/page logic
Services    -> API communication
Pinia Store -> global cart state
Types       -> TypeScript contracts
Utils       -> small formatting helpers
```

This follows the same idea as a React custom-hooks architecture:

```text
React custom hooks -> Vue composables
Redux/global store -> Pinia only where global state is needed
```

In this project:

- Product list state is handled by `useProducts`
- Product details state is handled by `useProductDetails`
- API loading/error behavior is handled by `useApiRequest`
- Shopping cart state is handled globally with Pinia

---

## Backend Architecture

```text
backend/src/
  app.ts
  server.ts

  config/
    env.ts
    cors.ts

  errors/
    app-error.ts
    error-codes.ts

  middleware/
    error-handler.middleware.ts
    not-found.middleware.ts
    request-logger.middleware.ts
    validate-request.middleware.ts

  modules/
    products/
      product.types.ts
      products.constants.ts
      products.validation.ts
      products.mock.ts
      products.service.ts
      products.controller.ts
      products.routes.ts

    cart/
      cart.types.ts
      cart.validation.ts
      cart.mock.ts
      cart.service.ts
      cart.controller.ts
      cart.routes.ts

  routes/
    index.ts

  types/
    api.types.ts

  utils/
    api-response.ts
    logger.ts
    async-handler.ts
```

Backend responsibility split:

```text
Routes      -> endpoint definitions
Controllers -> HTTP request/response handling
Services    -> business logic
Mock files   -> in-memory data source
Middleware   -> validation, logging, errors, 404
Config       -> environment and CORS
Utils        -> response helpers, logger, async helpers
```

Filtering and sorting are implemented on the server side inside the products service.

---

## Backend API

Local backend base URL:

```text
http://localhost:3000/api
```

Docker frontend proxy base URL:

```text
http://localhost:8080/api
```

---

## Health Check

```http
GET /health
```

Example response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-07-01T08:00:00.000Z"
  }
}
```

---

## Products API

### Get Products

```http
GET /api/products
```

Supported query parameters:

| Query Param | Type | Description |
|---|---|---|
| `name` | string | Filter by product name |
| `category` | string | Filter by category |
| `sortBy` | `name` / `price` | Sort field |
| `sortOrder` | `asc` / `desc` | Sort direction |

Examples:

```http
GET /api/products
GET /api/products?name=vue
GET /api/products?category=online-course
GET /api/products?sortBy=price&sortOrder=asc
GET /api/products?name=course&category=online-course&sortBy=name&sortOrder=desc
```

Example response:

```json
{
  "success": true,
  "data": [
    {
      "id": "prod_ebook_vue",
      "name": "Vue 3 Mastery E-book",
      "price": 29,
      "shortDescription": "A practical Vue 3 guide focused on Composition API and TypeScript.",
      "thumbnailUrl": "https://placehold.co/600x400?text=Vue+Ebook",
      "category": "ebook"
    }
  ],
  "meta": {
    "count": 1,
    "filters": {
      "name": "vue",
      "sortBy": "name",
      "sortOrder": "asc"
    }
  }
}
```

---

### Get Product Categories

```http
GET /api/products/categories
```

Example response:

```json
{
  "success": true,
  "data": [
    "ebook",
    "software-license",
    "online-course",
    "template"
  ]
}
```

---

### Get Product By ID

```http
GET /api/products/:id
```

Example:

```http
GET /api/products/prod_ebook_vue
```

Example response:

```json
{
  "success": true,
  "data": {
    "id": "prod_ebook_vue",
    "name": "Vue 3 Mastery E-book",
    "price": 29,
    "shortDescription": "A practical Vue 3 guide focused on Composition API and TypeScript.",
    "longDescription": "Learn how to build scalable Vue 3 applications using Composition API, TypeScript, Vue Router, Pinia, and clean component architecture.",
    "thumbnailUrl": "https://placehold.co/600x400?text=Vue+Ebook",
    "category": "ebook",
    "reviews": [
      {
        "id": "rev_1",
        "author": "Daniel",
        "rating": 5,
        "comment": "Clear, practical, and straight to the point.",
        "createdAt": "2026-01-10T10:00:00.000Z"
      }
    ]
  }
}
```

Invalid product example:

```http
GET /api/products/invalid-id
```

Example response:

```json
{
  "success": false,
  "error": {
    "message": "Product was not found",
    "code": "PRODUCT_NOT_FOUND"
  }
}
```

---

## Cart API

The cart API is implemented as a mock REST API using an in-memory cart.

### Get Cart

```http
GET /api/cart
```

Example response:

```json
{
  "success": true,
  "data": {
    "items": [],
    "totalItems": 0,
    "totalPrice": 0
  }
}
```

---

### Add Item To Cart

```http
POST /api/cart/items
```

Request body:

```json
{
  "productId": "prod_ebook_vue",
  "quantity": 1
}
```

Example response:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "productId": "prod_ebook_vue",
        "name": "Vue 3 Mastery E-book",
        "price": 29,
        "thumbnailUrl": "https://placehold.co/600x400?text=Vue+Ebook",
        "quantity": 1
      }
    ],
    "totalItems": 1,
    "totalPrice": 29
  }
}
```

---

### Update Cart Item Quantity

```http
PATCH /api/cart/items/:productId
```

Example:

```http
PATCH /api/cart/items/prod_ebook_vue
```

Request body:

```json
{
  "quantity": 3
}
```

---

### Remove Cart Item

```http
DELETE /api/cart/items/:productId
```

Example:

```http
DELETE /api/cart/items/prod_ebook_vue
```

---

### Clear Cart

```http
DELETE /api/cart
```

---

### Mock Checkout

```http
POST /api/cart/checkout
```

Example response:

```json
{
  "success": true,
  "data": {
    "orderId": "order_1782912345678",
    "totalItems": 2,
    "totalPrice": 58,
    "createdAt": "2026-07-01T08:00:00.000Z"
  }
}
```

After checkout, the cart is cleared.

---

## Frontend Routes

| Route | Description |
|---|---|
| `/products` | Product list page |
| `/products/:id` | Product details page |
| `/cart` | Shopping cart page |
| `/not-found` | 404 page |
| `/*` | Redirects to `/not-found` |

---

## How to Run Locally

### Prerequisites

Install:

- Node.js
- npm
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/yossiloufton-code/qubik.git
cd qubik
```

---

### 2. Run the Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/health
```

Products API:

```text
http://localhost:3000/api/products
```

---

### 3. Run the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

The frontend `.env` file should contain:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## How to Run With Docker Compose

Docker Compose runs both frontend and backend together.

### Prerequisites

Install:

- Docker Desktop
- Docker Compose

---

### Run

From the project root:

```bash
docker compose up --build
```

Open:

```text
http://localhost:8080
```

---

### Docker URLs

Frontend:

```text
http://localhost:8080
```

Backend directly:

```text
http://localhost:3000
```

Backend health check through frontend proxy:

```text
http://localhost:8080/health
```

Products API through frontend proxy:

```text
http://localhost:8080/api/products
```

---

### Stop Docker

```bash
docker compose down
```

---

### Rebuild From Scratch

```bash
docker compose down
docker compose build --no-cache
docker compose up
```

---

### Docker Flow Explanation

The frontend is served by Nginx.

In Docker, the browser cannot call an internal Docker service name like:

```text
http://backend:3000
```

Only containers can resolve that name.

So the frontend is built with:

```env
VITE_API_BASE_URL=/api
```

The browser calls:

```text
http://localhost:8080/api
```

Then Nginx proxies the request internally to:

```text
http://backend:3000/api
```

Flow:

```text
Browser
  -> http://localhost:8080
  -> Nginx frontend container
  -> /api proxy
  -> backend container on port 3000
```

---

## Environment Variables

### Backend

File:

```text
backend/.env
```

Example:

```env
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info
```

| Variable | Description |
|---|---|
| `NODE_ENV` | Application environment |
| `PORT` | Backend server port |
| `CORS_ORIGIN` | Allowed frontend origin |
| `LOG_LEVEL` | Winston log level |

---

### Frontend

File:

```text
frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL used by the Vue app |

---

## Testing

The project includes a unit test for the Pinia cart store.

Run frontend tests:

```bash
cd frontend
npm run test:run
```

The cart store test covers:

- Loading cart items
- Adding an item
- Updating totals
- Removing an item when quantity is lower than one

---

## Type Checking

### Backend

```bash
cd backend
npm run typecheck
```

### Frontend

```bash
cd frontend
npm run typecheck
```

---

## Build

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

---

## Error Handling

The app handles common error cases.

### Frontend

- API request failures
- Network failures
- Empty product list
- Product not found
- Empty cart
- Invalid application routes
- Checkout failure

### Backend

- Invalid product ID
- Invalid category
- Invalid sort field
- Invalid sort order
- Invalid cart quantity
- Missing cart item
- Checkout with empty cart
- Unknown routes

Backend errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

---

## Loading States

The frontend includes meaningful loading states:

- Product list skeleton cards
- Product details skeleton layout
- Disabled cart buttons during cart operations
- Retry action on API failure

---

## Accessibility

Accessibility-focused implementation details:

- Real button elements for actions
- Real links for navigation
- Labels for form inputs
- Alt text for product images
- Keyboard focus styles
- Keyboard-accessible navigation
- Accessible quantity buttons
- Error states displayed as readable UI messages

---

## Code Quality

The project demonstrates:

- Clean architecture
- Modular design
- Logical separation of concerns
- Clear naming conventions
- Typed API contracts
- Server-side filtering and sorting
- Centralized API client
- Centralized backend error handling
- Reusable Vue composables
- Global cart state with Pinia
- Basic unit testing

---

## Assumptions

- Product data is stored in an in-memory mock database, which is allowed by the assignment.
- Cart data is stored in memory for demo purposes.
- Cart state is also stored globally on the frontend through Pinia.
- Authentication is out of scope for this assignment.
- A real database is out of scope for this assignment.
- In a production application, the cart would be scoped by authenticated user or session.
- In a production application, product and cart data would be stored in a persistent database.
- Filtering and sorting are intentionally implemented on the backend.
- Checkout is a mock flow and does not process real payments.

---

## Future Improvements

Possible production improvements:

- Add authentication with JWT or OAuth
- Persist products and carts in PostgreSQL or MongoDB
- Scope carts by user/session
- Add pagination to product listing
- Add product search indexing
- Add checkout integration with a payment provider
- Add end-to-end tests
- Add CI pipeline
- Add deployment to Vercel, Netlify, or AWS
- Add observability and structured production logging
- Add rate limiting and API security hardening

---

## Suggested Git Commit Style

Suggested meaningful commit examples:

```bash
git commit -m "chore: initialize project structure"
git commit -m "feat: add express typescript backend foundation"
git commit -m "feat: add products api with filtering and sorting"
git commit -m "feat: add mock shopping cart api"
git commit -m "feat: add vue product browsing pages"
git commit -m "feat: add pinia shopping cart flow"
git commit -m "feat: integrate primevue components"
git commit -m "test: add cart store unit tests"
git commit -m "chore: add docker compose setup"
git commit -m "docs: add project readme"
```

---

## Summary

This project implements a complete mini e-commerce flow using Vue 3, TypeScript, Node.js, and Express.

It includes:

- Product browsing
- Product details
- Server-side filtering
- Server-side sorting
- Shopping cart management
- Mock checkout
- RESTful backend API
- Pinia global state
- PrimeVue UI components
- Tailwind responsive styling
- Loading states
- Error handling
- Unit testing
- Docker Compose setup