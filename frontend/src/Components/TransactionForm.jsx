import React, { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";

const TransactionForm = () => {
  const { addTransaction, categories, subcategories, linkTransactionToCategory } = useContext(WalletContext);
  const [details, setDetails] = useState({
    type: "income",
    amount: "",
    account: "",
    date: "",
    category: "",
    subcategory: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.account) {
      alert("Please select an account type.");
      return;
    }
    if (!details.date) {
      alert("Please select a date.");
      return;
    }
    const newTransaction = { ...details, id: Date.now() };
    addTransaction(newTransaction);
    linkTransactionToCategory(newTransaction, details.category, details.subcategory);
    setDetails({ type: "income", amount: "", account: "", date: "", category: "", subcategory: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={details.account}
        onChange={(e) => setDetails({ ...details, account: e.target.value })}
        required
      >
        <option value="">- Select Account -</option>
        <option value="Mobile Money">Mobile Money</option>
        <option value="Bank Account">Bank Account</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={details.amount}
        onChange={(e) => setDetails({ ...details, amount: e.target.value })}
        required
      />
      <select
        value={details.type}
        onChange={(e) => setDetails({ ...details, type: e.target.value })}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        value={details.category}
        onChange={(e) => setDetails({ ...details, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select
        value={details.subcategory}
        onChange={(e) => setDetails({ ...details, subcategory: e.target.value })}
      >
        <option value="">Select Subcategory</option>
        {details.category &&
          subcategories[details.category].map((sub) => (
            <option key={sub} value={sub}>{sub}</option>
          ))
        }
      </select>
      <input
        type="date"
        value={details.date}
        onChange={(e) => setDetails({ ...details, date: e.target.value })}
        required
      />
      <button className="btn" type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
