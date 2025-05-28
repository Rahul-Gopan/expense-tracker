
# 🧾 Expense Tracker API

A simple and secure **Expense Tracker REST API** built with `Node.js`, `Express`, and `MongoDB`. It allows users to manage their personal expenses by performing CRUD operations with authentication.

---

## 📌 Features

- 🔐 User authentication (JWT)
- ➕ Add, edit, delete expenses
- 📊 Get expenses by category, date range, or user
- 📈 Calculate total, average, and price range
- 📁 MongoDB aggregation support
- 📦 RESTful API structure

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT

---
## 📁 Project Structure
expense-tracker/
    ├── controllers/
    │   └── expenseController.js
    ├── database/
    │   └── db.js
    ├── middlewares/
    │   └── authMiddleware.js
    ├── models/
    |   ├── User.js
    │   └── Expense.js
    ├── public/
    │   └── index.js
    ├── routes/
    │   ├── authRoute.js
    │   └── expenseRoute.js
    ├── .env
    ├── .gitignore
    ├── server.js
    ├── package.json
    └── README.md

---

## ⚙️ Installation

# Clone the repository
- git clone https://github.com/Rahul-Gopan/expense-tracker.git
- cd expense-tracker

# Install dependencies
- npm install

---

## 🛠️ Environment Variables

Create a `.env` file in the root directory and add the following:

-env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret

## ▶️ Run the Project
# Start the server
npm run dev

---

## 🛣️ API Endpoints

| Method | Endpoint                     | Description                       | Protected |
|--------|------------------------------|-----------------------------------|-----------|
| POST   | `/api/auth/register`         | Register a new user               | ❌        |
| POST   | `/api/auth/login`            | Login and get JWT token           | ❌        |
| GET    | `/api/expense/`              | Get all expenses for user         | ✅        |
| GET    | `/api/expense/analysis`      | Get analysis of expenses          | ✅        |
| GET    | `/api/expense/getExpense/:id`| Get a single expense by ID        | ✅        |
| POST   | `/api/expense/`              | Add a new expense                 | ✅        |
| PUT    | `/api/expense/:id`           | Update an expense                 | ✅        |
| DELETE | `/api/expense/:id`           | Delete an expense                 | ✅        |


---

## 🔒 Authentication

Use the JWT token returned on login as a **Bearer Token** in the `Authorization` header for all protected routes:

- http
Authorization: Bearer <your-token>

---

## 🧪 Sample Expense Object:
{
  "title": "Apple",
  "category": "Food",
  "amount": 250,
  "date": "2025-05-26"
}


---

## 🧑‍💻 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License
This project is licensed under the MIT License.
