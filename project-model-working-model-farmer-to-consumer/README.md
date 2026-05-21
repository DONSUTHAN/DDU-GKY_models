# The Farm Vegi MERN App

The Farm Vegi is a React + Express + Mongoose farmer-to-consumer marketplace. Farmers can add fresh produce, consumers can browse products, place orders, and leave reviews.

## Project Structure

- `backend/config/db.js` - MongoDB connection using CommonJS `require`.
- `backend/controller` - User, product, order, and review controller functions.
- `backend/Models` - Mongoose models for users, products, orders, and reviews.
- `backend/Routes` - Express route files for auth, products, orders, and reviews.
- `backend/server.js` - Main Express server file.
- `frontend/src/components` - Navbar, Hero, Footer, and ProductCard components.
- `frontend/src/pages` - Home, Login, Register, and Dashboard pages.
- `frontend/src/api/api.js` - Frontend API functions for calling the backend.
- `reference-repo` - The original Flask reference repository cloned for comparison.

## Run Locally

1. Install dependencies:

```bash
npm run install:all
```

2. Create backend environment file:

```bash
copy backend\.env.example backend\.env
```

3. Update `backend\.env` with your MongoDB connection string and JWT secret.

4. Start both frontend and backend:

```bash
npm.cmd run dev
```

The API runs on `http://localhost:3000` and the React app runs on `http://localhost:5173`.

## Main API Routes

- `POST /api/auth/register` - Register a farmer or consumer.
- `POST /api/auth/login` - Login and receive a JWT token.
- `GET /api/products` - Browse products with pagination and search.
- `POST /api/products` - Farmer creates a product.
- `POST /api/orders` - Consumer places an order.
- `GET /api/orders/my-orders` - View the logged-in user's orders.
- `POST /api/reviews` - Add a review for a product.

## Where To Update Contact Details

- Home contact section: `frontend/src/pages/Home/Home.jsx`
- Footer contact details: `frontend/src/components/Footer/Footer.jsx`



dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.468.0"
