import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory, Link } from 'react-router-dom';
import './LoginPage.css'

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <span>Not a member? </span>
        <span className='registerLink' onClick={() => {
            history.push('/registration');
          }}>Register</span>
      </center>
    </div>
  );
}

export default LoginPage;
