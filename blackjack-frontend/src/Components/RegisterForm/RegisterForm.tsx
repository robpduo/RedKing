import React, { useState, useEffect } from 'react';
import './RegisterForm.css';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../../Slices/UserSlice';
import { AppDispatch } from '../../Store';

// will go inside RegisterPage
export const RegisterForm: React.FC<any> = (spinner: any) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setlastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  // input change handler
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'firstname') {
      setFirstName(event.target.value);
    } else if (event.target.name === 'lastname') {
      setlastName(event.target.value);
    } else if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  // form submit handler
  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    let credentials = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log('coming from handleRegister line 41 ', credentials);

    dispatch(registerUser(credentials));
    navigator('/playgame');
  };

  return (
    <div className="login">
      {/* text container */}
      <div className="textContainer">
        <h1 className="loginHeader">Please Register Before You Shuffle </h1>
      </div>

      <form className="loginForm">
        {/* for email */}
        <div className="inputDiv">
          <h4 className="inputH4">First Name</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="text"
            name="firstname"
            placeholder="first Name"
            onChange={handleInput}
          />
        </div>

        {/* for password */}
        <div className="inputDiv">
          <h4 className="inputH4">Last Name</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="text"
            name="lastname"
            placeholder="last Name"
            onChange={handleInput}
          />
        </div>

        {/* for password */}
        <div className="inputDiv">
          <h4 className="inputH4">Email</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="email"
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

      <button className="loginButton" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};
