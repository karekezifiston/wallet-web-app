import React, { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";

const TransactionReport = () => {
  const { transactions, categories, subcategories } = useContext(WalletContext);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    let report = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });

    report = report.filter((transaction) => {
      return (
        (filterCategory ? transaction.category === filterCategory : true) &&
        (filterSubcategory ? transaction.subcategory === filterSubcategory : true)
      );
    });

    setFilteredTransactions(report);
  };

  return (
    <div className="report">
      <h2>GENERATE TRANSACTION REPORT</h2>
      <div>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleGenerateReport}>Generate</button>

      <div className="categ">
        <label>Category: </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filterCategory && (
        <div className="categ">
          <label>Subcategory: </label>
          <select
            value={filterSubcategory}
            onChange={(e) => setFilterSubcategory(e.target.value)}
          >
            <option value="">Select Subcategory</option>
            {subcategories[filterCategory].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      )}

      <h3>Report:</h3>
      {filteredTransactions.length > 0 ? (
        <ul>
          {filteredTransactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.date} - {transaction.account} - {transaction.type} - $
              {transaction.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found with selected filters.</p>
      )}
    </div>
  );
};

export default TransactionReport;
