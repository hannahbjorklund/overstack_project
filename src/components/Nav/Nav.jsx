import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user.userReducer);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title"><span className='titleO'>O</span>verStack</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              My Profile
            </Link>

            <Link className="navLink" to="/myFriends">
              My Friends
            </Link>

            <Link className="navLink" to="/myStack">
              My Stack
            </Link>

            

          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>

        {user.id && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
