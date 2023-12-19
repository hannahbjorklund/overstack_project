import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';
function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="landingContainer">
      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            and de ysay
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <LoginForm />

          <center>
            <h4></h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
