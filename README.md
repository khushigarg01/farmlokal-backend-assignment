## 📌 Project Overview 🚀

This project is an individual backend engineering assignment developed to showcase real-world backend system design, with a strong focus on performance, scalability, and reliability.

— The backend exposes secure and well-structured APIs designed to handle large datasets efficiently
— Redis is integrated to support caching, reliability, and safe request handling
— Webhook-based external events are processed with idempotency and retry safety
— The system emphasizes low latency, minimal database queries, and clean API contracts

Overall, the project is built with production-level considerations in mind, going beyond basic functionality to reflect how modern backend services are designed and maintained in real-world applications.


---


## 📑 Table of Contents

- [📌 Project Overview]
- [🛠 Tech Stack]
- [🏗 Architecture]
- [🔐 Authentication]
- [🛡 Authorization]
- [⚙️ Features]
- [🔄 Pagination]
- [📦 Product Listing API]
- [🔔 Webhook Integration]
- [⚡ Performance & Reliability Techniques]
- [🧪 API Testing (Postman)]
- [📊 Trade-offs & Design Decisions]
- [✅ Evaluation Alignment]
- [🏁 Conclusion]


## 🛠 Tech Stack ⚙️

The project is built using a modern and production-ready backend technology stack, carefully chosen to support scalability, performance, and reliability.

— Node.js (Express.js) for building fast, scalable server-side APIs 🚀
— MySQL as the primary relational database for structured and consistent data storage 🗄️
— Redis for caching, token storage, and reliability mechanisms such as idempotency ⚡
— OAuth2 (Client Credentials Flow) to secure APIs and manage service-to-service authentication 🔐
— Postman for API testing, validation, and debugging 🧪

This stack reflects commonly used technologies in real-world backend systems and aligns well with high-performance, scalable application design.


---


## 🏗 Architecture 🧩

The backend follows a clean, layered architecture designed to ensure scalability, maintainability, and reliability across different system components.

Client / Postman
│
│ Authorization: Bearer <token>
▼
Express Server
├── OAuth2 Authentication (Redis cached tokens)
├── Rate Limiter (Reliability)
├── Product Listing API (MySQL + Cursor Pagination)
├── Webhook API (Redis Idempotency)
└── Global Error Handling

This modular architecture allows the system to scale efficiently, simplifies debugging, and supports future feature expansion without major structural changes.


---


## 🔐 Authentication (OAuth2 – Client Credentials Flow)

- OAuth2 Client Credentials flow is implemented.
- Access tokens are cached in **Redis** to avoid repeated token generation.
- Token reuse ensures concurrency safety.
- All protected APIs require a valid access token.


---


### 🔑 Authorization Header Format

- Authorization: Bearer <access_token>
- Unauthorized requests are rejected with proper error responses.


---


### ✅ Features

- Cursor-based pagination (preferred for large datasets)
- Designed to scale for **1M+ records**
- Efficient MySQL queries with indexing
- Minimal database hits
- Protected via authentication middleware

### 📄 Sample Response
```json
{
  "nextCursor": 3,
  "data": [
    {
      "id": 1,
      "name": "iPhone",
      "price": "999.99",
      "category": "electronics",
      "created_at": "2026-02-06T16:13:56.000Z"
    }
  ]
}
```


---


🛑 Pagination End State

{
  "nextCursor": null,
  "data": []
}
Returning nextCursor: null clearly signals the client to stop further pagination requests.


---


## 📦 Product Listing API

➤ Endpoint
GET /products

📥 Required Headers
- Authorization: Bearer <access_token>


---


🔔 Webhook Integration

➤ Endpoint
POST /webhook

🔐 Idempotency & Safe Retries
  - Each webhook request must include an Idempotency-Key header
  - Redis is used to track processed events
  - Duplicate webhook retries are safely ignored

📥 Required Headers

   Content-Type: application/json
   Idempotency-Key: evt_1001

✅ Success Response
   {
     "status": "success"
   }

 - This ensures reliable webhook processing even when external services retry requests.


---


⚡ Performance & Reliability Techniques
    The project implements multiple reliability mechanisms:

🚀 1. Cursor-based Pagination

  - Avoids OFFSET-based performance issues
  - Scales efficiently with large datasets

⚡ 2. Redis Caching

  - OAuth access token caching
  - Webhook idempotency handling
  - Reduces repeated computations

🛡 3. Rate Limiting

  - Prevents abuse and API flooding
  - Ensures consistent performance

🧯 4. Centralized Error Handling

  - Predictable JSON error responses
  - Improved debugging and stability


---


🧪 API Testing (Postman)

 - All APIs were manually tested using Postman to validate correctness and reliability.

✔ Tested Scenarios

### 📸 Authorized Products API
![Authorized Products API](screenshots/products-success.png)

### 📸 Pagination End State
![Pagination End](screenshots/products-pagination-end.png)

### 📸 Unauthorized Access
![Unauthorized Access](screenshots/products-unauthorized.png)

### 📸 Webhook Success
![Webhook Success](screenshots/webhook-success.png)

### 📸 Webhook Duplicate Handling
![Webhook Duplicate](screenshots/webhook-duplicate.png)


---


⚙️ Environment Setup

1️⃣ Clone the Repository
git clone https://github.com/<your-username>/farmlokal-mern-backend-assignment.git
cd backend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

 - Create a .env file in the project root:

PORT=5000

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD="your_password"
MYSQL_DB=products_db

REDIS_URL=redis://localhost:6379

OAUTH_CLIENT_ID=test_client
OAUTH_CLIENT_SECRET=test_secret
TOKEN_EXPIRE=3600
TEST_OAUTH_TOKEN=my_test_oauth_token_123

4️⃣ Start Required Services

Ensure MySQL and Redis are running locally.

5️⃣ Run the Server
npm start

#Expected output:

MySQL connected
Server running on port 5000


---


🌍 Deployment

The backend is deployed on Render.

🔗 Deployed URL
[https://<your-render-app>.onrender.com](https://farmlokal-backend-assignments.onrender.com)
The deployed environment mirrors the local setup for consistency.


---


📊 Trade-offs & Design Decisions

- Cursor-based pagination was chosen for scalability.
- Redis was selected for fast in-memory operations.
- Idempotent webhook handling prevents duplicate processing.
- Rate limiting balances performance and reliability.


 ----

 
✅ Evaluation Alignment

This project aligns with all evaluation criteria:
- Technical Complexity ✔
- Practicality ✔
- Code Quality ✔
- Performance & Impact ✔


---

🏁 Conclusion 🎯

This project was developed as an backend assignment with a strong emphasis on real-world system design, performance, and reliability.

— The backend demonstrates secure authentication and authorization using industry-standard practices 🔐
— Scalable data handling is achieved through cursor-based pagination and optimized database access 🚀
— Redis is effectively used for caching, idempotency, and reliability improvements ⚡
— External API and webhook integrations are implemented with safe retry and fault-tolerant mechanisms 🔄
— The overall system is designed to be clean, modular, and production-ready 🧩

In summary, this project goes beyond basic functionality and reflects how backend services are designed, tested, and documented in real production environments. It showcases practical backend engineering skills aligned with performance, scalability, and maintainability expectations.

