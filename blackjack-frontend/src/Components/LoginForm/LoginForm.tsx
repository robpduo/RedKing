import React, { useState, useEffect } from 'react';
import './LoginForm.css';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';

import { loginUser } from '../../Slices/UserSlice';
import { AppDispatch } from '../../Store';

// will go inside LoginPage
export const LoginForm: React.FC<any> = (spinner: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();

  // input change handler
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  // form submit handler
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    let credentials = {
      email: email,
      password: password,
    };
    console.log('coming from loginForm line 34 ', credentials);

    dispatch(loginUser(credentials));
  };

  return (
    <div className="login">
      {/* text container */}
      <div className="textContainer">
        <h1 className="loginHeader">BlacKing</h1>
      </div>

      <form className="loginForm">
        {/* for email */}
        <div className="inputDiv">
          <h4 className="inputH4">Email</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="text"
            name="email"
            placeholder="email"
            onChange={handleInput}
          />
        </div>

        {/* for password */}
        <div className="inputDiv">
          <h4 className="inputH4">Password</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInput}
          />
        </div>
      </form>

      <button className="loginButton" onClick={handleLogin}>
        login
      </button>

      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        progressStyle={{ color: '#23ce6b' }}
      /> */}
    </div>
  );
};
