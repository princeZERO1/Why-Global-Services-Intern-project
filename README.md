# FreshCart - Full-Stack Grocery Web Application

A professional, fully-responsive grocery shopping application built using the MERN stack with modern aesthetics, animations, and clean architecture.

## 🚀 Features

- **Frontend**: React 18, Vite, React Router, Tailwind CSS v4, Framer Motion, Axios, React Hot Toast
- **Backend**: Node.js, Express, Mongoose, JWT Authentication
- **Database**: In-Memory MongoDB (Auto-seeded with sample products)
- **Design Base**: Fully responsive across mobile, tablet, and desktop (glassmorphism, vibrant colors)
- **Features**: Live Search, Category Filtering, Cart Management, Secure Checkout, JWT Auth, Order History

## 🛠️ Tech Stack & Structure

The codebase is split into two directories:

- `/client` (React Frontend)
- `/server` (Node.js Backend)

## 📦 Setup Instructions

There are no external database strings needed! The backend automatically spins up an in-memory database and seeds it with dummy data every time the server starts.

### 1. Start the Backend

Open a terminal and run:

```bash
cd server
npm install
npm run dev
```

### 2. Start the Frontend

Open another terminal and run:

```bash
cd client
npm install
npm run dev
```

### 3. Open in Browser

Visit `http://localhost:5173` to explore FreshCart.

## 🔐 Demo Credentials

The database has been seeded with initial products and a mock admin account. Use the following to log in:

- **Email:** `admin@example.com`
- **Password:** `123456`

## 🎨 UI/UX Specifications

- **Typography:** Plus Jakarta Sans (Headings), Inter (Body)
- **Color Scheme:** Primary Green (`#22c55e`), Deep Secondary (`#15803d`), Accent Orange (`#f97316`)
- **Animations:** Page routing fades, hover zooms, bouncing cart alerts.
