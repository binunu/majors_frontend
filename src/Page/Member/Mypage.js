import React, { useState,useEffect } from 'react'
import './Member.css'
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link,useParams } from 'react-router-dom';
import DelIcon from '@mui/icons-material/ClearOutlined';
import CustomModal from '../../Component/CustomModal';

const Mypage = ({ dmGraduate }) => { 
  const { menu } = useParams()
  const [board, setboard] = useState([{ boardType: '자유게시판', title: '시간 복잡도와 공간 복잡도의 차이', replyCnt: 10, goodCnt: 20, content: '알고리즘에서 시간 복잡도와 공간 복잡도의 차이점에 대해 궁금합니다.' },
  { boardType: '공부궁물', title: 'TCP와 UDP의 차이점', replyCnt: 15, goodCnt: 25, content: '네트워크에서 TCP와 UDP의 특징과 각각의 용도에 대해 알고 싶습니다.' },
  { boardType: '진로궁물', title: '머신러닝과 딥러닝의 차이', replyCnt: 12, goodCnt: 22, content: '인공지능 분야에서 머신러닝과 딥러닝의 차이와 활용 방법에 대해 알고 싶어요.' },
  { boardType: '공부궁물', title: 'SPA와 MPA의 장단점', replyCnt: 8, goodCnt: 18, content: '웹 개발에서 SPA와 MPA의 장단점과 적합한 상황에 대해 알려주세요.' },
  { boardType: '자유게시판', title: '암호화 기술의 종류와 원리', replyCnt: 20, goodCnt: 30, content: '보안 분야에서 사용되는 암호화 기술의 종류와 작동 원리를 알고 싶습니다.' },
  ]);
 
  //닉네임수정관련 
  const [nickCheckMessage, setNickCheckMessage] = useState('')
  const [nickCheckBtn, setNickCheckBtn] = useState(false)
  const [isAbleNickname, setIsAbleNicname] = useState(false)
  //졸업여부수정관련
  const [isGraduate, setIsGraduate] = useState('yes-btn')
  //수정하기버튼
  const [activeUpdateBtn, setActiveUpdateBtn] = useState(false) 
  //내활동 메뉴선택
  const [selectMenu, setSelectMenu] = useState('') // write/ reply/ scrap / good/ bad
  //모달타입, 모달 on/off
  const [onModal, setOnModal] = useState(false)
  const [modalType,setModalType] = useState('') 

  useEffect(()=>{  
      setSelectMenu(menu)   
  },[menu])

  //졸업생여부관련
  const onNickBtn = (e) => {
    setNickCheckBtn(true)
  }
  const nicknameCheck = () => {
    // 닉네임중복확인  
    // 결과에 따라 메세지 변경
    const dmTest = false
    if (dmTest) {
      setNickCheckMessage('변경 가능한 닉네임입니다')
      setIsAbleNicname(true)
      setActiveUpdateBtn(true) //수정버튼
    } else {
      setNickCheckMessage('이미 존재하는 닉네임입니다')
      setIsAbleNicname(false)
    }
  }
  const changeGdBtn = (e) => {
    setIsGraduate(e.target.id)
    setActiveUpdateBtn(true) //수정버튼
  }
  const update = () => {
    //수정점있는지확인 후 수정하기
  }

  const changeArticle=(menu)=>{
    setSelectMenu(menu)
    // 받아온 articles로 초기화하기
  } 
 
  //모달띄우기
  const onDelModal=(type)=>{
    setModalType(type)
    setOnModal(true)  
  }


  return (
    <div id='mypage'>
      <div className='container'>
        <div className='top'>내 정보</div>
        <div className='content1'>
          <div className='info'> 
              <div className='img'><img src='' alt='프로필사진'></img></div>

              <div className='info-icon'>
                {
                  dmGraduate && <span>🎓</span>}
                <p className='info-p1'>병아리는삐약삐약</p>
              </div>

              <p className='info-p'>홍길동</p>
              <p className='info-p'>llsbdm@naver.com</p>
              <p className='info-p'>가입일&nbsp;&nbsp;2023-07-11</p>
              <div><Link to='#' className='info-p3'>비밀번호 변경</Link><input type='button' className='info-p3 input' value='회원탈퇴' onClick={()=>{onDelModal('leave')}} /> </div>
            
          </div>
          <div className='update'>
            <div className='row1'>
              <div className='row'>
                <p className='row-t'>닉네임</p>
                <input className='row-2' defaultValue='병아리는삐약삐약' onChange={onNickBtn}></input>
                <button className={`nic-btn ${nickCheckBtn ? 'on' : ''}`} onClick={nicknameCheck}>중복확인</button>
              </div>
              <p className={`check ${isAbleNickname ? 'pass' : ''}`}>{nickCheckMessage}</p>
            </div>
            <div className='row'>
              <p className='row-t'>학과/전공</p>
              <select className='major' onChange={() => { setActiveUpdateBtn(true) }}>
                <option>국어국문</option>
                <option>항공</option>
                <option>국제물류</option>
                <option>법학과</option>
              </select>
            </div>
            <div className='row'>
              <p className='row-t'>졸업여부</p>
              <button id='yes-btn' className={`gd-btn ${isGraduate === 'yes-btn' ? 'select' : ''}`} onClick={changeGdBtn}>예</button>
              <button id='no-btn' className={`gd-btn no ${isGraduate === 'no-btn' ? 'select' : ''}`} onClick={changeGdBtn}>아니오</button>
            </div>
            <button className={`update-btn no ${activeUpdateBtn ? 'on' : ''}`} onClick={update}>수정하기</button>
          </div>
        </div>
      </div>
      <div className='container'>
        <div id='my-activity' className='top'>내 활동</div>
        <div className='content2'>
          <ul className='menu-box'>
            <li className={`li ${selectMenu==='write'?'on':''}`}  onClick={()=>{changeArticle('write')}}>내가 쓴 글</li>
            <li className={`li ${selectMenu==='reply'?'on':''}`} onClick={()=>{changeArticle('reply')}}>내가 남긴 댓글</li>
            <li className={`li ${selectMenu==='scrap'?'on':''}`} onClick={()=>{changeArticle('scrap')}}>스크랩</li>
            <li className={`li ${selectMenu==='good'?'on':''}`} onClick={()=>{changeArticle('good')}}>좋아요한 글</li>
            <li className={`li ${selectMenu==='bad'?'on':''}`} onClick={()=>{changeArticle('bad')}}>싫어요한 글</li>
          </ul>
          <div className='log-list'>
            <p className='p'><b>총 5개의 글 작성</b></p>
            {
              board.length ? 
                board.map((item, index) => (
                  <div className='article' key={index}>
                    <Link to='/articleDetail' className='title'><b>[{item.boardType}]</b>&nbsp;{item.title}</Link>
                    <div className='icon-box'>
                      <GoodIcon className='icon' />&nbsp;{item.goodCnt}&nbsp;&nbsp;
                      <ReplyIcon className='icon' />&nbsp;{item.replyCnt}&nbsp;&nbsp;
                      <DelIcon className='icon del-icon' onClick={()=>{onDelModal(selectMenu)}}/>
                    </div> 
                  </div> 
                )) 
                :
                <div className='empty'>"활동이 존재하지 않습니다!"</div>
            }
            {
               board.length &&
               <div className='pagenation'>0 1 2 3 4 5 6 7 8 9</div>
            }
          </div> 
        </div>
      </div>
      {onModal&&<CustomModal type={modalType} setOnModal={setOnModal}/>}
    </div>
  )
}

export default Mypage