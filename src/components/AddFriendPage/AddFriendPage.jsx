import React, { useState } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import { useSelector, useDispatch } from "react-redux";

export default function AddFriendPage() {
  const dispatch = useDispatch();
  // Local state to store form inputs
  const [nameInput, setNameInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const user = useSelector((store) => store.user.userReducer);
  // Stats reducer represents the stats of the searched battletag
  const stats = useSelector((store) => store.stats.accountSummary);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("In handleSubmit:", `${nameInput}-${tagInput}`);
  };

  // Add the corresponding battletag to the blizzard_accounts table
  //  and link it to the user in the user_accounts table
  const addFriendAccount = () => {
    const addedAccount = {
      battletag: `${nameInput}-${tagInput}`,
      userID: user.id,
    };

    // Dispatching the account object to saga
    dispatch({
      type: "ADD_FRIEND_ACCOUNT",
      payload: addedAccount,
    });

    // Clear the form inputs after successful link
    setNameInput("");
    setTagInput("");
  };

  // Saga dispatch to query OverFast API for the account summary for the given battletag
  const getAccountSummary = (e) => {
    e.preventDefault();
    dispatch({
      type: "GET_ACCOUNT_SUMMARY",
      payload: `${nameInput}-${tagInput}`,
    });
  };

  return (
    <div className="cardContainer">
      <h1> Add A Friend Account </h1>
      <form className="formPanel" onSubmit={handleSubmit}>
        <input
          className="nameInput"
          placeholder="Username"
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
          value={nameInput}
        />
        <label>#</label>
        <input
          className="tagInput"
          placeholder="Tag"
          onChange={(e) => {
            setTagInput(e.target.value);
          }}
          value={tagInput}
        />
        <button onClick={getAccountSummary} className="btn">
          Search
        </button>
      </form>

      {/* Show a preview of the blizzard account's in-game profile */}
      <h2>Profile Preview:</h2>
      {stats.username && <PlayerCard stats={stats} />}
      <button className="btn linkButton" onClick={addFriendAccount}>
        Add to Friends
      </button>
    </div>
  );
}
