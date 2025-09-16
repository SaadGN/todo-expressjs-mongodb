# ExpressJS Todo App with OTP Authentication  

This is my beginner-level backend project built with **Express.js, MongoDB, JWT, and Nodemailer**.It’s a **learning project**, it helped me understand the basics of building APIs in Express.js.

Users can:  
- **Sign up** with email & password (with OTP email verification).  
- **Login** after verification (JWT token generated).  
- **Manage their todos** (Create, Read, Update, Delete).  
- Each user can only access **their own todos**.  

---

## Features
- User **Signup with OTP email verification**.  
- **Resend OTP** if expired.  
- **JWT authentication** for secure routes.  
- **CRUD operations** on todos (only for logged-in users).  
- **MongoDB database** for persisting users and todos.  

---

## Dependencies
- express  
- mongoose  
- jsonwebtoken  
- nodemailer  
- bcryptjs  
- validator  
- dotenv  

---

## Project Structure
```
project-root/
│── controllers/
│   ├── user.js        # User signup, login, otp verification
│   ├── todo.js        # Todo CRUD controllers
│
│── middlewares/
│   └── auth.js        # JWT authentication middleware
│
│── models/
│   ├── user.js        # User schema
│   └── todo.js        # Todo schema
│
│── routes/
│   ├── user.js        # User routes
│   └── todo.js        # Todo routes
│
|── README.md
|
│── .env               # Environment variables
│── server.js          # Entry point
│── package.json
```

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone git@github.com:SaadGN/todo-expressjs-mongodb.git
cd todo-expressjs-mongodb
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables  
Create a **.env** file in the project root:
```env
PORT=port number
MONGO_URI=mongodb_connection_string
SECRET=jwt_secret_key
USER_MAIL=your_email@gmail.com
USER_PASSWORD=your_email_app_password
```

For Gmail, you need to use an **App Password** (not your main password).  

### 4. Run the server
```bash
npm start
```
Server will start at PORT you added:  
`http://localhost:PORT`

---

## API Endpoints  

### **Auth Routes** (`/api/user`)
- **POST /signup** → Register user & send OTP  
  ```json
  { "username": "John", "email": "john@example.com", "password": "123456" }
  ```
- **POST /verifyOtp** → Verify user with OTP  
  ```json
  { "email": "john@example.com", "otp": "123456" }
  ```
- **POST /resendOtp** → Resend OTP  
  ```json
  { "email": "john@example.com" }
  ```
- **POST /login** → Login & get JWT token  
  ```json
  { "email": "john@example.com", "password": "123456" }
  ```

---

### **Todo Routes** (`/api/todo`)
Requires **Authorization Header**:  
```
Authorization: Bearer <your_jwt_token>
```

- **POST /todo** → Create a new todo  
  ```json
  { "title": "Buy groceries", "description": "Milk, Bread, Eggs" }
  ```

- **GET /todo** → Get all todos of logged-in user  

- **PUT /todo/:id** → Update todo by ID  
  ```json
  { "title": "Buy groceries (updated)", "description": "Milk, Bread, Eggs, Butter" }
  ```

- **DELETE /todo/:id** → Delete todo by ID  

---

## Tech Stack
- **Express.js** → Backend framework  
- **MongoDB** → Database  
- **JWT** → Authentication  
- **Nodemailer** → Email (OTP sending)  
- **bcryptjs** → Password hashing  
- **Validator** → Email validation  

---


