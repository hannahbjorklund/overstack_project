import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();
  console.log("Im in register!")

  return (
    <div>
      <RegisterForm />

      <center>
        <div 
          className = 'loginLink'
          onClick={() => {history.push('/login');}}
          >
          Back to Login
        </div>
      </center>
    </div>
  );
}

export default RegisterPage;