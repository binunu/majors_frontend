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
import { useLoginContext } from '../Utill/LogInContext';

const ProfileBox = ({dmIsLogIn,dmGraduated}) => {  
  const [member,setMember] = useState({})
  const [showAlarm,setShowAlarm]=useState(false); 
  const token = localStorage.getItem("accessToken") 
  const {isLogIn, setLogOut} = useLoginContext();

  const activeAlarm=()=>{
    setShowAlarm(!showAlarm)
  }
  useEffect(()=>{ 
    if(isLogIn&&token){
      axiosURL.get(`member/info`,{
        headers :{
          Authorization: `Bearer ${token}`,
        }
      }).then(res=>{
        setMember(res.data)  
        console.log(res.data)
      }).catch(err=>{
        localStorage.removeItem("accessToken")
        setLogOut()  
      })
    }else{
      setMember(null)
    }
  },[])
  const logout=()=>{
    localStorage.removeItem("accessToken") 
    setLogOut()
  }
  return (
    <div id='right-content'> 
    {isLogIn?
    <div id='profile'>
      <div className='container1'>
        <div className='img-box'><img src={`http://localhost:8080/image/view/${member.profile}`} alt='프로필사진'></img></div>
        <div className='txt-box'>
          <div className='t1-box'>
            <p className='t1'>{member.major}전공</p>
            <p className='t2' onClick={logout}>X 로그아웃</p>
          </div> 
          <div className='t3'>
          {
            member.graduated==="Y" && <span>🎓</span>  }
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
          <p className='cnt'>{member.articles?member.articles.length:0}</p>
        </Link>
        <Link to='/mypage/comment' className='m m3'>
          <p><SmsOutlinedIcon className='icon'/>&nbsp;댓글</p>
          <p className='cnt'>{member.comments?member.comments.length:0}</p>
        </Link>
        <Link to='/mypage/scrap' className='m m4'>
          <p><BookmarksOutlinedIcon className='icon'/>&nbsp;스크랩</p>
          <p className='cnt'>{member.scraps?member.scraps.length:0}</p>
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
    {isLogIn&&<Link to='/write' className='write-btn'><PostAddIcon/>&nbsp;글쓰기</Link>}
    </div>
   

  )
}

export default ProfileBox