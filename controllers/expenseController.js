const mongoose = require('mongoose');
const Expense = require('../models/Expense');

// To fetch all expense for individual user
const getExpense = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const { startDate, endDate, category } = req.body || {};

        let query = { userId };

        // Add date filter if provided
        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        } else if (startDate) {
            query.date = { $gte: new Date(startDate) };
        } else if (endDate) {
            query.date = { $lte: new Date(endDate) };
        }

        // Add category filter if provided
        if (category) {
            query.category = category;
        }

        // fetch all expense for loggedin user
        const getExpense = await Expense.find(query);

        if(!getExpense) {
            return res.status(404).json({
                success: false,
                message: "No expense found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Expense data fetched successfully",
            data: getExpense
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Someting went wrong. Error: ${error}`
        })
    }
}

// To fetch single expense for individual
const singleExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        // Check if the expense is exist or not and is authentic user
        const expenseData = await Expense.findOne({ _id: expenseId, userId: req.userInfo.userId});

        if(!expenseData){
            return res.status(404).json({
                success: false,
                message: "No expense found for the user"
            })
        }

        res.status(200).json({
            success: true,
            message: "Expense fetched successfully",
            data: expenseData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// To create an expense
const createExpense = async (req, res) => {
    try{

        // Destructuring from data
        const { title, amount, category } = req.body;

        // Check if all params were presents
        if(!title || !amount || !category)
        {
            return res.status(400).json({
                success: false,
                message: "Fileds missing. Fill all mandatory fields"
            })
        }

        // Crating new expense data
        const newExpense = new Expense({
            userId: req.userInfo.userId,
            title: title,
            amount: amount,
            category: category
        })

        // Creating new expense
        await newExpense.save();

        res.status(200).json({
            success: true,
            message: "Expense added successfully",
            data: newExpense
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Someting went wrong. Error: ${error}`
        });
    }
}

// To update an expense
const updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        // Check the expense is exist and user try to edit it is a authentic user
        const expenseCheck = await Expense.findOne({ _id: expenseId, userId: req.userInfo.userId })
        
        if(!expenseCheck)
        {
            return res.status(404).json({
                success: false,
                message: "No expense found for the user"
            })
        }

        const updateExpense = await Expense.findByIdAndUpdate(expenseId, req.body, {new: true});

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: updateExpense
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// To delete an expense
const deleteExpense = async (req, res) => {
    try {

        const expenseId = req.params.id;

        // Check if the expense is exist and is a authentic user
        const deleteExpense = await Expense.findByIdAndDelete({ _id: expenseId, userId: req.userInfo.userId});

        if(!deleteExpense)
        {
            return res.status(404).json({
                success: false,
                message: "No expense found for the user"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Someting went wrong. Error: ${error}`
        })
    }
}

// To get the analysis fo the api
const getAnalysis = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userInfo.userId);

        const getExpenses = await Expense.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $group: {
                    _id: "$category",
                    total_item: { $sum : 1},
                    minPrice: { $min: "$amount" },
                    maxPrice: { $max: "$amount" },
                    avgPrice: { $avg: "$amount" }
                }
            },
            {
                $project: {
                    _id: 1,
                    total_item: 1,
                    minPrice: 1,
                    maxPrice: 1,
                    avgPrice: { $round: ["$avgPrice", 3]},
                    priceRange: { $subtract: ["$maxPrice", "$minPrice"] }
                }
            }
        ]);

        if(!getExpenses)
        {
            return res.status(400).json({
                success: false,
                message: `Something went wrong. Error: ${error}`
            })
        }

        // result
        res.status(200).json({
            success: true,
            message: "Analysis data fetched successfully",
            data: getExpenses
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Someting went wrong. Error: ${error}`
        })
    }
}

module.exports = {
    getAnalysis,
    singleExpense,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
};