import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import TimeIcon from '@mui/icons-material/AccessTime';
import CustomModal from '../../Component/CustomModal';
import ReReplyIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import axiosURL from '../../Utill/AxiosURL';
import { useLoginContext } from '../../Utill/LogInContext';

const ArticleDetail = ({ dmGraduate }) => {
  const [render, setRender] = useState(false);
  const [onGood, setOnGood] = useState(false);
  const [onBad, setOnBad] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [type, setType] = useState('false')
  const { id } = useParams()
  const [article, setArticle] = useState({});
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('')
  const { isLogIn } = useLoginContext();
  const token = localStorage.getItem('accessToken')
  //답글관련
  const commentRef = useRef(null);
  const [replyVisible, setReplyVisible] = useState([]);

  useEffect(() => {
    axiosURL.get(`/board/article/detail/${id}`)
      .then(res => {
        setArticle(res.data)
        setRender(true)
        console.log(res.data)
      }).catch(err => {
        console.log(err)
        alert("존재하지 않는 게시물입니다.")
        // navigate('/studyAsPeed')
      })
  }, [])
  const stamp = (e) => {
    const type = e.target.value
    if (type === 'good') {
      setOnGood(!onGood)
      setOnBad(false)
    } else {
      setOnBad(!onBad)
      setOnGood(false)
    }
  }
  const delAction = (text) => {
    setOnModal(true)
    setType(text)
  }
  const areaChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    if (e.target.id === 'comment') {
      setCommentText(e.target.value)
    }
    if (e.target.id === 'reply') {
      setReplyText(e.target.value)
    }
  };
  const createReply = (commentId) => {
    if (!isLogIn) {
      alert("로그인 후에 가능합니다.")
    } else {
      console.log(commentId)
      const reply = {
        articleId: id,
        replyId: commentId,
        content: replyText,
      }
      axiosURL.post('/board/write/reply', reply, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setArticle(res.data)
        console.log(res.data)
        setReplyText('')//textarea비우기
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
                  <BookmarkAddOutlinedIcon className='bookmark-icon' />
                  <BookmarkAddedRoundedIcon className='bookmark-icon' />
                </div>
              </div>
            </div>
            <div className='content-box' dangerouslySetInnerHTML={{ __html: article.content }} >
            </div>
            <div className='response-box'>
              <button className={`response good ${onGood ? 'on' : ''}`} value='good' onClick={stamp}>👍 {article.goods && article.goods.length}</button>
              <button className={`response bad ${onBad ? 'on' : ''}`} value='bad' onClick={stamp}>👎 {article.bads && article.bads.length}</button>
              <div className='edit-box'>
                <Link tso='#' className='edit-btn'>수정</Link>&nbsp;&nbsp;<button className='edit-btn' onClick={() => { delAction('write') }}>삭제</button>
              </div>
            </div>

          </div>
          <div className='reply-box'>
            <p className='reply-cnt'>댓글 {article.comments.length}개</p>
            <div className='replyes-container' ref={commentRef}>
              {
                article.comments.length == 0 ? <p className='reply-empty'>작성된 댓글이 존재하지 않습니다!!</p> :
                  article.comments.map((item, index) => (
                    <div key={index}>
                      <div className='reply'>
                        <div className='sec-1'>
                          <div className='sec-1-1'>
                            <div className='img'><img src='' alt='' /></div>
                            {
                              dmGraduate && <span>🎓</span>}
                            <p className='nickname'>{item.from.nickname}({item.from.major})</p>
                            <p className='upload-date'>{item.createdAt}</p>
                          </div>
                          <button className='edit-btn re-del-btn' onClick={() => { delAction('reply') }} >삭제</button>
                        </div>
                        <div className='sec-2'>{item.content}</div>
                        <div className='sec-3'>
                          <button className='edit-btn re-reply' onClick={() => { toggleReply(index) }}>답글({item.replies ? item.replies.length : 0})</button><button className='sympathy'>공감 {item.sympath ? item.sympath.length : 0}</button>
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
                                    rItem.from.graduate && <span>🎓</span>}
                                  <p className='nickname'>{rItem.from.nickname}({rItem.from.major})</p>
                                  <p className='upload-date'>{rItem.createdAt}</p>
                                </div>
                                <button className='edit-btn re-del-btn' onClick={() => { delAction('reply') }}>삭제</button>
                              </div>
                              <div className='sec-2'>{rItem.content}</div>
                              <div className='sec-3 sub-reply-sec-3'>
                                <button className='sympathy'>공감 {rItem.sympath ? rItem.sympath.length : 0}</button>
                              </div>
                            </div>
                          ))
                        }
                        <div className='reply write-sub-reply-box' >
                          <div className='write-reply-box sub'>
                            <textarea id='reply' value={replyText} className='txtarea' maxLength={300} onChange={areaChange} placeholder='내용을 입력해주세요'>
                            </textarea>
                            <div className='write-reply-btn'><button className='wr-btn sub' type='button' onClick={() => { createReply(item.id) }}>답글작성</button></div>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))
              }



            </div>

            <div className='write-reply-box'>
              <textarea id='comment' className='txtarea' value={commentText} maxLength={300} onChange={areaChange} placeholder='내용을 입력해주세요'>
              </textarea>
              <div className='write-reply-btn'><button className='wr-btn' type='button' onClick={createComment}>댓글작성</button></div>
            </div>
          </div>
          {onModal && <CustomModal type={type} setOnModal={setOnModal} />}
        </div>
      }
    </>

  )

}

export default ArticleDetail