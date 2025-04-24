import Transaction from "../components/transaction";
import { useState } from "react";

export default function Balance({ status, amount, description }) {
  const [transaction, setTransaction] = useState(false);
  return (
    <section className="account">
      <div className="account-content">
        <div className="account-content-wrapper">
          <h3 className="account-title">{status}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          {(!transaction && (
            <button
              className="transaction-button"
              onClick={() => setTransaction(true)}
            >
              View Transactions
            </button>
          )) ||
            (transaction && (
              <button
                className="transaction-button"
                onClick={() => setTransaction(false)}
              >
                Hide Transactions
              </button>
            ))}
        </div>
      </div>
      {transaction && <Transaction />}
    </section>
  );
}
