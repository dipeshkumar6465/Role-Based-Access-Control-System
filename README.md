# MERN Stack Blog Platform with Role-Based Access Control

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)
![RBAC](https://img.shields.io/badge/Security-RBAC-blue)

A full-featured blog platform with authentication and role-based permissions built with:

- **MongoDB** (Database)
- **Express.js** (Backend)
- **React** (Frontend)
- **Node.js** (Runtime)

## Features

- 🔐 JWT Authentication (Login/Register)
- 👥 Role-Based Access Control (Admin/User)
- ✍️ Create, Read, Update, Delete Blog Posts
- 🛡️ Admin Dashboard (Manage all content)
- 📝 User-specific post management
- ✅ Form validation & error handling

## Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (Local or Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/dipeshkumar6465/Role-Based-Access-Control-System
cd blog-platform


2. Backend Setup
bash
cd server
npm install
cp .env.example .env  # Update with your credentials
npm run dev


3. Frontend Setup
bash
cd ../client
npm install
npm start


Configuration
Environment Variables (server/.env)
ini

MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_secure_jwt_secret
PORT=5000



=> Project Structure
text
blog-platform/
├── client/               # React Frontend
│   ├── src/              
│   │   ├── components/   # UI Components
│   │   ├── context/      # Auth Context
│   │   ├── pages/        # Application Views
│   │   └── App.js        # Root Component
│
└── server/              # Express Backend
    ├── controllers/     # Business Logic
    ├── models/          # MongoDB Schemas
    ├── routes/          # API Endpoints
    └── index.js         # Server Entry