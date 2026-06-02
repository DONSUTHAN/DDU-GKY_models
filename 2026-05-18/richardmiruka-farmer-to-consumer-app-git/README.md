# Farmer to Consumer MERN App

A full-stack marketplace that connects farmers directly with consumers. Farmers can list fresh produce, consumers can browse available products, add items to a cart, and place orders.

## Stack

- Frontend: React, Vite, Axios, React Router
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Auth: JWT with farmer, consumer, and admin roles

## Features

- Register/login as farmer or consumer
- Farmer dashboard for creating and managing products
- Product marketplace with category search and pagination-ready API
- Consumer cart and checkout flow
- Order history and farmer order visibility
- Central Express error handling and request validation

## Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
frontend/
  src/
    api/
    components/
    context/
    pages/
```

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Update `backend/.env` with your `MONGO_URL` connection string and JWT secret.

4. Run both apps:

```bash
npm run dev
```

The API runs on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## Useful API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/products`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/my-orders`
- `GET /api/orders/farmer-orders`
