import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [categories, setCategories] = useState(["Food", "Transportation", "Utilities"]);
  const [subcategories, setSubcategories] = useState({
    Food: ["Groceries", "Dining Out"],
    Transportation: ["Bus", "Fuel"],
    Utilities: ["Electricity", "Water"],
  });

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
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

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

  const isBudgetExceeded = totalExpenses > budget;

  useEffect(() => {
    if (isBudgetExceeded) {
      toast.error("Warning: You have exceeded your budget!");
    }
  }, [isBudgetExceeded]);

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
