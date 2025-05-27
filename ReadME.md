
    #🧾 Expense Tracker API

    A simple and secure <strong>Expense Tracker REST API</strong> built with <code>Node.js</code>,
        <code>Express</code>, and <code>MongoDB</code>. It allows users to manage their personal expenses by performing
        CRUD operations with authentication.

    #📌 Features
    🔐 User authentication (JWT)
    ➕ Add, edit, delete expenses
     📊 Get expenses by category, date range, or user
     📈 Calculate total, average, and price range
     📁 MongoDB aggregation support
     📦 RESTful API structure
    </ul>

    #🚀 Tech Stack
    Backend: Node.js, Express.js
    Database: MongoDB + Mongoose
    Authentication: JWT

    #📁 Project Structure
    <code>expense-tracker/
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
</code>

    #⚙️ Installation
    <code># Clone the repository
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install

# Create a .env file and add your environment variables
touch .env
</code>

    #🛠️ Environment Variables
    <code>PORT=3000
MONGODB_URI=mongodb://localhost:PORT/expense-tracker
JWT_SECRET=your_jwt_secret
</code>

    #▶️ Run the Project
    <code># Start the server
npm run dev
The server will start at <code>http://localhost:3000
</code>

    #🛣️ API Endpoints
    <table>
        <thead>
            <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Description</th>
                <th>Protected</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>POST</td>
                <td>/api/auth/register</td>
                <td>Register a new user</td>
                <td class="text-center">❌</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/api/auth/login</td>
                <td>Login and get JWT token</td>
                <td class="text-center">❌</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/expense/</td>
                <td>Get all expenses for user</td>
                <td class="text-center">✅</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/expense/analysis</td>
                <td>Get analysis of expenses for user</td>
                <td class="text-center">✅</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/expense/getExpense/:id</td>
                <td>Get single expenses for user</td>
                <td class="text-center">✅</td>
            </tr>
            
            <tr>
                <td>POST</td>
                <td>/api/expense/</td>
                <td>Add a new expense</td>
                <td class="text-center">✅</td>
            </tr>
            <tr>
                <td>PUT</td>
                <td>/api/expense/:id</td>
                <td>Update an expense</td>
                <td class="text-center">✅</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>/api/expense/:id</td>
                <td>Delete an expense</td>
                <td class="text-center">✅</td>
            </tr>
        </tbody>
    </table>

    #🔒 Authentication
   Use the JWT token returned on login as a <code>Bearer Token</code> in the <code>Authorization</code> header for
        all protected routes:
    <code>Authorization: Bearer &lt;your-token&gt;</code>

    #🧪 Sample Expense Object
    <code>{
  title: "Apple",
  category: "Food",
  amount: 250,
  date: "2025-05-26"
}
</code>

    #🧑‍💻 Contributing
    Contributions are welcome! Please fork the repository and submit a pull request.

    #📄 License
    This project is licensed under the MIT License.

