import React, { useEffect } from 'react';
import './Navbar.css';
import { LogOutButton } from '../LogOutButton/LogOutButton';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';

// inside PlayGamePage
export const Navbar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  // const navigator = useNavigate();

  const userInfo = useSelector((state: RootState) => state.user.user);
  console.log('coming from Navbar line 15 ', userInfo);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  // useEffect(() => {
  //   console.log("coming from Navbar line 22 useEffect ", userInfo?.firstName);
  // }, [userInfo]);

  return (
    <nav className="navBar">
      <div className="navMenu">
        <p>{userInfo ? userInfo.firstName : 'Anonymous'}</p>
        <div className="moneyContainer">
          <p>{userInfo ? `$${userInfo.money}` : '$0.00'}</p>
          <Link to="/money">
            <button className="moneyBtn">Add Money</button>
          </Link>

          <LogOutButton />
        </div>
      </div>
    </nav>
  );
};
