import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './Page/Member/LogIn';
import Find from './Page/Member/Find';
import Join from './Page/Member/Join';
import MainPage from './MainPage';
import Error from './Error.js';
import ScrollToTop from './Utill/ScrollToTop.jsx';
import { LogInProvider } from './Utill/LogInContext';

function App() { 
  return (
    <LogInProvider> 
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/find" element={<Find />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/error" element={<Error />} />
      </Routes>
      <ScrollToTop />
    </LogInProvider>

  );
}

export default App;
