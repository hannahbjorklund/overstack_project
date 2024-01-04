import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PlayerCard from "../PlayerCard/PlayerCard";
import './UserPage.css';

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
    <div className="profileContainer">
      <div className="infoContainer">
        <h1>Welcome, {user.username}!</h1>
        <p>Your ID is: {user.id}</p>
      </div>

      <div className = 'accountsSection'>
          {/* Display each user account as a playercard */}
          <h2 className = 'accountHeader'>Your linked accounts: </h2>
          <button
            className="btn"
            onClick={() => {
              history.push("/linkAccount");
            }}
          >
            Link Another Account
          </button>

          <button className="btn">
            Remove Account
          </button>
        
        <div className = 'accountsContainer'>
          {
            statsArray &&
            statsArray.map((x, i) => {
              return <PlayerCard key={i} stats={x} />;
            })
          }
        </div>
        
      </div>
    </div>
  );
}

export default UserPage;