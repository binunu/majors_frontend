import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import TimeIcon from '@mui/icons-material/AccessTime';
import CustomModal from '../../Component/CustomModal';
import ReReplyIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';

const ArticleDetail = ({dmGraduate}) => {
  const [onGood, setOnGood] = useState(false);
  const [onBad, setOnBad] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [type, setType] = useState('false')
  const [dmReReply, setDmReReply] = useState('누구에게답장')
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
  };
  return (
    <div id='article-detail'>
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
            <BookmarkAddedRoundedIcon className='bookmark-icon'/>
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

      </div>
      <div className='reply-box'>
        <p className='reply-cnt'>댓글 3개</p>
        <div className='replyes-container'>
          <div className='reply'>
            <div className='sec-1'>
              <div className='sec-1-1'>
                <div className='img'><img src='' alt='' /></div>
                {
            dmGraduate && <span>🎓</span>  }
                <p className='nickname'>나다이자슥아(해운경영학부)</p>
                <p className='upload-date'>2023-11-16</p>
              </div>
              <button className='edit-btn re-del-btn' onClick={()=>{delAction('reply')}} >삭제</button>
            </div>
            <div className='sec-2'>동해물과 백두산이 마르고 닳도록
              하느님이 보우하사 우리나라 만세
              무궁화 삼천리 화려 강산
              대한 사람 대한으로 길이 보전하세람 대한으로 길이 보전하세람 대한으로 길</div>
            <div className='sec-3'>
              <button className='edit-btn re-reply'>답글작성</button><button className='sympathy'>공감 12</button>
            </div>
          </div>
          <div className='reply'>
            <div className='sec-1'>
              <div className='sec-1-1'>
                <div className='img'><img src='' alt='' /></div>
                <p className='nickname'>나다이자슥아(해운경영학부)</p>
                <p className='upload-date'>2023-11-16</p>
              </div>
              <button className='edit-btn re-del-btn' onClick={()=>{delAction('reply')}}>삭제</button>
            </div>
            <div className='sec-2'>동해물과 백두산이 마르고 닳도록
              하느님이 보우하사 우리나라 만세
              무궁화 삼천리 화려 강산
              대한 사람 대한으로 길이 보전하세람 대한으로 길이 보전하세람 대한으로 길</div>
            <div className='sec-3'>
              <button className='edit-btn re-reply'>답글작성</button><button className='sympathy'>공감 12</button>
            </div>
          </div>
          <div className='reply'>
            <div className='sec-1'>
              <div className='sec-1-1'>
                {dmReReply && <ReReplyIcon className='re-reply-icon' />}
                <div className='img'><img src='' alt='' /></div>
                {
            dmGraduate && <span>🎓</span>  }
                <p className='nickname'>나다이자슥아(해운경영학부)</p>
                <p className='upload-date'>2023-11-16</p>
              </div>
              <button className='edit-btn re-del-btn'  onClick={()=>{delAction('reply')}}>삭제</button>
            </div>
            <div className='sec-2'> {
              dmReReply && <span className='re-reply-who'>@{dmReReply}</span>
            } 동해물과 백두산이 마르고 닳도록
              하느님이 보우하사 우리나라 만세 </div>
            <div className='sec-3'>
              <button className='edit-btn re-reply'>답글작성</button><button className='sympathy'>공감 12</button>
            </div>
          </div>
        </div>
        <div className='write-reply-box'>
          <textarea className='txtarea' maxLength={300} onChange={areaChange} placeholder='내용을 입력해주세요'> 
          </textarea>
        <div className='write-reply-btn'><button className='wr-btn'>댓글작성</button></div>
        </div>
      </div>
      {onModal && <CustomModal type={type} setOnModal={setOnModal} />}
    </div>
  )
}

export default ArticleDetail