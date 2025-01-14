import React from "react";
import { WalletProvider } from "./context/WalletContext";
import TransactionForm from "./Components/TransactionForm";
import AccountSummary from "./Components/AccountSummary";
import TransactionList from "./Components/TransactionList";
import wallete from "./assets/wallete.png"
import "./App.css"
import TransactionReport from "./Components/TransactionReport";
import SetBudget from "./Components/SetBudget";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <WalletProvider>
      <div className="App">

        <h1><img src={wallete} width={50} alt="" />
          Wallet Tracker</h1>
          <SetBudget />
        <TransactionList />
        <TransactionForm />
        <TransactionReport/>
        <AccountSummary />
        <ToastContainer />
      </div>
    </WalletProvider>
  );
};

export default App;
