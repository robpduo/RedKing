import React, { useEffect } from 'react';
import './LoginPage.css';

// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../Components/LoginForm/LoginForm';

// will go inside App tsx
export const LoginPage: React.FC = () => {


  return (
    <div className="loginPage">
      <LoginForm />
    </div>
  );
};
