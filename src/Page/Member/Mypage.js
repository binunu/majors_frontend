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
import { useLoginContext } from '../../Utill/LogInContext';  

const Mypage = () => {
  const { menu } = useParams()
  //수정객체
  const [member,setMember] = useState({})
  const [nickname, setNickname] = useState()
  const [largeMajor, setLargeMajor] =useState()
  const [middleMajor, setMiddleMajor] = useState()
  const [smallMajor, setSmallMajor] = useState()
  const [isGraduated, setIsGraduated] = useState()
 
  const [board, setboard] = useState([])
  const [cBoard, setCboard] = useState([])
  const navigate = useNavigate()
  //닉네임수정관련 
  const [nickCheckMessage, setNickCheckMessage] = useState('')
  const [nickCheckBtn, setNickCheckBtn] = useState(false)
  const [isAbleNickname, setIsAbleNicname] = useState(false) 
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
  const {setLogOut} = useLoginContext();
  useEffect(()=>{
    axiosURL.get('/member/info/simple',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=>{
      setMember(res.data)
      setLargeMajor(res.data.largeMajor)
      setMiddleMajor(res.data.middleMajor)
      setNickname(res.data.nickname)
      setIsGraduated(res.data.graduated) 
      setSmallMajor(res.data.major)
    }).catch(err=>console.log(err))
  },[])
  useEffect(() => {
    getArticles(page) 
  }, [menu, selectMenu, page])

  const getArticles = (pPage) => {
    axiosURL.get(`/member/log/${selectMenu}/${pPage}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (selectMenu === 'comment') {
        setCboard(res.data.list) 
      } else {
        setboard(res.data.list) 
      } 
      setPageInfo(res.data.pageInfo)
    })
  } 
  const onNickBtn = (e) => { 
    setNickname(e.target.value)  
    if(e.target.value===member.nickname){
      setNickCheckBtn(false)
      setNickCheckMessage('')
    }else{
      setNickCheckBtn(true)
    } 
  }
  const nicknameCheck = () => {
    // 닉네임중복확인    
    console.log(nickname)
      axiosURL.get('/member/nickname/exist', {
        params: { nickname: nickname }
      }).then(res => {
        console.log(res.data)
        if (res.data) {
          setNickCheckMessage('변경 가능한 닉네임입니다')
          setIsAbleNicname(true)
          setActiveUpdateBtn(true)
        } else {
          setNickCheckMessage('이미 존재하는 닉네임입니다')
          setIsAbleNicname(false)
        }
      }).catch(err => {
        console.log(err)
      })  
  }
  //졸업여부변경
  const changeGdBtn = (e) => {  
    setIsGraduated(e.target.value)
      setActiveUpdateBtn(true) 
  }
  //전공수정
  const changeMajor=()=>{
    // setOnChangeMajorModal(true)
    window.name = 'mypage'
    const newWindow = window.open(`/ChangeMajorModal?major=${member.major}`,'_blank', 'width=500,height=400')
    if(newWindow){
      newWindow.setMajorObject= (large,middle,small)=>{
        setLargeMajor(large)
        setMiddleMajor(middle)
        setSmallMajor(small)
        setActiveUpdateBtn(true) 
      } 
    } 
  }  
  const update = () => {
    //폼데이터로변경?
    // console.log(nickname, largeMajor, middleMajor, smallMajor, isGraduated) 
    const user = {
      nickname: nickname,  
      largeMajor : largeMajor, 
      middleMajor : middleMajor, 
      major : smallMajor,  
      graduated : isGraduated 
    }   
    axiosURL.post('/member/update',user,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=>{
      alert("변경되었습니다!")
      window.location.reload()
    }).catch(err=>console.log(err))
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
  const onWithdrawalModal=()=>{
    onDelModal('leave')
    setModalType('leave')
    setOnModal(true) 
    setRemoveItem({ type:'leave'})
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
      case 'leave':
        withdraw()
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
      getArticles(1)
      // window.location.reload();
    }).catch(err => console.log(err))
  }
  const removeComment=(articleId,commentId)=>{
    axiosURL.delete(`/board/delete/comment/${articleId}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("댓글이 삭제되었습니다!") 
      getArticles(1)
    }).catch(err => console.log(err))
  }
  const removeReply=(articleId,commentId,replyId)=>{
    axiosURL.delete(`/board/delete/reply/${articleId}/${commentId}/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("답글이 삭제되었습니다!") 
      getArticles(1)
    }).catch(err => console.log(err))
  }
  const removeScrap=(articleId)=>{
    axiosURL.post(`/contents/bookmark/${articleId}`,{}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("스크랩이 제거되었습니다!") 
      getArticles(1)
    }).catch(err => console.log(err))
  }
  const removeGood=(articleId)=>{
    axiosURL.put(`/contents/reaction/${articleId}`,{reactionType:"T"}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("좋아요가 취소되었습니다!")
      getArticles(1) 
    }).catch(err => console.log(err))
  }
  const removeBad=(articleId)=>{
    axiosURL.put(`/contents/reaction/${articleId}`, {reactionType:"F"},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("싫어요가 취소되었습니다!") 
      getArticles(1)
    }).catch(err => console.log(err))
  }
  const withdraw=()=>{
    axiosURL.delete('/member/withdrawal',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("회원탈퇴가 완료되었습니다.") 
      localStorage.removeItem('accessToken')
      setLogOut()
      navigate('/')
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
                member.graduated==="Y" && <span>🎓</span>}
              <p className='info-p1'>{member.nickname}</p>
            </div>

            <p className='info-p'>{member.name}</p>
            <p className='info-p'>{member.email}</p>
            <p className='info-p'>가입일&nbsp;&nbsp;{member.joinedAt}</p>
            <div><Link to='/find' className='info-p3'>비밀번호 변경</Link><input type='button' className='info-p3 input' value='회원탈퇴' onClick={onWithdrawalModal} /> </div>

          </div>
          <div className='update'>
            <div className='row1'>
              <div className='row'>
                <p className='row-t'>닉네임</p>
                <input className='row-2' defaultValue={member.nickname} onChange={onNickBtn}></input>
                {
                  nickCheckBtn ? 
                  <button className= 'nic-btn on' onClick={nicknameCheck}>중복확인</button>
                  :
                  <button className= 'nic-btn' >중복확인</button>
                }
            
              </div>
              <p className={`check ${isAbleNickname ? 'pass' : ''}`}>{nickCheckMessage}</p>
            </div>
            <div className='row'>
              <p className='row-t'>전공</p>
              <input className='major' disabled value={smallMajor}/> 
              <button className='major-btn' onClick={changeMajor}>변경하기</button>
            </div> 
            <div className='row'>
              <p className='row-t'>졸업여부</p>
              <button className={`gd-btn ${isGraduated === 'Y' ? 'select' : ''}`} value='Y' onClick={changeGdBtn}>예</button>
              <button className={`gd-btn no ${isGraduated === 'N' ? 'select' : ''}`} value='N' onClick={changeGdBtn}>아니오</button>
            </div>
            {
              activeUpdateBtn ? 
              <button className={`update-btn no on`} onClick={update}>수정하기</button>
              :
              <button className={`update-btn no`} >수정하기</button>
            }
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
      {/* {onChangeMajorModal && <ChangeMajorModal setMajorObject={setMajorObject} largeMajor={member.largeMajor} middleMajor={member.middleMajor} smallMajor={member.major} />} */}
    </div>
  )
}

export default Mypage