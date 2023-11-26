import Header from './Page/Header';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Page/Footer';
import Home from './Page/Board/Home';
import Community from './Page/Board/Community.jsx';
import JobAsList from './Page/Board/JobAsList';
import JobAsPeed from './Page/Board/JobAsPeed.jsx';
import StudyAsList from './Page/Board/StudyAsList';
import StudyAsPeed from './Page/Board/StudyAsPeed';
import ProfileBox from './Component/ProfileBox';
import OpenChat from './Component/OpenChat';
import { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import Write from './Page/Board/Write';
import LogIn from './Page/Member/LogIn';
import Find from './Page/Member/Find';
import Join from './Page/Member/Join';
import DevelopMode from './Page/DevelopMode';
import ArticleDetail from './Page/Board/ArticleDetail.js'; 
import SearchResult from './Page/Board/SearchResult.js';
import SearchResultPlus from './Page/Board/SearchResultPlus.js';
import Mypage from './Page/Member/Mypage.js';
import ScrollToTop from './ScrollToTop.jsx';
function App() {
  const [chatRoom, setChatRoom] = useState(false)
  const [logInPage, setLogInPage] = useState(false)
  const [dmIsLogIn,setDmIsLogIn] = useState(false)
  return (
    <>
    <DevelopMode setDmIsLogIn={setDmIsLogIn}/>
      <Header setLogInPage={setLogInPage} />
      <div id='main' className='wrap'>
        {logInPage ?
          <Routes>
            <Route exact path="/login" element={<LogIn/>} />
            <Route exact path="/find" element={<Find/>} />
            <Route exact path="/join" element={<Join/>} />
          </Routes>
          :
          <>
            <div className='content'>
              <Routes>
                <Route exact path="/" element={<Home setLogInPage={setLogInPage} dmIsLogIn={dmIsLogIn}/>} />
                <Route path="/community" element={<Community />} />
                <Route path="/jobAsList" element={<JobAsList />} />
                <Route path="/jobAsPeed" element={<JobAsPeed />} />
                <Route path="/studyAsList" element={<StudyAsList />} />
                <Route path="/studyAsPeed" element={<StudyAsPeed />} />
                <Route path="/write" element={<Write/>} />
                <Route path="/articleDetail" element={<ArticleDetail/>} />
                <Route path="/searchResult/:word" element={<SearchResult/>} />
                <Route path="/searchResult/plus/:boardType/:word" element={<SearchResultPlus/>} />
                <Route path="/mypage" element={<Mypage/>} /> 
              </Routes>
            </div>
            <ProfileBox setLogInPage={setLogInPage} dmIsLogIn={dmIsLogIn}/>
          </>
        }
      </div>
      <div id='open-chat' onClick={() => setChatRoom(!chatRoom)}>
        <ChatIcon className='icon' />
        {!chatRoom && <p className='text'>오픈채팅 입장</p>}
        {chatRoom && <p className='text'>나가기</p>}
      </div>
      {chatRoom && <OpenChat />}
      <ScrollToTop/>
      <Footer />
    </>
  );
}

export default App;
