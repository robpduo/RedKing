import React, { useEffect } from 'react';
import './LoginPage.css';

// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../Components/LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Store';

// will go inside App tsx
export const LoginPage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();

  useEffect(() => {
    if (!userInfo.error && userInfo.user) {
      navigator('/login');
    }
  }, [userInfo]);

  return (
    <div className="loginPage">
      <LoginForm />
    </div>
  );
};
