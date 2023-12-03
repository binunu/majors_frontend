import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './Page/Header';
import Footer from './Page/Footer';
import DevelopMode from './Page/DevelopMode';
import Home from './Page/Board/Home';
import Community from './Page/Board/Community';
import JobAsList from './Page/Board/JobAsList';
import JobAsPeed from './Page/Board/JobAsPeed';
import StudyAsList from './Page/Board/StudyAsList';
import StudyAsPeed from './Page/Board/StudyAsPeed';
import ProfileBox from './Component/ProfileBox';
import OpenChat from './Component/OpenChat';
import ChatIcon from '@mui/icons-material/Chat';
import Write from './Page/Board/Write';
import ArticleDetail from './Page/Board/ArticleDetail.js';
import SearchResult from './Page/Board/SearchResult'; 
import Mypage from './Page/Member/Mypage'; 
import SearchResultPlus from './Page/Board/SearchResultPlus';
import './App.css';


const MainPage = () => {
    const [chatRoom, setChatRoom] = useState(false) 
    const [dmIsLogIn, setDmIsLogIn] = useState(false)
    const [dmGraduate, setDmGraduate] = useState(false)
    return (
        <>
        <DevelopMode setDmIsLogIn={setDmIsLogIn} setDmGraduate={setDmGraduate} />
        <Header/>
            <div className='content'>
                <div id='main' className='wrap'>
                    <div className='content'>
                        <Routes >
                            <Route exact path="/" element={<Home dmIsLogIn={dmIsLogIn} />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/jobAsList" element={<JobAsList />} />
                            <Route path="/jobAsPeed" element={<JobAsPeed />} />
                            <Route path="/studyAsList" element={<StudyAsList />} />
                            <Route path="/studyAsPeed" element={<StudyAsPeed dmGraduate={dmGraduate} />} />
                            <Route path="/write" element={<Write />} />
                            <Route path="/articleDetail" element={<ArticleDetail dmGraduate={dmGraduate} />} />
                            <Route path="/searchResult/:word" element={<SearchResult />} />
                            <Route path="/searchResult/plus/:boardType/:word" element={<SearchResultPlus />} />
                            <Route path="/mypage/:menu" element={<Mypage dmGraduate={dmGraduate} />} />
                        </Routes>
                    </div>
                    <ProfileBox dmIsLogIn={dmIsLogIn} dmGraduate={dmGraduate} />
                </div>
            </div>
            <div id='open-chat' onClick={() => setChatRoom(!chatRoom)}>
                <ChatIcon className='icon' />
                {!chatRoom && <p className='text'>오픈채팅 입장</p>}
                {chatRoom && <p className='text'>나가기</p>}
            </div>
            {chatRoom && <OpenChat />}
        <Footer />
        </>

    )
}

export default MainPage

