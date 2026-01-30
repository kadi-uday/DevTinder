# DevTinder – Backend

DevTinder Backend is the server-side application for **DevTinder**, a developer-focused networking platform inspired by Tinder. It handles authentication, user management, connection requests, and secure communication between users.

The backend is built using **Node.js, Express, and MongoDB** and follows a clean REST API architecture. It is deployed on **AWS EC2** and accessed via a public IP address (domain not configured yet).

---

## 🚀 Project Overview

DevTinder allows developers to:
- Create and manage profiles
- Discover other developers
- Send and respond to connection requests
- Maintain secure sessions using JWT authentication

This repository contains only the **backend logic** and APIs. The frontend consumes these APIs to provide a complete user experience.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcrypt
- **Deployment:** AWS EC2 (IP-based access)
- **Architecture:** RESTful APIs

---

## 📘 Learnings

Through building the DevTinder backend, I gained hands-on experience and practical understanding of real-world backend development concepts, including:

- Designing and implementing **RESTful APIs** using Node.js and Express
- Implementing **JWT-based authentication and authorization**
- Securing user passwords with **bcrypt hashing**
- Managing protected routes using **middleware**
- Working with **MongoDB Atlas** for cloud-based database storage
- Performing CRUD operations using **Mongoose**
- Configuring **CORS** to enable frontend-backend communication
- Deploying a backend application on **AWS EC2**

This project helped me bridge the gap between theoretical knowledge and practical backend development by working on a complete, production-like application.

---

## 🌐 Deployment Details

- **Hosting:** AWS EC2
- **Access Type:** Public IPv4 address
- **Domain:** Not configured (IP-based access)
- **Status:** Live & functional

> Note: For demonstration and academic purposes, the backend is exposed using an IP address instead of a custom domain.

---

## 🔐 Security Features

- Password hashing using bcrypt
- JWT-based authentication & authorization
- Protected routes using middleware
- CORS configuration for frontend access

---

## 📡 API Capabilities

The backend provides APIs for:
- User signup & login
- Profile creation and updates
- Sending and accepting connection requests
- Fetching user and connection data

Detailed API routes are documented in the project files.

---

## 📁 Project Structure

```bash
DevTinder-Backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   └── app.js
├── package.json
└── README.md

```

---

## ⚠️ Note

This project is built for **learning** purposes. Future improvements include domain mapping, HTTPS configuration, and enhanced security policies.

---

## 🌐 Live Backend

The backend is deployed on AWS EC2 and is accessible via a public IP address:

Base URL:
http://13.62.58.3/

---

## 🤝 Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.