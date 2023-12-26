import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import TimeIcon from '@mui/icons-material/AccessTime';
import CustomModal from '../../Component/CustomModal';
import ReReplyIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import axiosURL from '../../Utill/AxiosURL';
import { useLoginContext } from '../../Utill/LogInContext';

const ArticleDetail = () => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [curMember, setCurMember] = useState();
  const [render, setRender] = useState(false);
  const [onGood, setOnGood] = useState(false);
  const [onBad, setOnBad] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [type, setType] = useState('false')
  const { id } = useParams()
  const [article, setArticle] = useState({});
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState({})
  const { isLogIn } = useLoginContext();
  //답글관련
  const commentRef = useRef(null);
  const [replyVisible, setReplyVisible] = useState({});

  //현재 삭제대기열을 저장
  const [removeItem, setRemoveItem] = useState({ type: '', articleId: '', commentId: '', replyId: '' })


  useEffect(() => {
    if (isLogIn) {
      axiosURL.get('/member/info/simple', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setCurMember(res.data)
      }).catch(err => console.log(err))//로그인되어있으면 유저정보받아오기
    }
    axiosURL.get(`/board/article/detail/${id}`) //
      .then(res => { 
        setArticle(res.data)
        setRender(true)
        // reaction()
        //좋아요 및 싫어요 초기세팅 
      }).catch(err => {
        console.log(err)
        alert("존재하지 않는 게시물입니다.")
      })
  }, []) 
  const stamp = (e) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      const reactionType = e.target.value
      axiosURL.put(`/contents/reaction/${id}`, { reactionType: reactionType }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setArticle({
          ...article,
          goods: res.data.goods,
          bads: res.data.bads,
        })
        if (res.data.state === "T") {
          setOnGood(true)
          setOnBad(false)
        } else if (res.data.state === "F") {
          setOnBad(true)
          setOnGood(false)
        } else {
          setOnGood(false)
          setOnBad(false)
        }
      }).catch(err => console.log(err))
    }
  }
  
  const areaChange = (e, commentId) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    if (e.target.id === 'comment') {
      setCommentText(e.target.value)
    }
    if (e.target.id === 'reply') {
      setReplyText({
        ...replyText,
        [commentId]: e.target.value,
      })
    }
  };
  const createReply = (commentId) => {
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
        setArticle(res.data)
        setReplyText({
          ...replyText,
          [commentId]: '',
        })//textarea비우기
      }).catch(err => {
        console.log(err)
      })
    }

  }
  const createComment = () => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      const comment = {
        to: id,
        content: commentText,
      }
      axiosURL.post('/board/write/comment', comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setArticle(res.data)
        setCommentText('') //textarea비우기
      }).catch(err => {
        console.log(err)
      })
    }
  }
  const toggleReply = (index) => {
    setReplyVisible({
      ...replyVisible,
      [index]: !replyVisible[index] ?? false,
    })
  }
  const bookmark = () => { 
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {

      axiosURL.post(`/contents/bookmark/${id}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => setArticle(res.data))
        .catch(err => console.log(err))
    }
  }
  const commentSympthy = (commentId) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      axiosURL.get(`/contents/sympthy/${id}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => setArticle(res.data))
        .catch(err => console.log(err))
    }
  }
  const replySympthy = (commentId, replyId) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      axiosURL.get(`/contents/sympthy/${id}/${commentId}/${replyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => setArticle(res.data))
        .catch(err => console.log(err))
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
  const removeSubmit = () => { 
    console.log(removeItem)
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
  const removeArticle=(articleId)=>{ 
    axiosURL.delete(`/board/delete/article/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("게시글이 삭제되었습니다!")
      navigate('/')
    }).catch(err => console.log(err))
  }
  const removeComment=(articleId,commentId)=>{
    axiosURL.delete(`/board/delete/comment/${articleId}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("댓글이 삭제되었습니다!")
      setArticle(res.data); 
    }).catch(err => console.log(err))
  }
  const removeReply=(articleId,commentId,replyId)=>{
    console.log(removeItem)
    axiosURL.delete(`/board/delete/reply/${articleId}/${commentId}/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      alert("답글이 삭제되었습니다!")
      setArticle(res.data); 
    }).catch(err => console.log(err))
  }
  return (
    <>
      {
        render &&
        <div id='article-detail'>
          <div className='article-box'>
            <div className='title-box'>
              <div className='tag'>{article.boardType === '공부궁물' ? article.subject : article.middleMajor}</div>
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
                      <BookmarkAddedRoundedIcon className='bookmark-icon' onClick={bookmark} />
                      :
                      <BookmarkAddOutlinedIcon className='bookmark-icon' onClick={bookmark} />
                  }
                </div>
              </div>
            </div>
            <div className='content-box' dangerouslySetInnerHTML={{ __html: article.content }} >
            </div>
            <div className='response-box'>
              <button className={`response good ${onGood ? 'on' : ''}`} value='T' onClick={stamp}>👍 {article.goods}</button>
              <button className={`response bad ${onBad ? 'on' : ''}`} value='F' onClick={stamp}>👎 {article.bads}</button>
              {
                curMember && curMember.email === article.writer.email &&
                <div className='edit-box'>
                  <Link tso='#' className='edit-btn'>수정</Link>&nbsp;&nbsp;<button className='edit-btn' onClick={() => { delAction('write', id) }}>삭제</button>
                </div>
              }
            </div>

          </div>
          <div className='reply-box' ref={commentRef}>
            <p className='reply-cnt'>댓글 {article.comments.length}개</p>
            <div className='replyes-container' >
              {
                article.comments.length === 0 ? <p className='reply-empty'>작성된 댓글이 존재하지 않습니다!!</p> :
                  article.comments.map((item, index) => (
                    <div key={index}>
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
                            <button className='edit-btn re-del-btn' onClick={() => { delAction('comment', id, item.id) }} >삭제</button>
                          }
                        </div>
                        <div className='sec-2'>{item.content}</div>
                        </>
                        }
                        <div className='sec-3'>
                          <button className='edit-btn re-reply' onClick={() => { toggleReply(index) }} >답글({item.replies ? item.replies.length : 0})</button>
                          {
                           item.deleted? 
                            <button className={`sympathy del ${item.sympathy && item.sympathy.includes(curMember && curMember.email) ? 'on' : ''}`}>공감 {item.sympathy ? item.sympathy.length : 0}</button>
                            :
                            <button className={`sympathy ${item.sympathy && item.sympathy.includes(curMember && curMember.email) ? 'on' : ''}`} onClick={() => commentSympthy(item.id)}>공감 {item.sympathy ? item.sympathy.length : 0}</button>
                          }
                        </div>
                      </div>
                      <div className={`reply-show-box ${replyVisible[index] ? 'visible' : ''}`} style={{ maxHeight: replyVisible[index] ? commentRef.current.scrollHeight + 'px' : '0' }} >
                        {item.replies.length !== 0 &&
                          item.replies.map((rItem, index) => (
                            <div className='sub-reply reply' key={index}>
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
                                  <button className='edit-btn re-del-btn' onClick={() => { delAction('reply', id, item.id, rItem.id) }}>삭제</button>
                                }

                              </div>
                              <div className='sec-2'>{rItem.content}</div>
                              <div className='sec-3 sub-reply-sec-3'>
                                <button className={`sympathy ${rItem.sympathy && rItem.sympathy.includes(curMember && curMember.email) ? 'on' : ''}`} onClick={() => replySympthy(item.id, rItem.id)}>공감 {rItem.sympathy ? rItem.sympathy.length : 0}</button>
                              </div>
                            </div>
                          ))
                        }
                        {!item.deleted &&
                        <div className='reply write-sub-reply-box' >
                          <div className='write-reply-box sub'>
                            <textarea id='reply' value={replyText[item.id]} className='txtarea' maxLength={300} onChange={(e) => areaChange(e, item.id)} placeholder='내용을 입력해주세요'>
                            </textarea>
                            <div className='write-reply-btn'>
                              {
                                !replyText[item.id] || replyText[item.id] === '' ?
                                  <button className='wr-btn sub no' type='button'>답글작성</button>
                                  :
                                  <button className='wr-btn sub' type='button' onClick={() => { createReply(item.id) }}>답글작성</button>
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
              <textarea id='comment' className='txtarea' value={commentText} maxLength={300} onChange={areaChange} placeholder='내용을 입력해주세요'>
              </textarea>
              <div className='write-reply-btn'>
                {
                  commentText === '' ?
                    <button className='wr-btn no' type='button' >댓글작성</button>
                    :
                    <button className='wr-btn' type='button' onClick={createComment}>댓글작성</button>

                }
              </div>
            </div>
          </div>
          {onModal && <CustomModal type={type} setOnModal={setOnModal} removeSubmit={removeSubmit}/>}
        </div>
      }
    </>

  )

}

export default ArticleDetail