import React, { useState,useEffect } from 'react'
import './Component.css';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Alarm from './Alarm';  
import axiosURL from '../Utill/AxiosURL';

const ProfileBox = ({dmIsLogIn,dmGraduate}) => {  
  const [member,setMember] = useState(true)
  const [showAlarm,setShowAlarm]=useState(false); 
  const token = localStorage.getItem("accessToken") 
  const activeAlarm=()=>{
    setShowAlarm(!showAlarm)
  }
  useEffect(()=>{
    if(token){
      axiosURL.get(`member/info`,{
        headers :{
          Authorization: `Bearer ${token}`,
        }
      }).then(res=>{
        console.log(res.data)
        setMember(res.data)
      }).catch(err=>{
        console.log("유저 정보를 찾을 수 없습니다!!")
        console.log(err)
      })
    }else{
      setMember(null)
    }
  },[])
  const logout=()=>{
    localStorage.removeItem("accessToken") 
    window.location.reload()
  }
  return (
    <div id='right-content'>
    {member!==null?
    <div id='profile'>
      <div className='container1'>
        <div className='img-box'><img></img></div>
        <div className='txt-box'>
          <div className='t1-box'>
            <p className='t1'>{member.major} 전공자</p>
            <p className='t2' onClick={logout}>X 로그아웃</p>
          </div> 
          <div className='t3'>
          {
            dmGraduate && <span>🎓</span>  }
          <p>{member.nickname}</p> 
          </div>  
          <Link to='/mypage/write' className='t4'>개인정보수정</Link>
        </div>
      </div>
      <div className='container2'>
        <div className={`m m1 ${showAlarm ? 'on':''}`} onClick={activeAlarm}>
          <p><NotificationsNoneIcon className='icon'/>&nbsp;알림</p> 
          <p className='cnt'>3</p>
        </div>
        <Link to='/mypage/write' className='m m2'>
          <p><ArticleOutlinedIcon className='icon'/>&nbsp;게시글</p>
          <p className='cnt'>0</p>
        </Link>
        <Link to='/mypage/reply' className='m m3'>
          <p><SmsOutlinedIcon className='icon'/>&nbsp;댓글</p>
          <p className='cnt'>0</p>
        </Link>
        <Link to='/mypage/scrap' className='m m4'>
          <p><BookmarksOutlinedIcon className='icon'/>&nbsp;스크랩</p>
          <p className='cnt'>0</p>
        </Link>
      </div>
    </div> 
    :
    <div id='profile-not-login'>
      <p className='p'>로그인이 필요한 서비스입니다</p>
      <Link to ='/logIn'className='login' >로그인하기</Link>
      <div className='sub-box'>
      <Link to ='/join'className='sub' >회원가입</Link>
      <Link to ='/find'className='sub' >비밀번호 재설정</Link>
      </div>
      </div>}
    {
      showAlarm &&
      <Alarm/>
    }
    {member&&<Link to='/write' className='write-btn'><PostAddIcon/>&nbsp;글쓰기</Link>}
    </div>
   

  )
}

export default ProfileBox