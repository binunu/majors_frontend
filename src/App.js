import Header from './Page/Header';
import React,{useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Page/Footer';
import LogIn from './Page/Member/LogIn';
import Find from './Page/Member/Find';
import Join from './Page/Member/Join';
import DevelopMode from './Page/DevelopMode';
import ScrollToTop from './ScrollToTop.jsx';
import MainPage from './MainPage';

function App() {
  const [dmIsLogIn, setDmIsLogIn] = useState(false)
  const [dmGraduate, setDmGraduate] = useState(false)
  return (
    <>
      <DevelopMode setDmIsLogIn={setDmIsLogIn} setDmGraduate={setDmGraduate} />
      <Header/>
      <Routes>
        <Route path="/main/*" element={<MainPage dmIsLogIn={dmIsLogIn} dmGraduate={dmGraduate}/>} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/find" element={<Find />} />
        <Route exact path="/join" element={<Join />} />
      </Routes>

      <ScrollToTop />
      <Footer />

    </>
  );
}

export default App;
