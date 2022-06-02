import React, { useState, useEffect } from 'react';
import './LoginForm.css';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../Slices/UserSlice';
import { AppDispatch } from '../../Store';

// will go inside LoginPage
export const LoginForm: React.FC<any> = (spinner: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

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
    navigator('/gameboard');
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

      <button className="loginBtn" onClick={handleLogin}>
        login
      </button>

      <Link to="/user" className="backToGame">
        Not Registered yet?
      </Link>
    </div>
  );
};
