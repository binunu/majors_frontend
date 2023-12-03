import React from 'react'
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeedIcon from '@mui/icons-material/DashboardOutlined';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import MajorSelect from '../../Component/MajorSelect'
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';


const StudyAsList = () => {
  const [dmSubject, setDmSubject] = useState('국어교육')
  const [articles, setArticles] = useState([
    { subject: '경제학', title: '공부하는데 미시경제 거시경제 차이가 헷갈려요 ㅠ ', replyCnt: 14, goodCnt: 30 },
    { subject: '인적자원관리', title: '인적자원관리 토론 합시다', replyCnt: 10, goodCnt: 20 },
    { subject: '경영학', title: '보이지 않는 손은 누구의 손인가요', replyCnt: 14, goodCnt: 30 },
    { subject: '마케팅', title: '선배님들 마케팅 과목 어떤 과제들을 주로 하셨나요?', replyCnt: 14, goodCnt: 30 },
    { subject: '마케팅', title: '4p에 대해서 알려주실 분', replyCnt: 14, goodCnt: 30 },
    { subject: '회계원리', title: '회계자격증 공부 질문있습니다', replyCnt: 14, goodCnt: 30 },
    { subject: '국제경영학', title: '국제경영학 수업내용 중 이런게 나왔는데 잘 모르겠습니다 친절하게 알려주실 천사분 계신가요ㅜㅜ', replyCnt: 14, goodCnt: 30 },
    
  ])
  return (
    <div id='study-as-list' className='main-board'>
      <MajorSelect dmSubject={dmSubject} setDmSubject={setDmSubject} />
      <div className='mode'>
        <div>
          <Link to='/main/studyAsPeed'><PeedIcon className='icon' /></Link>
          <ListIcon className='icon cur' />
        </div>
      </div>
      <div className='article-list'>
        {
          articles.map((item,index)=>(
            <Link to='/main/articleDetail' className='article' key={index}>
            <div className='a-title'><b>[{item.subject}]</b> {item.title}</div>
            <div className='a-tail'>
              <GoodIcon className='icon'/>&nbsp;{item.replyCnt}&nbsp;&nbsp;
              <ReplyIcon className='icon'/>&nbsp;{item.goodCnt}
            </div>
          </Link>
          ))  
        }
 
       
      </div>
      <div className='pagenation'>
        0 1 2 3 4 5 6 7 8 9
      </div>

    </div>
  )
}

export default StudyAsList


