import React, { useState, useRef, useEffect } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import MajorSelect from '../../Component/MajorSelect'
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeedIcon from '@mui/icons-material/DashboardOutlined';
import TimeIcon from '@mui/icons-material/AccessTime';
import CustomModal from '../../Component/CustomModal';
import ReReplyIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import ScrollToTopIcon from '@mui/icons-material/ArrowUpwardOutlined';
import axiosURL from '../../Utill/AxiosURL';
import { useLoginContext } from '../../Utill/LogInContext';

const BoardAsPeed = () => {
  const navigate = useNavigate()
  const { boardType, middleMajor,pageNum } = useParams();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [articles, setArticles] = useState([])
  const [type, setType] = useState('false') //modalType  
  const token = localStorage.getItem('accessToken');
  const { isLogIn } = useLoginContext();

  const [onModal, setOnModal] = useState(false);

  const [curMember, setCurMember] = useState();
  const [onGood, setOnGood] = useState({}); //변경
  const [onBad, setOnBad] = useState({}); //변경

  const [commentText, setCommentText] = useState({}); //변경
  const [replyText, setReplyText] = useState({})
  //답글관련
  const commentRef = useRef(null);
  const [replyVisible, setReplyVisible] = useState([]);

  const contentRef = useRef(null); //댓글창 슬라이드로 내리기
  const [commentsVisible, setCommentsVisible] = useState({});

  const [boardTypeText, setBoardTypeText] = useState("")
  const [pageInfo, setPageInfo] = useState({})
  
  const [removeItem,setRemoveItem]=useState({})
  useEffect(() => {
    switch (boardType) {
      case 'study':
        setBoardTypeText('공부궁물')
        break;
      case 'job':
        setBoardTypeText('진로궁물')
        break;
      case 'community':
        setBoardTypeText('자유게시판')
        break;
    }
    if (isLogIn) {
      axiosURL.get('/member/info/simple', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => setCurMember(res.data)).
        catch(err => console.log(err))
    }

    getArticles(boardType, middleMajor, pageNum)
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [boardType,middleMajor])

  const getArticles = (type,category,page) => {
    console.log(type, category) 
    axiosURL.get(`/board/article/peed/${type}/${category}/${page}`)
      .then(res => {
        setArticles(res.data.list)
        // setArticles(prevArticles => [...prevArticles, ...res.data.list]);  
        setPageInfo(res.data.pageInfo)
      }).catch(err => console.log(err))
  }
  const changeMajor=(pmajor)=>{
    navigate(`/boardAsPeed/${boardType}/${pmajor}/1`)
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const plusArticles=(page)=>{
    axiosURL.get(`/board/article/peed/${boardType}/${middleMajor}/${page}`)
    .then(res => {
      setArticles(prevArticles => [...prevArticles, ...res.data.list]);  
      setPageInfo(res.data.pageInfo)
    }).catch(err => console.log(err)) 
  }
  
  // ============================ article detail ============================
  const stamp = (e, id) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.");
    } else {
      const reactionType = e.target.value;
      axiosURL.put(`/contents/reaction/${id}`, { reactionType: reactionType }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => { 
        setArticles(prev => 
          prev.map(item =>
            item.id === id ? { ...item, goods: res.data.goods, bads: res.data.bads } : item
          )
        );
  
        if (res.data.state === "T") {
          setOnGood({...onGood, [id] : true});
          setOnBad({...onBad, [id] : false});
        } else if (res.data.state === "F") {
          setOnGood({...onGood, [id] : false});
          setOnBad({...onBad, [id] : true});
        } else {
          setOnGood({...onGood, [id] : false});
          setOnBad({...onBad, [id] : false});
        }
      }).catch(err => console.log(err));
    }
  };
   
  const areaChange = (e, articleId, commentId) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    if (e.target.id === 'comment') {
      setCommentText({
        ...commentText,
        [articleId]: e.target.value,
      })
    }
    if (e.target.id === 'reply') {
      setReplyText({
        ...replyText,
        [commentId]: e.target.value,
      })
    }
  };
  const createReply = (id, commentId) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      const reply = {
        articleId: id,
        commentId: commentId,
        content: replyText[commentId],
      }
      axiosURL.post('/board/write/reply', reply, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setArticles(prev =>
          prev.map(item => {
            return item.id === id ? res.data : item;
          }))
        setReplyText({
          ...replyText,
          [commentId]: '',
        })//textarea비우기
      }).catch(err => {
        console.log(err)
      })
    }

  }
  const createComment = (id) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      const comment = {
        to: id,
        content: commentText[id],
      }
      axiosURL.post('/board/write/comment', comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setArticles(prev =>
          prev.map(item => {
            return item.id === id ? res.data : item;
          }))
        setCommentText({
          ...commentText,
          [id]: '', //textarea비우기
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  const toggleComment = (index) => {
    setCommentsVisible({
      ...commentsVisible,
      [index]: !commentsVisible[index] ?? false,
    })
  }
  const toggleReply = (pIndex,cIndex) => {
    setReplyVisible({
      ...replyVisible,
      [pIndex+cIndex]: !replyVisible[pIndex+cIndex] ?? false,
    })
  }
  const bookmark = (id) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      axiosURL.post(`/contents/bookmark/${id}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setArticles(prev =>
          prev.map(item => {
            return item.id === id ? res.data : item;
          })
        )
      })
        .catch(err => console.log(err))
    }
  }
  const commentSympthy = (id, commentId) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      axiosURL.get(`/contents/sympthy/${id}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => setArticles(prev =>
        prev.map(item => {
          return item.id === id ? res.data : item;
        })
      ))
        .catch(err => console.log(err))
    }
  }
  const replySympthy = (id, commentId, replyId) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      axiosURL.get(`/contents/sympthy/${id}/${commentId}/${replyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => setArticles(prev =>
        prev.map(item => {
          return item.id === id ? res.data : item;
        })
      ))
        .catch(err => console.log(err))
    }
  } 
  // =============================== 삭제관련 ======================================

  
  const removeSubmit = () => { 
    switch(removeItem.type){
      case 'write':
        removeArticle(removeItem.articleId) 
        break;
      case 'comment':
        removeComment(removeItem.articleId, removeItem.commentId)
        break;
      case 'reply':
        removeReply(removeItem.articleId, removeItem.commentId,removeItem.replyId)
        break;
    }
  } 
 
  const delAction = (item, articleId, commentId, replyId) => {
    switch (item) {
      case 'write':
        setRemoveItem({ type: item, articleId: articleId }) 
        break;
      case 'comment':
        setRemoveItem({ type: item, articleId: articleId, commentId: commentId }) 
        break;
      case 'reply':
        setRemoveItem({ type: item, articleId: articleId,commentId: commentId, replyId: replyId })
        break;
    } 
    setOnModal(true) 
    setType(item)
  }
  const removeArticle=(articleId)=>{ 
    axiosURL.delete(`/board/delete/article/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("게시글이 삭제되었습니다!")
      const newArr = articles.filter(item=>item.id !== articleId)
      setArticles(newArr)
    }).catch(err => console.log(err))
  }
  const removeComment=(articleId,commentId)=>{
    axiosURL.delete(`/board/delete/comment/${articleId}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("댓글이 삭제되었습니다!")
      setArticles(prev =>
        prev.map(item => (
          item.id === articleId ? res.data : item)))
    }).catch(err => console.log(err))
  }
  const removeReply=(articleId,commentId,replyId)=>{
    axiosURL.delete(`/board/delete/reply/${articleId}/${commentId}/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("답글이 삭제되었습니다!")
      setArticles(prev =>
        prev.map(item => (
          item.id === articleId ? res.data : item)))
    }).catch(err => console.log(err))
  }
 

  return (
    <div id='study-as-peed' className='main-board'>
      <div>
        <MajorSelect type={boardTypeText} cateInit={middleMajor} changeMajor={changeMajor} />
        <div className='mode'>
          <div>
            <PeedIcon className='icon cur' />
            <Link to={`/${boardType==='community'?boardType:boardType+'AsList'}/${middleMajor}/1`}><ListIcon className='icon' /></Link>
          </div>
        </div>
      </div>
      <div id='article-detail' ref={contentRef}>
        {articles ?
          articles.map((article, fIndex) => (
            <div className='peed-article' key={fIndex} >
              <div className='article-box' ref={commentRef} >
                <div className='title-box'>
                  <div className='tag'>{article.subject ? article.subject : article.middleMajor}</div>
                  <p className='title'>{article.title}</p>
                  <div className='t-sub-box'>
                    <div className='t-sub-box-1'>
                      <div className='img'><img src='' alt='' /></div>
                      {article.writer.graduate === "Y" && <span>🎓</span>}
                      <p className='sub-p'>{article.writer.nickname}</p>
                      <TimeIcon className='sub-p icon' />&nbsp;<span className='sub-p'>{article.createdAt}</span>
                    </div>
                    <div>
                      {
                        article.scraps.includes(curMember && curMember.email) ?
                          <BookmarkAddedRoundedIcon className='bookmark-icon' onClick={() => bookmark(article.id)} />
                          :
                          <BookmarkAddOutlinedIcon className='bookmark-icon' onClick={() => bookmark(article.id)} />
                      }
                    </div>
                  </div>
                </div>
                <div className='content-box' dangerouslySetInnerHTML={{ __html: article.content }} >
                </div>
                <div className='response-box'>
                  <button className={`response good ${onGood[article.id] ? 'on' : ''}`} value='T' onClick={(e) => stamp(e, article.id)}>👍 {article.goods}</button>
                  <button className={`response bad ${onBad[article.id] ? 'on' : ''}`} value='F' onClick={(e) => stamp(e, article.id)}>👎 {article.bads}</button>
                  {
                    curMember && curMember.email === article.writer.email &&
                    <div className='edit-box'>
                      <Link to={`/modify/${article.id}`} className='edit-btn'>수정</Link>&nbsp;&nbsp;<button className='edit-btn' onClick={() => { delAction('write',article.id) }}>삭제</button>
                    </div>
                  }
                </div>

              </div>

              <div className='reply-box' >
                <p className='reply-cnt peed-visible-btn' onClick={() => toggleComment(fIndex)}>댓글 {article.comments.length}개</p>
                <div className={`peed-reply-box  ${commentsVisible[fIndex] ? 'visible' : ''}`} style={{ maxHeight: commentsVisible[fIndex] ? contentRef.current.scrollHeight + 'px' : '0' }}>
                  <div className='replyes-container' >
                    {
                      article.comments.length === 0 ? <p className='reply-empty'>작성된 댓글이 존재하지 않습니다!!</p> :
                        article.comments.map((item, sIndex) => (
                          <div key={sIndex}>
                            <div className='reply' >
                            {item.deleted?
                         <div className='is-del'>삭제된 댓글입니다.</div> 
                         :
                         <>
                              <div className='sec-1'>
                                <div className='sec-1-1'>
                                  <div className='img'><img src='' alt='' /></div>
                                  {
                                    item.from.graduate === "Y" && <span>🎓</span>}
                                  <p className='nickname'>{item.from.nickname}({item.from.major})</p>
                                  <p className='upload-date'>{item.createdAt}</p>
                                </div>
                                {
                                  curMember && curMember.email === item.from.email &&
                                  <button className='edit-btn re-del-btn' onClick={() => { delAction('comment',article.id,item.id) }} >삭제</button>
                                }
                              </div>
                              <div className='sec-2'>{item.content}</div>
                                </>
                            }
                              <div className='sec-3'>
                                <button className='edit-btn re-reply' onClick={() => { toggleReply(fIndex,sIndex) }} >답글({item.replies ? item.replies.length : 0})</button>
                                {item.deleted?
                                  <button className={`sympathy del ${item.sympathy && item.sympathy.includes(curMember && curMember.email) ? 'on' : ''}`} >공감 {item.sympathy ? item.sympathy.length : 0}</button>
                                :
                                <button className={`sympathy ${item.sympathy && item.sympathy.includes(curMember && curMember.email) ? 'on' : ''}`} onClick={() => commentSympthy(article.id,item.id)}>공감 {item.sympathy ? item.sympathy.length : 0}</button>
                                }
                                </div>
                            </div>
                            <div className={`reply-show-box ${replyVisible[fIndex+sIndex] ? 'visible' : ''}`} style={{ maxHeight: replyVisible[fIndex+sIndex] ? commentRef.current.scrollHeight + 'px' : '0' }} >
                              {item.replies.length !== 0 &&
                                item.replies.map((rItem, tIndex) => (
                                  <div className='sub-reply reply' key={tIndex}>
                                    <div className='sec-1'>
                                      <div className='sec-1-1'>
                                        <ReReplyIcon className='re-reply-icon' />
                                        <div className='img'><img src='' alt='' /></div>
                                        {
                                          rItem.from.graduate === "Y" && <span>🎓</span>}
                                        <p className='nickname'>{rItem.from.nickname}({rItem.from.major})</p>
                                        <p className='upload-date'>{rItem.createdAt}</p>
                                      </div>
                                      {curMember && curMember.email === rItem.from.email &&
                                        <button className='edit-btn re-del-btn' onClick={() => { delAction('reply',article.id,item.id,rItem.id)}}>삭제</button>
                                      }

                                    </div>
                                    <div className='sec-2'>{rItem.content}</div>
                                    <div className='sec-3 sub-reply-sec-3'>
                                      <button className={`sympathy ${rItem.sympathy && rItem.sympathy.includes(curMember && curMember.email) ? 'on' : ''}`} onClick={() => replySympthy(article.id, item.id, rItem.id)}>공감 {rItem.sympathy ? rItem.sympathy.length : 0}</button>
                                    </div>
                                  </div>
                                ))
                              }
                              { !item.deleted &&
                                <div className='reply write-sub-reply-box' >
                                <div className='write-reply-box sub'>
                                  <textarea id='reply' value={replyText[item.id]} className='txtarea' maxLength={300} onChange={(e) => areaChange(e, article.id, item.id)} placeholder='내용을 입력해주세요'>
                                  </textarea>
                                  <div className='write-reply-btn'>
                                    {
                                      !replyText[item.id] || replyText[item.id] === '' ?
                                        <button className='wr-btn sub no' type='button' >답글작성</button>
                                        :
                                        <button className='wr-btn sub' type='button' onClick={() => { createReply(article.id, item.id) }}>답글작성</button>
                                    }
                                  </div>
                                </div>
                              </div>
                              }
                            </div>
                          </div>

                        ))
                    }


                  </div>

                  <div className='write-reply-box'>
                    <textarea id='comment' className='txtarea' value={commentText[article.id]} maxLength={300} onChange={(e) => areaChange(e, article.id)} placeholder='내용을 입력해주세요'>
                    </textarea>
                    <div className='write-reply-btn'>
                      {
                        !commentText[article.id]||commentText[article.id] === ''  ?
                          <button className='wr-btn no' type='button' onClick={()=>console.log(commentText[article.id])}>댓글작성</button>
                          :
                          <button className='wr-btn' type='button' onClick={() => createComment(article.id)}>댓글작성</button>

                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          :
          <p className='empty-p'>등록된 게시글이 존재하지 않습니다!!</p>
        }
        {pageInfo.curPage < pageInfo.allPage &&
         <button className='plus' onClick={()=>plusArticles(pageInfo.curPage+1)}>더보기</button>
        }

        {onModal && <CustomModal type={type} setOnModal={setOnModal} removeSubmit={removeSubmit}/>}
      </div>
      {
        showScrollButton &&
        <ScrollToTopIcon className="scroll-button" onClick={scrollToTop} />
      }
    </div>
  )
}

export default BoardAsPeed 