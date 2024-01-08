import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PlayerCard from "../PlayerCard/PlayerCard";
import './UserPage.css';

function UserPage() {
  console.log("In user page");

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userReducer);
  const userAccounts = useSelector((store) => store.blizzard.userAccounts);
  const statsArray = useSelector((store) => store.stats.statSummaryArray);
  const allStatsArray = useSelector((store) => store.stats.allStatsArray);
  const compiledStats = useSelector((store) => store.stats.compiledStats);

  useEffect(() => {
    getUserAccounts();
  }, []);

  // This is to ensure the userAccounts have been populated before getting each account's stats
  useEffect(() => {
    getStatSummaryArray();
  }, [userAccounts]);

  // Ensure userAccounts has been populated before getting all stats
  useEffect(() => {
    getAllStatsArray();
  }, [userAccounts]);

  useEffect(() => {
    compileStats();
  }, [allStatsArray]);

  // Get a list of the user's linked accounts by dispatching
  function getUserAccounts() {
    dispatch({
      type: "GET_USER_ACCOUNTS",
      payload: user.id,
    });
  }

  // Get an array of stats objects corresponding to each user account. Then, send an array of each 
  //  account's battletags to saga function to get stats summaries
  function getStatSummaryArray() {
    let blizzArray = [];
    userAccounts.map((x) => {
      blizzArray.push({battletag: x.battletag, id: x.blizzard_account_id});
    });
    dispatch({
      type: "GET_STAT_SUMMARY_ARRAY",
      payload: blizzArray,
    });
  }

  // Grab more stats, some of which will be displayed in the user info section
  function getAllStatsArray() {
    let blizzArray = [];
    userAccounts.map((x) => {
      blizzArray.push({battletag: x.battletag, id: x.blizzard_account_id});
    });
    dispatch({
      type: "GET_ALL_STATS_ARRAY",
      payload: blizzArray,
    });
  }

  function compileStats() {
    dispatch({
      type: 'COMPILE_STATS',
      payload: allStatsArray
    })
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
          {compiledStats.total &&
          <>
            <h3>Accounts Overview</h3>
            <p> Time Played: {Math.floor(compiledStats.total.game.time_played/60/60)} hours</p>
            <p> Games Played: {compiledStats.total.game.games_played}</p>
            <p> Win Percentage: {Math.floor(100*(compiledStats.total.game.games_won)/(compiledStats.total.game.games_played))}%</p>
          </>
          }
        </div>
        <button 
          className='btn'
          onClick={() => {
            history.push(`/userStats`);
          }}
        >
          View More Stats
        </button>
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
            Link an Account
          </button>

          <button className="btn" onClick={() => {
              history.push("/removeUserAccount");
            }}>
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