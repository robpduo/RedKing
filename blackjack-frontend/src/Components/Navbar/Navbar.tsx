import React, { useEffect } from 'react';
import './Navbar.css';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';

// inside PlayGamePage
export const Navbar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  // const navigator = useNavigate();

  const userInfo = useSelector((state: RootState) => state.user.user);
    console.log("coming from Navbar line 22 useEffect ", userInfo && userInfo.firstName );


  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  // useEffect(() => {
  //   console.log("coming from Navbar line 22 useEffect ", userInfo?.firstName);
  // }, [userInfo]);

  return (
    <nav className="navBar">
      {/* <Link to="/home" className="navMenu">
        <p>{userInfo ? userInfo.firstName : "Anonymous"}</p>
      </Link> */}

      <div className="navMenu">
          <p>{userInfo ? userInfo.firstName : "Anonymous"}</p>
          <button className="moneyBtn">Money</button>
      </div>

    </nav>
  );
};
