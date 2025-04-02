import { useSelector } from "react-redux";

import Balance from "../components/Balance";

export default function Profile() {
  const { firstName, lastName } = useSelector((state) => state.user);

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName}
          {lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>

      <Balance
        status="Argent Bank Checking (x6712)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Balance
        status="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Balance
        status="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </>
  );
}
