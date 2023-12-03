import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'; 
import LogIn from './Page/Member/LogIn';
import Find from './Page/Member/Find';
import Join from './Page/Member/Join';
import ScrollToTop from './ScrollToTop.jsx';
import MainPage from './MainPage';
import ApiTest from './ApiTest.js';

function App() { 
  return (
    <> 
      <Routes>
        <Route path="/*" element={<MainPage/>} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/find" element={<Find />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/apitest" element={<ApiTest />} />
      </Routes> 
      <ScrollToTop />

    </>
  );
}

export default App;
