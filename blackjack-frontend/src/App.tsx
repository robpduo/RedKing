import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { HomeScreen } from './Views/HomeScreen/HomeScreen';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { RegisterPage } from './Views/RegisterPage/RegisterPage';
import GameBoard from './Views/GameBoard/GameBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/playgame" element={<LoginPage />} />
        <Route path="/gameboard" element={<GameBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
