# 🛍️ LuxeCart — Fashion Shopping App

A full-stack fashion e-commerce web application built with **React** and **Material UI**. Supports buyer and seller roles, cart management, product listings, and user authentication.

---

## 🔍 Project Overview

LuxeCart is a feature-rich shopping platform where:
- **Buyers** can browse products, manage a cart, and place orders
- **Sellers** can add, edit, and delete their own products via a dashboard

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| UI Library | Material UI (MUI) v5 |
| Animations | Framer Motion |
| HTTP Client | Axios |
| Auth | JWT (stored in localStorage) |
| State Management | React Context API |
| Backend (expected) | Node.js / Express at `localhost:5000` |

---

## 📁 Project Structure

```
src/
├── components/
│   └── Navbar.js           # Responsive navbar with cart badge, mobile drawer
├── context/
│   ├── AuthContext.js      # Auth state: login, logout, user
│   └── CartContext.js      # Cart state: add, remove, update, total
├── pages/
│   ├── Home.js             # Hero section + featured products
│   ├── Login.js            # Login form with JWT auth
│   ├── Register.js         # Register with buyer/seller role selection
│   ├── ProductList.js      # Browsable product grid with filters
│   ├── ProductDetail.js    # Individual product page with size/color picker
│   ├── Cart.js             # Cart with quantity controls + order summary
│   ├── Dashboard.js        # Role-based dashboard (buyer orders / seller products)
│   ├── Profile.js          # User profile page
│   ├── AddProduct.js       # Seller: add new product with image upload
│   └── MyProducts.js       # Seller: manage their own products
└── App.js                  # Routes + MUI Theme
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 16+
- A running backend at `http://localhost:5000` (see Backend API section)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/luxecart.git
cd luxecart

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and set REACT_APP_API_URL

# 4. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔌 Backend API

This frontend expects a REST API running at `http://localhost:5000` with the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add a product (seller only) |
| GET | `/api/products/my-products` | Get seller's own products |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/orders` | Get buyer's orders |

All protected routes require: `Authorization: Bearer <token>`

---

## 👥 User Roles

| Role | Capabilities |
|---|---|
| **Buyer** | Browse products, add to cart, place orders, view order history |
| **Seller** | All buyer features + add/edit/delete own products |

---

## 📦 Available Scripts

```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

---

## 🔧 Known Limitations / TODO

- [ ] Checkout & payment flow not implemented
- [ ] Edit product page (`/edit-product/:id`) not yet built
- [ ] Forgot password page not yet implemented
- [ ] Search bar is UI-only (not wired to API)
- [ ] Favorites/wishlist is UI-only (not persisted)
- [ ] Dark mode toggle in navbar is UI-only

---

## 📄 License

This project is for educational and portfolio purposes.
