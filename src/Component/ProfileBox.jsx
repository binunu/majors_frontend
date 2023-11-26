import React, { useState } from 'react'
import './Component.css';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Alarm from './Alarm';  
const ProfileBox = ({setLogInPage,dmIsLogIn,dmGraduate}) => { 

  // const isLogin = false; //로그인여부 수정
  const [showAlarm,setShowAlarm]=useState(false);
  const offProfileBox=()=>{
    setLogInPage(true)
  }
  const ActiveAlarm=()=>{
    setShowAlarm(!showAlarm)
  }
  return (
    <div id='right-content'>
    {dmIsLogIn?
    <div id='profile'>
      <div className='container1'>
        <div className='img-box'><img></img></div>
        <div className='txt-box'>
          <div className='t1-box'>
            <p className='t1'>학과명</p>
            <p className='t2'>X 로그아웃</p>
          </div> 
          <div className='t3'>
          {
            dmGraduate && <span>🎓</span>  }
          <p>병아리는삐약삐약</p> 
          </div> 
          <></><p className='t3'> 병아리는삐약삐약</p> 
          <Link to='/mypage' className='t4'>개인정보수정</Link>
        </div>
      </div>
      <div className='container2'>
        <div className={`m m1 ${showAlarm ? 'on':''}`} onClick={ActiveAlarm}>
          <p><NotificationsNoneIcon className='icon'/>&nbsp;알림</p> 
          <p className='cnt'>10</p>
        </div>
        <div className='m m2'>
          <p><ArticleOutlinedIcon className='icon'/>&nbsp;게시글</p>
          <p className='cnt'>10</p>
        </div>
        <div className='m m3'>
          <p><SmsOutlinedIcon className='icon'/>&nbsp;댓글</p>
          <p className='cnt'>10</p>
        </div>
        <div className='m m4'>
          <p><BookmarksOutlinedIcon className='icon'/>&nbsp;스크랩</p>
          <p className='cnt'>10</p>
        </div>
      </div>
    </div> 
    :
    <div id='profile-not-login'>
      <p className='p'>로그인이 필요한 서비스입니다</p>
      <Link to ='/logIn'className='login' onClick={offProfileBox}>로그인하기</Link>
      <div className='sub-box'>
      <Link to ='/find'className='sub' onClick={offProfileBox}>아이디/비밀번호 찾기</Link>
      <Link to ='/join'className='sub' onClick={offProfileBox}>회원가입</Link>
      </div>
      </div>}
    {
      showAlarm &&
      <Alarm/>
    }
    {dmIsLogIn&&<Link to='/write' className='write-btn'><PostAddIcon/>&nbsp;글쓰기</Link>}
    </div>
   

  )
}

export default ProfileBox