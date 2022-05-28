import React, { useEffect } from 'react';
import './HomeScreen.css';

import { Navbar} from "../../Components/Navbar/Navbar"

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../../store';
// import { useNavigate } from 'react-router-dom';

// go inside App for Route
export const HomeScreen: React.FC = () => {
  // const userInfo = useSelector((state: RootState) => state.user);
  // const dispatch: AppDispatch = useDispatch();

  // const navigator = useNavigate();

  useEffect(() => {
    // if (!userInfo.user) {
    //   navigator('/login');
    // }
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="userInfo">
        <h3>
        Welcome to BlacKing
        </h3>

      </div>

    </>
  );
};
