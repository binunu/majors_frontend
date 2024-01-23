import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link,useNavigate } from 'react-router-dom'
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import axiosURL from '../../Utill/AxiosURL';
import Pagination from '../../Component/Pagination';

const SearchResultPlus = () => {
  const { boardType, word, pageNum } = useParams() 
  const [type, setType] = useState()
  const [board, setBoard] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (boardType === 'boardTypeA') {
      setType('공부궁물')
      axiosURL.get(`/board/article/list/search/study/${word}/${pageNum}`)
      .then(res=>{
        setBoard(res.data.list)
        setPageInfo(res.data.pageInfo)
      }).catch(err=>console.log(err))
    } else if (boardType === 'boardTypeB') {
      setType('진로궁물')
      axiosURL.get(`/board/article/list/search/job/${word}/${pageNum}`)
      .then(res=>{
        setBoard(res.data.list)
        setPageInfo(res.data.pageInfo)
      }).catch(err=>console.log(err))
    } else {
      setType('자유게시판')
      axiosURL.get(`/board/article/list/search/community/${word}/${pageNum}`)
      .then(res=>{
        setBoard(res.data.list)
        setPageInfo(res.data.pageInfo)
      }).catch(err=>console.log(err))
    } 
  }, [pageNum])
  const highlightText = (text) => {
    //문자열 전체에서, 공백을 포함해, word와 일치하는 문자를 찾음
    const regex = new RegExp(`(${word.replace(/ /g, '\\s*')})`, 'gi');
    // $1은 정규표현식에서 매치된 첫 번째 그룹을 가리키는데, 여기서는 괄호로 묶인 패턴을 의미
    return <span dangerouslySetInnerHTML={{ __html: text.replace(regex, '<span class="highlight">$1</span>') }}></span>
  }
  const changePage=(page)=>{
      navigate(`/searchResult/plus/${boardType}/${word}/${page}`)
      
  }
  return (
    <div className='search-result'>
      <h2 className='h2'>🔍 {type} 내 검색결과</h2>
      {
        board.length ?
          board.map((item, index) => (
            <Link to='/articleDetail' className='article' key={index}>
              <div className='row1'>
                <div className='title'><b>[{item.middleMajor}]</b>&nbsp;{highlightText(item.title)}</div>
                <div className='icon-box'>
                  <GoodIcon className='icon' />&nbsp;{item.goods}&nbsp;&nbsp;
                  <ReplyIcon className='icon' />&nbsp;{item.commentCnt}
                </div>
              </div>
              <div className='row2'>{highlightText(item.content)}</div>
            </Link>
          ))
          :
          <div className='empty'>"검색결과가 존재하지 않습니다!"</div>
      }

      <div className='pagenation'>
        <Pagination pageInfo={pageInfo} changePage={changePage}/>
      </div>
    </div>
  )
}

export default SearchResultPlus