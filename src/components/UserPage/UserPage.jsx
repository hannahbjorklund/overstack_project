import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PlayerCard from "../PlayerCard/PlayerCard";

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const userAccounts = useSelector((store) => store.blizzard.userAccounts);
  const statsArray = useSelector((store) => store.blizzard.statsArray);

  useEffect(() => {
    getUserAccounts();
  }, []);

  // This is to ensure the userAccounts have been populated before getting each account's stats
  useEffect(() => {
    getStatsArray();
  }, [userAccounts]);

  // Get a list of the user's linked accounts by dispatching
  function getUserAccounts() {
    dispatch({
      type: "GET_USER_ACCOUNTS",
      payload: user.id,
    });
  }

  // Get an array of stats objects corresponding to each user account. Then, send an array of each 
  //  account's battletags to saga function to get stats
  function getStatsArray() {
    console.log(userAccounts);
    let blizzArray = [];
    userAccounts.map((x) => {
      blizzArray.push(x.battletag);
    });
    dispatch({
      type: "GET_STATS_ARRAY",
      payload: blizzArray,
    });
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Your linked accounts: </p>

      {/* Display each user account as a playercard */}
      {statsArray &&
        statsArray.map((x, i) => {
          return <PlayerCard key={i} stats={x} />;
        })}

      <button
        className="btn"
        onClick={() => {
          history.push("/linkAccount");
        }}
      >
        Link an Account
      </button>
      <LogOutButton className="btn" />
    </div>
  );
}

export default UserPage;