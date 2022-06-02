import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { HomeScreen } from './Views/HomeScreen/HomeScreen';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { RegisterPage } from './Views/RegisterPage/RegisterPage';
<<<<<<< HEAD
import GameBoard from './Views/GameBoard/GameBoard';
=======
import { PlayGamePage } from './Views/PlayGamePage/PlayGamePage';
import { MoneyPage } from './Views/MoneyPage/MoneyPage';
>>>>>>> efefd117def2af9c2abb39b20042d4b9b2f1b545

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/playgame" element={<LoginPage />} />
        <Route path="/gameboard" element={<GameBoard />} />
=======
        <Route path="/user" element={<RegisterPage />} />
        <Route path="/playgame" element={<PlayGamePage />} />
        <Route path="/money" element={<MoneyPage />} />
>>>>>>> efefd117def2af9c2abb39b20042d4b9b2f1b545
      </Routes>
    </BrowserRouter>
  );
}

export default App;
