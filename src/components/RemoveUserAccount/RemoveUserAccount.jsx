import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PlayerCard from "../PlayerCard/PlayerCard";
import './RemoveUserAccount.css';

function RemoveUserAccount() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const userAccounts = useSelector((store) => store.blizzard.userAccounts);
  const statsArray = useSelector((store) => store.blizzard.statSummaryArray);

  useEffect(() => {
    getUserAccounts();
  }, []);

  // This is to ensure the userAccounts have been populated before getting each account's stats
  useEffect(() => {
    getStatSummaryArray();
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
  function getStatSummaryArray() {
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
        <h1 className = 'username'>{user.username}</h1>
        <div className='userIcon'>
          <span className='iconText'>{user.username[0]}</span>
        </div>
        <div className='timeInfo'>
          <p> Last online: {user.last_online}</p>
          <p> Created: {user.created_at} 🎂</p>
        </div>
        <div className='userStats'>
          <h3>Accounts Overview</h3>
          <p> Time Played: {}</p>
          <p> Win %: {}</p>
          <p> KDA: {}</p>
        </div>
        <button className='btn'>View More Stats</button>
      </div>

      <div className = 'accountsSection'>
          {/* Display each user account as a playercard */}
          <h2 className = 'accountHeader'>Your linked accounts: </h2>
          <button
            className="btnDisabled"
            onClick={() => {
              history.push("/linkAccount");
            }}
            disabled={true}
          >
            Link Another Account
          </button>

          <button 
            className="btn"
            onClick={() => {
                history.push("/user");
            }}
          >
            Cancel
          </button>
        
        <span className = 'removeMessage'>Click an account to remove</span>
        <div className = 'accountsContainerRemove'>
          {
            statsArray &&
            statsArray.map((x, i) => {
              return <PlayerCard key={i} stats={x}/>;
            })
          }
        </div>
        
      </div>
    </div>
  );
}

export default RemoveUserAccount;