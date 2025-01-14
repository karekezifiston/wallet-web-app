import React, { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import set from "../assets/set.png"

const SetBudget = () => {
  const { budget, setBudget, isBudgetExceeded } = useContext(WalletContext);
  const [newBudget, setNewBudget] = useState("");

  const handleSetBudget = () => {
    if (newBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }
    setBudget(parseFloat(newBudget));
    setNewBudget("");
  };

  return (
    <div className="budget">
      <h2><img src={set}width={20} alt="" />Set Your Budget</h2>
      <input
        type="number"
        placeholder="Enter your budget"
        value={newBudget}
        onChange={(e) => setNewBudget(e.target.value)}
      />
      <button onClick={handleSetBudget}>Set Budget</button>
      <h3>Current Budget: <span>${budget}</span></h3>
      {isBudgetExceeded && (
        <p style={{ color: "red" }}>Warning: You've exceeded your budget!</p>
      )}
    </div>
  );
};

export default SetBudget;
