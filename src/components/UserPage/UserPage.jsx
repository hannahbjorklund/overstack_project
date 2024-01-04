import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PlayerCard from '../PlayerCard/PlayerCard';

function UserPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const userAccounts = useSelector((store) => store.blizzard.userAccounts);
  const statsArray = useSelector((store) => store.blizzard.statsArray);

  useEffect(() => {getUserAccounts()}, []);
  useEffect(() => {getStatsArray()}, [userAccounts]);
  
  // Get a list of the user's linked accounts
  function getUserAccounts(){
    dispatch({
      type: 'GET_USER_ACCOUNTS',
      payload: user.id
    })
  }

  // Get an array of stats objects corresponding to each user account
  function getStatsArray(){
    console.log(userAccounts);
    let blizzArray = [];
    userAccounts.map((x) => {
      blizzArray.push(x.battletag)
    })
    dispatch({
      type: 'GET_STATS_ARRAY',
      payload: blizzArray
    })
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Your linked accounts: </p>
      
      {/* Display each user account as a playercard */}
      {statsArray && statsArray.map((x, i) => {
        return <PlayerCard key={i} stats={x}/>
      })}
      
      <button 
        className='btn' 
        onClick={() => {history.push('/linkAccount');}}
      >
        Link an Account
      </button>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
