import React from 'react';
import LoginForm from '../../Components/loginform/loginform';
import login from "/Background/login.jpg";


const Login = () => {
  return (
    <div className='imagebg'>
      <img src={login} alt="Background" />
      <div className="wrapper-login">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;

