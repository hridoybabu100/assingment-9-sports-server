**Modern & Professional README for Sports Server**

```markdown
# Sportify Server – Backend API

![Sportify](https://img.shields.io/badge/Express-5.2.1-black?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-4285F4?style=flat&logo=json-web-tokens)

**Production Backend** for the **Sportify** – Modern Sports Management Platform.

Live API: [https://assingment-9-sports-server.vercel.app](https://assingment-9-sports-server.vercel.app)

---

## ✨ Features

- **RESTful API** built with Express.js
- **MongoDB Atlas** integration with secure connection
- **JWT Authentication** using `jose` (stateless & secure)
- Protected routes with custom middleware
- Full CRUD operations for players
- Purchase system with user-specific data
- Optimized for Vercel Serverless deployment

---

## 🛠 Tech Stack

| Technology           | Version     |
|----------------------|-------------|
| **Express.js**       | 5.2.1       |
| **MongoDB**          | 7.2.0       |
| **JWT Verification** | jose-cjs    |
| **CORS**             | ^2.8.6      |
| **Dotenv**           | ^17.4.2     |
| **Vercel**           | Serverless  |

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/assingment-9-sports-server.git
cd assingment-9-sports-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
CLIENT_URI_LINK=https://sports-webcode.vercel.app
SERVER_URI_LINK=mongodb+srv://<username>:<password>@cluster0...
```

### 4. Run Locally

```bash
npm start
# or
node index.js
```

Server will run at `http://localhost:5000`

---

## 📡 API Endpoints

### Public Routes

| Method | Endpoint              | Description                     |
|--------|-----------------------|---------------------------------|
| `GET`  | `/`                   | Health check                    |
| `GET`  | `/sports`             | Get all players                 |
| `GET`  | `/data`               | Get 6 featured players (Home)   |

### Protected Routes (Requires JWT)

| Method   | Endpoint                    | Description                        |
|----------|-----------------------------|------------------------------------|
| `GET`    | `/sports/:id`               | Get single player details          |
| `POST`   | `/sports`                   | Add new player                     |
| `PATCH`  | `/sports/:id`               | Update player                      |
| `DELETE` | `/sports/:id`               | Delete player                      |
| `POST`   | `/purchase`                 | Purchase a player                  |
| `GET`    | `/purchase/:userId`         | Get user's purchased players       |
| `DELETE` | `/purchase/:purchaseId`     | Cancel/Delete purchase             |

---

## 🔐 Authentication

- Uses **JWT** tokens issued by the **Better Auth** frontend
- Token verification via `jose-cjs` with remote JWKS
- Protected routes use `verifyToken` middleware
- Header format: `Authorization: Bearer <token>`

---

## 📂 Project Structure

```bash
/
├── index.js              # Main server file
├── vercel.json           # Vercel configuration
├── .env                  # Environment variables
├── package.json
└── README.md
```

---

## 🚀 Deployment

This project is optimized for **Vercel**.

```bash
vercel --prod
```

Make sure to add environment variables in Vercel Dashboard.

---

## 🔧 Key Middleware

- **CORS** – Allows frontend communication
- **verifyToken** – JWT validation using remote JWKS
- **Express JSON** – Body parsing

---

## 📊 Database Collections

- `sportCollection` → All sports players
- `Purchase` → User purchase records

---

## 📝 Author

**Hridoy Akanda**

Built as part of Assignment-9 (Sports Management System)

---

**Backend for Sportify – Modern Sports Platform**  
Made with ❤️ using Express & MongoDB

```

---

This README is **clean, modern, developer-friendly**, and professional — perfect for showcasing your backend on GitHub or Vercel. 

Would you like a combined README for both client + server or any specific additions?