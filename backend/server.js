const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://karekezifiston30:<db_password>@cluster0.4unut.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Schemas and Models
const transactionSchema = new mongoose.Schema({
  id: Number,
  type: String,
  amount: Number,
  account: String,
  date: String,
  category: String,
  subcategory: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const budgetSchema = new mongoose.Schema({
  budget: Number
});

const Budget = mongoose.model('Budget', budgetSchema);

// Routes
app.post('/api/transactions', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/budget', async (req, res) => {
  try {
    const budget = await Budget.findOne();
    if (budget) {
      budget.budget = req.body.budget;
      await budget.save();
    } else {
      const newBudget = new Budget({ budget: req.body.budget });
      await newBudget.save();
    }
    res.status(200).json({ message: "Budget updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/categories', (req, res) => {
  res.status(200).json({
    categories: ["Food", "Transportation", "Utilities"],
    subcategories: {
      Food: ["Groceries", "Dining Out"],
      Transportation: ["Bus", "Fuel"],
      Utilities: ["Electricity", "Water"]
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
