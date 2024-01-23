import React, { useState,useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './Page/Header';
import Footer from './Page/Footer';
import Home from './Page/Board/Home';
import Community from './Page/Board/Community';
import JobAsList from './Page/Board/JobAsList';
import StudyAsList from './Page/Board/StudyAsList';
import BoardAsPeed from './Page/Board/BoardAsPeed';
import ProfileBox from './Component/ProfileBox';
import OpenChat from './Component/OpenChat';
import ChatIcon from '@mui/icons-material/Chat';
import Write from './Page/Board/Write';
import ArticleDetail from './Page/Board/ArticleDetail.js';
import SearchResult from './Page/Board/SearchResult'; 
import Mypage from './Page/Member/Mypage'; 
import SearchResultPlus from './Page/Board/SearchResultPlus';
import './App.css';
import { useLoginContext } from './Utill/LogInContext';
import Modify from './Page/Board/Modify.js';



const MainPage = () => {
    const [chatRoom, setChatRoom] = useState(false)  
    const {isLogIn}=useLoginContext();
    useEffect(()=>{
      console.log('여기는 App.js, 로그인 상태인가?',isLogIn)
    },[])
    return (
        <> 
        <Header/>
            <div className='content'>
                <div id='main' className='wrap'>
                    <div className='content'>
                        <Routes >
                            <Route exact path="/" element={<Home/>} />
                            <Route path="/community/:major/:pageNum" element={<Community />} />
                            <Route path="/jobAsList/:major/:pageNum" element={<JobAsList />} /> 
                            <Route path="/studyAsList/:major/:pageNum" element={<StudyAsList />} /> 
                            <Route path='/boardAsPeed/:boardType/:middleMajor/:pageNum' element={<BoardAsPeed/>}/>
                            <Route path="/write" element={<Write />} />
                            <Route path="/modify/:id" element={<Modify />} />
                            <Route path="/articleDetail/:id" element={<ArticleDetail/>} />
                            <Route path="/searchResult/:word" element={<SearchResult />} />
                            <Route path="/searchResult/plus/:boardType/:word/:pageNum" element={<SearchResultPlus />} />
                            <Route path="/mypage/:menu" element={<Mypage/>} /> 
                            
                        </Routes>
                    </div>
                    <ProfileBox/>
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

