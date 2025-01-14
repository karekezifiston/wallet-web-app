import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AccountSummary = () => {
  const { transactions } = useContext(WalletContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      label: 'Amount',
      data: [income, expense],
      backgroundColor: ['#4CAF50', '#F44336']
    }]
  };

  return (
    <div className="account-summary">
      <h3>Account Summary</h3>
      <p>Total Income: <span>${income}</span></p>
      <p>Total Expenses: <span>${expense}</span></p>
      <p>Balance: <span>${income - expense}</span></p>

      <div className="chart">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default AccountSummary;
