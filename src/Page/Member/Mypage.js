import React,{ useState }  from 'react'
import './Member.css'
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';

const Mypage = () => {
  const [board, setboard] = useState([{ boardType: '자유게시판', title: '시간 복잡도와 공간 복잡도의 차이', replyCnt: 10, goodCnt: 20, content: '알고리즘에서 시간 복잡도와 공간 복잡도의 차이점에 대해 궁금합니다.' },
  { boardType: '공부궁물', title: 'TCP와 UDP의 차이점', replyCnt: 15, goodCnt: 25, content: '네트워크에서 TCP와 UDP의 특징과 각각의 용도에 대해 알고 싶습니다.' },
  { boardType: '진로궁물', title: '머신러닝과 딥러닝의 차이', replyCnt: 12, goodCnt: 22, content: '인공지능 분야에서 머신러닝과 딥러닝의 차이와 활용 방법에 대해 알고 싶어요.' },
  { boardType: '공부궁물', title: 'SPA와 MPA의 장단점', replyCnt: 8, goodCnt: 18, content: '웹 개발에서 SPA와 MPA의 장단점과 적합한 상황에 대해 알려주세요.' },
  { boardType: '자유게시판', title: '암호화 기술의 종류와 원리', replyCnt: 20, goodCnt: 30, content: '보안 분야에서 사용되는 암호화 기술의 종류와 작동 원리를 알고 싶습니다.' },
 
  ]);
  return (
    <div id='mypage'>
      <div className='container'>
        <div className='top'>내정보</div>
        <div className='content'>
          <div className='info'></div>
          <div className='update'></div>
        </div>
      </div>
      <div className='container'>
        <div className='top'>내활동</div>
        <div className='content'>
          <ul className='menu-box'>
            <li className='li'>내가 쓴 글</li>
            <li className='li'>내가 남긴 댓글</li>
            <li className='li'>스크랩</li>
            <li className='li'>좋아요한 글</li>
            <li className='li'>싫어요한 글</li>
          </ul>
          <div className='log-list'>
            <p className='p'><b>총 5개의 글 작성</b></p>
            {
              board.length ?
                board.map((item, index) => (
                  <Link to='/articleDetail' className='article' key={index}> 
                      <div className='title'><b>[{item.boardType}]</b>&nbsp;{item.title}</div>
                      <div className='icon-box'>
                        <GoodIcon className='icon' />&nbsp;{item.goodCnt}&nbsp;&nbsp;
                        <ReplyIcon className='icon' />&nbsp;{item.replyCnt}
                      </div> 
                  </Link>
                ))
                :
                <div className='empty'>"검색결과가 존재하지 않습니다!"</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage