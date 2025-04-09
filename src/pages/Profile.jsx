import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserData } from "../redux/actions/user.actions";
import Balance from "../components/Balance";

export default function Profile() {
  const dispatch = useDispatch();
  const { firstName, lastName, userName } = useSelector((state) => state.user);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [newUserName, setNewUserName] = useState(userName || "");

  const editName = (e) => {
    e.preventDefault();
    if (newUserName.trim() !== "") {
      const token =
        localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
      if (!token) {
        alert("You are not authenticated. Please log in again.");
        return;
      }
      try {
        dispatch(updateUserData(token, { userName: newUserName }));
        alert("Username updated successfully!");
        setToggleEdit(false);
      } catch (error) {}
    }
  };

  return (
    <>
      {!toggleEdit && (
        <div className="welcome">
          <h1 className="welcome-title">
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>

          <button className="edit-button" onClick={() => setToggleEdit(true)}>
            Edit Username
          </button>
        </div>
      )}
      {toggleEdit && (
        <>
          <h2 className="edit-mode-title">Editing User info</h2>

          <form className="edit-form" onSubmit={editName}>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              placeholder={userName}
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              maxLength={15}
              required
            />
            <input type="text" id="first-name" name="first-name" autoComplete="given-name" placeholder={firstName} readOnly />
            <input type="text" id="last-name" name="last-name" autoComplete="family-name" placeholder={lastName} readOnly />
            <div className="edit-form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setToggleEdit(false)}>
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
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
