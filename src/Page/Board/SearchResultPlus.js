import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const SearchResultPlus = () => {
  const { boardType, word } = useParams()
  const [type, setType] = useState()
  const [boardA, setboardA] = useState([{ subject: '경제학', title: '공부하는데 미시경제 거시경제 차이가 헷갈려요 ㅠ ', replyCnt: 14, goodCnt: 30, content: '미시경제와 거시경제의 기본 개념을 비교합니다.' },
  { subject: '인적자원관리', title: '인적자원관리 토론 합시다', replyCnt: 10, goodCnt: 20, content: '기업 내 인적자원 관리의 중요성과 효율적인 방법에 대해 토론합니다.' },
  { subject: '경영학', title: '보이지 않는 손은 누구의 손인가요', replyCnt: 14, goodCnt: 30, content: '기업의 은밀한 경영 전략과 실제 실행 과정에 대해 살펴봅니다.' },
  { subject: '마케팅', title: '선배님들 마케팅 과목 어떤 과제들을 주로 하셨나요?', replyCnt: 14, goodCnt: 30, content: '마케팅 분야에서 주로 다루는 프로젝트 및 과제에 대해 물어봅니다.' },
  { subject: '마케팅', title: '4p에 대해서 알려주실 분', replyCnt: 14, goodCnt: 30, content: '마케팅의 기본 요소인 Product, Price, Place, Promotion에 대해 알아봅니다.' },
  { subject: '회계원리', title: '회계자격증 공부 질문있습니다', replyCnt: 14, goodCnt: 30, content: '회계자격증 취득을 위한 공부 방법과 핵심 포인트를 논의합니다.' },
  { subject: '국제경영학', title: '국제경영학 수업내용 중 이런게 나왔는데 잘 모르겠습니다 친절하게 알려주실 천사분 계신가요ㅜㅜ', replyCnt: 14, goodCnt: 30, content: '국제경영의 기본 이론과 실제 사례를 비교하며 이해하는 방법을 찾습니다.' },
  { subject: '마케팅', title: '4p에 대해서 알려주실 분', replyCnt: 14, goodCnt: 30, content: '마케팅의 기본 요소인 Product, Price, Place, Promotion에 대해 알아봅니다.' },
  { subject: '회계원리', title: '회계자격증 공부 질문있습니다', replyCnt: 14, goodCnt: 30, content: '회계자격증 취득을 위한 공부 방법과 핵심 포인트를 논의합니다.' },
  { subject: '국제경영학', title: '국제경영학 수업내용 중 이런게 나왔는데 잘 모르겠습니다 친절하게 알려주실 천사분 계신가요ㅜㅜ', replyCnt: 14, goodCnt: 30, content: '국제경영의 기본 이론과 실제 사례를 비교하며 이해하는 방법을 찾습니다.' },

  ]);

  useEffect(() => {
    if (boardType === 'boardTypeA') {
      setType('공부궁물')
    } else if (boardType === 'boardTypeB') {
      setType('진로궁물')
    } else {
      setType('자유게시판')
    }

  }, [])
  const HighlightText = (text) => {
    //문자열 전체에서, 공백을 포함해, word와 일치하는 문자를 찾음
    const regex = new RegExp(`(${word.replace(/ /g, '\\s*')})`, 'gi');
    // $1은 정규표현식에서 매치된 첫 번째 그룹을 가리키는데, 여기서는 괄호로 묶인 패턴을 의미
    return <span dangerouslySetInnerHTML={{ __html: text.replace(regex, '<span class="highlight">$1</span>') }}></span>
  }
  return (
    <div className='search-result'>
      <h2 className='h2'>🔍 {type} 내 검색결과</h2>
      {
        boardA.length ?
          boardA.map((item, index) => (
            <Link to='/articleDetail' className='article' key={index}>
              <div className='row1'>
                <div className='title'><b>[{item.subject}]</b>&nbsp;{HighlightText(item.title)}</div>
                <div className='icon-box'>
                  <GoodIcon className='icon' />&nbsp;{item.goodCnt}&nbsp;&nbsp;
                  <ReplyIcon className='icon' />&nbsp;{item.replyCnt}
                </div>
              </div>
              <div className='row2'>{HighlightText(item.content)}</div>
            </Link>
          ))
          :
          <div className='empty'>"검색결과가 존재하지 않습니다!"</div>
      }

      <div className='pagenation'>
        0 1 2 3 4 5 6 7 8 9
      </div>
    </div>
  )
}

export default SearchResultPlus