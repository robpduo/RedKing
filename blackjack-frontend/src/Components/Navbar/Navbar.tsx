import React, { useEffect } from 'react';
import './Navbar.css';

import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// inside ReimbursementPage
export const Navbar: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();
  // const navigator = useNavigate();

  // const user = useSelector((state: RootState) => state.user.user);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  // useEffect(() => {

  // }, []);

  return (
    <nav className="mNavBar">
      <Link to="/home" className="navMenu">
        <p>Home</p>
      </Link>

      <ul className="navMenu">
        <li className="navItem">
          <Link to="/home" className="navLink">
            Play
          </Link>
        </li>

        <li className="navItem">
          <Link to="/home" className="navLink">
            Quit
          </Link>
        </li>

        <li className="logout">
          <button className="eLogoutBtn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};
