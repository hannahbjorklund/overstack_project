import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PlayerCard from '../PlayerCard/PlayerCard';

function UserPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const userAccounts = useSelector((store) => store.userAccounts)
  
  useEffect(() => {getUserAccounts()}, []);
  
  function getUserAccounts(){
    dispatch({
      type: 'GET_USER_ACCOUNTS',
      payload: user.id
    })
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Your linked accounts: </p>
      <ul>
        {userAccounts && 
        userAccounts.map((account) => {
          return <li>{account.battletag}</li>
        })}
      </ul>
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
