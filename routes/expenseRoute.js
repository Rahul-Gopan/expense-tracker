const express = require("express");

// importing controller
const {
    getAnalysis,
    singleExpense,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
} = require("../controllers/expenseController");

// importing middlewares
const { verifiedUser } = require("../middlewares/authMiddleware");

// create router
const router = express.Router();

// API to analyse expense
router.get('/analysis', verifiedUser, getAnalysis);

// API to fetch all expesne
router.get("/", verifiedUser, getExpense);

// API for fetch single expense
router.get("/getExpense/:id", verifiedUser, singleExpense);

// API for create expense
router.post("/", verifiedUser, createExpense);

// API to update Expense
router.put("/:id", verifiedUser, updateExpense);

// API to delete Expense
router.delete("/:id", verifiedUser, deleteExpense);

module.exports = router;
