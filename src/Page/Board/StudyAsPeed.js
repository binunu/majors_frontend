import React,{ useState,useRef,useEffect } from 'react'
import { Link } from 'react-router-dom';
import MajorSelect from '../../Component/MajorSelect'
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeedIcon from '@mui/icons-material/DashboardOutlined';
import TimeIcon from '@mui/icons-material/AccessTime';
import CustomModal from '../../Component/CustomModal';
import ReReplyIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import ScrollToTopIcon from '@mui/icons-material/ArrowUpwardOutlined';

const StudyAsPeed = ({dmGraduate}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [onGood, setOnGood] = useState(false);
  const [onBad, setOnBad] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [type, setType] = useState('false')
  const [dmReReply, setDmReReply] = useState('누구에게답장')
  const [dmArticles, setArticles] = useState([
    { replyNum: 1, replyWriter: '무한도전포에버', replyContent: '이건 저도 궁금했던건데 궁금하네요 ㅠㅠ 시원하게 해결해주실분 구함! 스크랩 해둬야겠어요' },
    { replyNum: 2, replyWriter: '행복한 개발자', replyContent: '리액트 공부 중인데 너무 재밌어요!' },
    { replyNum: 3, replyWriter: '코딩은 즐거워', replyContent: '프로그래밍은 정말 재미있죠!' },
    { replyNum: 4, replyWriter: '디자인러버', replyContent: '디자인에 대한 열정이 끊이질 않아요!' },
    // { replyNum: 5, replyWriter: '코딩왕자', replyContent: '코딩하는 걸로 스트레스 푸는 중입니다!'},
    // { replyNum: 6, replyWriter: '디벨롭러', replyContent: '개발에 대한 궁금증이 많아요!'},
    // { replyNum: 7, replyWriter: '디자인마스터', replyContent: '디자인하는 것이 즐거워요!'},
    // { replyNum: 8, replyWriter: '코딩러너', replyContent: '코딩은 제 취미입니다!'},
    // { replyNum: 9, replyWriter: '프로그래밍전문가', replyContent: '프로그래밍으로 문제를 해결하는 것이 즐겁습니다!'},
    // { replyNum: 10, replyWriter: '디자인하는개발자', replyContent: '디자인과 개발 둘 다 즐거워요!'},
  ]);
  const [commentsVisible, setCommentsVisible] = useState({}); 
  const [writerName, setWriterName] = useState({})
  const [dmSubject, setDmSubject] = useState('국어교육')
  const [areaData,setAreaData]= useState({})
  const contentRef = useRef(null);
  useEffect(()=>{
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
  },[])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
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
  const toggleComments = (articleNum) => { 
    setCommentsVisible({
      ...commentsVisible,
      [articleNum]: !commentsVisible[articleNum] ?? false,
    })
  }
  const areaChange = (e,num) => { 
    e.target.style.height = 'auto'; 
    e.target.style.height = e.target.scrollHeight + 'px';  
    setAreaData({
      ...areaData,
      [num]:e.target.value,
    })
  };
  const replyTo=(num,writer)=>{   
    if(!areaData[num] || areaData[num] === '') {  
      setWriterName({
        ...writerName,
        [num]:`@${writer} `,
      })  
    } 
    
    //3. @로 시작하는 상태> 사실 건들면 안됨. 
  }   
  // !areaData[num].startsWith(`@${writer}`)
  return (
    <div id='study-as-peed' className='main-board'>
      <div>
        <MajorSelect dmSubject={dmSubject} setDmSubject={setDmSubject} />
        <div className='mode'>
          <div>
            <PeedIcon className='icon cur' />
            <Link to='/studyAsList'><ListIcon className='icon' /></Link>
          </div>
        </div>
      </div>
      <div id='article-detail'>
        {
          dmArticles.map((item, index) => (
            <div className='peed-article' key={item.replyNum}>
              <div className='article-box'>
                <div className='title-box'>
                  <div className='tag'>경제학원론</div>
                  <p className='title'>경제학 공부하는데 미시경제 거시경제 차이가 헷갈려요 ㅠ</p>
                  <div className='t-sub-box'>
                    <div className='t-sub-box-1'>
                      <div className='img'><img src='' alt='' /></div>
                      {
            dmGraduate && <span>🎓</span>  }
                      <p className='sub-p'>병아리는삐약삐약</p>
                      <TimeIcon className='sub-p icon' />&nbsp;<span className='sub-p'>5시간</span>
                    </div>
                    <div>
                      <BookmarkAddOutlinedIcon className='bookmark-icon' />
                      <BookmarkAddedRoundedIcon className='bookmark-icon' />
                    </div>
                  </div>
                </div>
                <div className='content-box'>
                  {/* 에디터 */}
                </div>
                <div className='response-box'>
                  <button className={`response good ${onGood ? 'on' : ''}`} value='good' onClick={stamp}>👍 22</button>
                  <button className={`response bad ${onBad ? 'on' : ''}`} value='bad' onClick={stamp}>👎 0</button>
                  <div className='edit-box'>
                    <Link tso='#' className='edit-btn'>수정</Link>&nbsp;&nbsp;<button className='edit-btn' onClick={() => { delAction('write') }}>삭제</button>
                  </div>
                </div>
                {
                   commentsVisible[item.replyNum] ?
                   <p className='reply-cnt peed-visible-btn' onClick={() => { toggleComments(item.replyNum) }}>댓글 숨기기</p>
                   :
                   <p className='reply-cnt peed-visible-btn' onClick={() => { toggleComments(item.replyNum) }}>댓글(2)</p>
                }
              </div>  
                <div className={`peed-reply-box ${commentsVisible[item.replyNum] ? 'visible':''}`} style={{ maxHeight: commentsVisible[item.replyNum] ? contentRef.current.scrollHeight + 'px' : '0' }} ref={contentRef}> 
                
                  <div className='replyes-container'>
                    <div className='reply'>
                      <div className='sec-1'>
                        <div className='sec-1-1'>
                          <div className='img'><img src='' alt='' /></div>
                          {
            dmGraduate && <span>🎓</span>  }
                          <p className='nickname'>{item.replyWriter}(해운경영학부)</p>
                          <p className='upload-date'>2023-11-16</p>
                        </div>
                        <button className='edit-btn re-del-btn' onClick={() => { delAction('reply') }} >삭제</button>
                      </div>
                      <div className='sec-2'>{item.replyContent}</div>
                      <div className='sec-3'>
                        <button className='edit-btn re-reply' onClick={()=>{replyTo(item.replyNum,item.replyWriter)}}>답글작성</button><button className='sympathy'>공감 12</button>
                      </div>
                    </div>
                  </div>
              <div className='write-reply-box'>
                <textarea className='txtarea' defaultValue={writerName[item.replyNum]} maxLength={300} onChange={(e)=>{areaChange(e,item.replyNum)}} placeholder='내용을 입력해주세요'>
                </textarea>
                <div className='write-reply-btn'><button className='wr-btn'>댓글작성</button></div>
              </div>
                </div> 
            </div>
          ))
        }


        {onModal && <CustomModal type={type} setOnModal={setOnModal} />}
      </div>
      {
        showScrollButton && 
        <ScrollToTopIcon className="scroll-button" onClick={scrollToTop}/> 
      }
    </div>
  )
}

export default StudyAsPeed 