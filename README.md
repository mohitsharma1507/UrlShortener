# 🔗 URL Shortener with QR Code & Authentication

A full-stack URL shortener web application built with **MERN (MongoDB, Express.js, React.js, Node.js)**. Users can create custom short URLs, generate QR codes for each short URL, and manage their own URLs with authentication support.

## 🌐 Features

- 🔒 User authentication (Login/Signup)
- ✂️ Shorten URLs with optional custom short codes
- 📈 Automatically generates a QR code for each shortened URL
- 📋 Dashboard to view all user-created URLs
- 🚫 Limit of 4 URLs per user
- 🔁 Redirection to original URL via short code
- 📱 Mobile-friendly and responsive UI


## 📦 Tech Stack

| Frontend       | Backend        | Database    | Other Tools       |
|----------------|----------------|-------------|--------------------|
| React.js       | Node.js        | MongoDB     | Axios              |
| Bootstrap      | Express.js     | Mongoose    | QRCode (npm)       |
| React-Bootstrap| JWT / Cookies  |             | shortid (npm)      |

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository
git clone https://github.com/mohitsharma1507/UrlShortener

### 2. Backend SetUp
cd backend
npm install
node app.js

### 3. Frontend SetUp
cd Frontend
npm install
npm run dev
