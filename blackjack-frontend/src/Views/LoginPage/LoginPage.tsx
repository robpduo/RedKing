import React, { useEffect } from 'react';
import './LoginPage.css';

// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../Components/LoginForm/LoginForm';

// will go inside App tsx
export const LoginPage: React.FC = () => {
  // const userState = useSelector((state: RootState) => state.user);
  // const navigator = useNavigate();

  // useEffect(() => {
  //   if (!userState.error && userState.user) {
  //     navigator('/home');
  //   }
  // }, [userState, userState.error]);

  return (
    <div className="loginPage">
      <LoginForm />
    </div>
  );
};
