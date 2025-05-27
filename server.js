// Importing env
require('dotenv').config();

// Importing required dependencies
const express = require('express');
const ConnectToDB = require('./database/db');
const authRoute = require('./routes/authRoute');
const expenseRoute = require("./routes/expenseRoute")


// creating express application
const app = express();

// Parsing req
app.use(express.json());

const PORT = process.env.PORT;

// connecting database
ConnectToDB();

// set public as the static directory
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index')
});
app.use('/api/auth', authRoute);
app.use('/api/expense', expenseRoute);

// If the endpoint not match
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Invalid endpoint. Please check the API route."
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
