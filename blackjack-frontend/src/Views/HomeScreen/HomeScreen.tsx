import React, { useEffect } from 'react';
import './HomeScreen.css';

import { Link } from 'react-router-dom';

import { Navbar } from '../../Components/Navbar/Navbar';

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../../store';

// go inside App for Route
export const HomeScreen: React.FC = () => {
  // const userInfo = useSelector((state: RootState) => state.user);
  // const dispatch: AppDispatch = useDispatch();

  // const navigator = useNavigate();

  // const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
  // let credentials = {
  //   email: email,
  //   password: password,
  // };

  // const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   let credentials = {
  //     emailOrUsername: email,
  //     password: password,
  //   };
  // };

  return (
    <>
      {/* <Navbar /> */}
      <div className="homeScreen">
        <h3>Welcome to BlacKing</h3>

        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};
