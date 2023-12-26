import React, { useState, useEffect } from 'react'
import './Member.css'
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link, useParams,useNavigate } from 'react-router-dom';
import DelIcon from '@mui/icons-material/ClearOutlined';
import ReReplyIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import CustomModal from '../../Component/CustomModal';
import axiosURL from '../../Utill/AxiosURL';
import Pagination from '../../Component/Pagination';

const Mypage = ({ dmGraduate }) => {
  const { menu } = useParams()
  const [board, setboard] = useState([])
  const [cBoard, setCboard] = useState([])
  const navigate = useNavigate()
  //닉네임수정관련 
  const [nickCheckMessage, setNickCheckMessage] = useState('')
  const [nickCheckBtn, setNickCheckBtn] = useState(false)
  const [isAbleNickname, setIsAbleNicname] = useState(false)
  //졸업여부수정관련
  const [isGraduate, setIsGraduate] = useState('yes-btn')
  //수정하기버튼
  const [activeUpdateBtn, setActiveUpdateBtn] = useState(false)
  //내활동 메뉴선택
  const [selectMenu, setSelectMenu] = useState(menu) // write/ reply/ scrap / goods/ bads
  //모달타입, 모달 on/off
  const [onModal, setOnModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const token = localStorage.getItem('accessToken')
  const [pageInfo, setPageInfo] = useState({})
  const [page, setPage] = useState(1)

  const [removeItem,setRemoveItem] = useState({})
  useEffect(() => {
    getArticles() 
  }, [menu, selectMenu, page])
  const getArticles = () => {
    axiosURL.get(`/member/log/${selectMenu}/${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (selectMenu === 'comment') {
        setCboard(res.data.list) 
      } else {
        setboard(res.data.list) 
      }
      console.log(res.data.pageInfo)
      setPageInfo(res.data.pageInfo)
    })
  }
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

  //메뉴변경
  const changeArticle = (menu) => {
    setSelectMenu(menu) 
    setPage(1) 
  }

  //페이지변경
  const changePage = (pPage) => {
    setPage(pPage)
  }

  const categoryToText = (menu) => {
    switch (menu) {
      case 'study':
        return '공부궁물'
      case 'job':
        return '진로궁물'
      case 'community':
        return '자유게시판'
    }
  }
// ========================== 삭제관련 ===============================
 
  //모달띄우기
  const onDelModal = (type,item,articleId,commentId,replyId) => { 
    switch (type) {
      case 'write':
        setRemoveItem({ type: type, articleId: articleId }) 
        break;
      case 'comment':
        if(item==='comment'){
          setRemoveItem({ type: item, articleId: articleId, commentId:commentId }) 
        }else if(item==='reply'){
          setRemoveItem({ type: item, articleId: articleId,commentId:commentId,replyId:replyId}) 
        }
      break; 
      case 'scrap':
        setRemoveItem({ type: type, articleId: articleId }) 
        break;
      case 'good':
        setRemoveItem({ type: type, articleId: articleId }) 
        break;
      case 'bad':
        setRemoveItem({ type: type, articleId: articleId }) 
        break;
    } 
    setModalType(type)
    setOnModal(true) 
  }
  //삭제
  const removeSubmit=()=>{
    switch(removeItem.type){
      case 'write':
        removeArticle(removeItem.articleId)
        break;
      case 'comment': 
        removeComment(removeItem.articleId,removeItem.commentId)
      break; 
      case 'reply': 
        removeReply(removeItem.articleId,removeItem.commentId,removeItem.replyId) 
        break;
      case 'scrap':
        removeScrap(removeItem.articleId)
        break;
      case 'good':
        removeGood(removeItem.articleId)
        break;
      case 'bad':
        removeBad(removeItem.articleId)
        break;
    }
  }
  const removeArticle=(articleId)=>{ 
    axiosURL.delete(`/board/delete/article/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("게시글이 삭제되었습니다!")  
    }).catch(err => console.log(err))
  }
  const removeComment=(articleId,commentId)=>{
    axiosURL.delete(`/board/delete/comment/${articleId}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("댓글이 삭제되었습니다!") 
    }).catch(err => console.log(err))
  }
  const removeReply=(articleId,commentId,replyId)=>{
    axiosURL.delete(`/board/delete/reply/${articleId}/${commentId}/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("답글이 삭제되었습니다!") 
    }).catch(err => console.log(err))
  }
  const removeScrap=(articleId)=>{
    axiosURL.post(`/contents/bookmark/${articleId}`,{}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("스크랩이 제거되었습니다!") 
    }).catch(err => console.log(err))
  }
  const removeGood=(articleId)=>{
    axiosURL.put(`/contents/reaction/${articleId}`,{reactionType:"T"}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("좋아요가 취소되었습니다!") 
    }).catch(err => console.log(err))
  }
  const removeBad=(articleId)=>{
    axiosURL.put(`/contents/reaction/${articleId}`, {reactionType:"F"},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("싫어요가 취소되었습니다!") 
    }).catch(err => console.log(err))
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
            <div><Link to='/find' className='info-p3'>비밀번호 변경</Link><input type='button' className='info-p3 input' value='회원탈퇴' onClick={() => { onDelModal('leave') }} /> </div>

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
            <li className={`li ${selectMenu === 'write' ? 'on' : ''}`} onClick={() => { changeArticle('write') }}>내가 쓴 글</li>
            <li className={`li ${selectMenu === 'comment' ? 'on' : ''}`} onClick={() => { changeArticle('comment') }}>내가 남긴 댓글</li>
            <li className={`li ${selectMenu === 'scrap' ? 'on' : ''}`} onClick={() => { changeArticle('scrap') }}>스크랩</li>
            <li className={`li ${selectMenu === 'good' ? 'on' : ''}`} onClick={() => { changeArticle('good') }}>좋아요한 글</li>
            <li className={`li ${selectMenu === 'bad' ? 'on' : ''}`} onClick={() => { changeArticle('bad') }}>싫어요한 글</li>
          </ul>
          <div className='log-list'>
            <div>

              <p className='p'><b>총 {pageInfo.total}건의 활동</b></p>
              {
                selectMenu === 'comment' ?
                  <>
                    {cBoard.length > 0 ?
                      cBoard.map((item, index) => (
                        <>
                          {
                            item.type === 'comment' ?
                              <div className='comment-box' key={index}>
                                <div className='article c'>
                                  <div className='c-content'>{item.content}</div>
                                  <div className='icon-box c'>
                                    <ReplyIcon className='icon' />&nbsp;{item.replyCnt}&nbsp;&nbsp;
                                    <GoodIcon className='icon c' />&nbsp;{item.sympathyCnt}&nbsp;&nbsp;
                                    <span className='icon c del-icon' onClick={() => { onDelModal(selectMenu,'comment',item.articleId,item.commentId) }}>삭제</span>
                                  </div>
                                </div>
                                <Link to={`/articleDetail/${item.articleId}`} className='title c'><ReReplyIcon className='icon'/><b>[{categoryToText(item.articleBoardType)}]</b>&nbsp;{item.articleTitle}</Link>
                              </div>
                              :
                              <div className='comment-box' key={index}>
                                <div className='article c'>
                                  <div className='c-content'>{item.content}</div>
                                  <div className='icon-box c'>
                                    <GoodIcon className='icon c' />&nbsp;{item.sympathyCnt}&nbsp;&nbsp; 
                                    <span className='icon c del-icon' onClick={() => { onDelModal(selectMenu,'reply',item.articleId,item.commentId,item.replyId) }}>삭제</span>
                                  </div>
                                </div>
                                <Link to={`/articleDetail/${item.articleId}`} className='title c'><ReReplyIcon className='icon'/><b>[{categoryToText(item.articleBoardType)}]</b>&nbsp;{item.articleTitle}</Link>
                              </div>
                          }
                        </>
                      )) 
                      :
                      <div className='empty' key="empty-comment">"작성하신 댓글이 존재하지 않습니다!"</div>
                    }
                  </>
                  :
                  <>
                    {board.length > 0 ?
                      board.map((item, index) => (
                        <div className='article' key={index}>
                          <Link to={`/articleDetail/${item.id}`} className='title'><b>[{categoryToText(item.boardType)}]</b>&nbsp;{item.title}</Link>
                          <div className='icon-box'>
                            <GoodIcon className='icon' />&nbsp;{item.goods}&nbsp;&nbsp;
                            <ReplyIcon className='icon' />&nbsp;{item.commentCnt}&nbsp;&nbsp;
                            {/* <DelIcon className='icon c del-icon' onClick={()=>{onDelModal(selectMenu)}}/> */}
                            <span className='icon del-icon' onClick={() => { onDelModal(selectMenu,'article',item.id) }}>삭제</span>
                          </div>
                        </div>
                      ))
                      :
                      <div className='empty' key="empty-article">"활동이 존재하지 않습니다!"</div>
                    }
                  </>
              }

            </div>
            {
              <div className='pagenation mypage'><Pagination pageInfo={pageInfo} changePage={changePage}></Pagination> </div>
            }
          </div>
        </div>
      </div>
      {onModal && <CustomModal type={modalType} setOnModal={setOnModal} removeSubmit={removeSubmit} />}
    </div>
  )
}

export default Mypage