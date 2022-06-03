import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { HomeScreen } from './Views/HomeScreen/HomeScreen';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { RegisterPage } from './Views/RegisterPage/RegisterPage';
import { PlayGamePage } from './Views/PlayGamePage/PlayGamePage';
import { MoneyPage } from './Views/MoneyPage/MoneyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<RegisterPage />} />
        <Route path="/playgame" element={<PlayGamePage />} />
        <Route path="/money" element={<MoneyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
