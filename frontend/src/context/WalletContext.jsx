import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    return savedTransactions ? savedTransactions : [];
  });
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? parseFloat(savedBudget) : 0;
  });
  const [categories, setCategories] = useState(["Food", "Transportation", "Utilities"]);
  const [subcategories, setSubcategories] = useState({
    Food: ["Groceries", "Dining Out"],
    Transportation: ["Bus", "Fuel"],
    Utilities: ["Electricity", "Water"],
  });

  const addTransaction = (transaction) => {
    setTransactions((prev) => {
      const updatedTransactions = [...prev, transaction];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
  };

  const linkTransactionToCategory = (transaction, category, subcategory) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transaction.id
          ? { ...t, category, subcategory }
          : t
      )
    );
  };

  // useEffect(() => {
  //   fetch('/api/transactions')
  //     .then(res => res.json())
  //     .then(data => setTransactions(data));

  //   fetch('/api/budget')
  //     .then(res => res.json())
  //     .then(data => setBudget(data.budget));


  //   fetch('/api/categories')
  //     .then(res => res.json())
  //     .then(data => {
  //       setCategories(data.categories);
  //       setSubcategories(data.subcategories);
  //     });

  // }, []);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

  const isBudgetExceeded = totalExpenses > budget;

  useEffect(() => {
    localStorage.setItem("budget", budget.toString());
    localStorage.setItem("categories", JSON.stringify(categories)); 
    localStorage.setItem("subcategories", JSON.stringify(subcategories)); 
    if (isBudgetExceeded) {
      toast.error("Warning: You have exceeded your budget!");
    }
  }, [budget, isBudgetExceeded, categories, subcategories]);

  return (
    <WalletContext.Provider
      value={{
        transactions,
        addTransaction,
        linkTransactionToCategory,
        budget,
        setBudget,
        totalExpenses,
        isBudgetExceeded,
        categories,
        subcategories,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
