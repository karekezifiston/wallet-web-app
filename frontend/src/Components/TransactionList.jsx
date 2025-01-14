import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

const TransactionList = () => {
  const { transactions } = useContext(WalletContext);

  return (
    <div className="list-tra">
      <h3>Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.account}: {t.type === "income" ? "+" : "-"}${t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
