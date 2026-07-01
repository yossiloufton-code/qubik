# Vue Assignment Frontend

Vue 3 + TypeScript frontend for the mini e-commerce home assignment.

## Stack

- Vue 3
- Composition API
- TypeScript
- Vue Router
- Pinia
- Tailwind CSS
- Vitest

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Default app URL:

```bash
http://localhost:5173
```

Expected backend URL:

```bash
http://localhost:3000/api
```

## Pages

```bash
/products
/products/:id
/cart
/not-found
```

## Architecture

```text
src/
  app/router
  components
  composables
  pages
  services
  stores
  types
  utils
```

Pages orchestrate data and layout. Components render UI. Composables manage page-level async logic. Services own API calls. Pinia owns global cart state.

## Notes

- Product filtering and sorting are server-side.
- Cart state is global through Pinia.
- Cart actions call the backend mock cart API.
- The app includes loading states, empty states, error states, 404 handling, and a cart store test.
