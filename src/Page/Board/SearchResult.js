import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';
import axiosURL from '../../Utill/AxiosURL';

const SearchResult = () => {
  const { word } = useParams();
  const [boardA, setboardA] = useState([]);
  const [boardB, setboardB] = useState([]);
  const [boardC, setboardC] = useState([]);

  const [totalA, setTotalA] = useState(0);
  const [totalB, setTotalB] = useState(0);
  const [totalC, setTotalC] = useState(0);

  useEffect(() => {
    axiosURL.get(`/board/article/list/search/study/${word.trim()}`)
      .then(res=>{
        setboardA(res.data.list)
        setTotalA(res.data.totalCnt)
      }).catch(err=>console.log(err))

    axiosURL.get(`/board/article/list/search/job/${word.trim()}`)
      .then(res=>{
        setboardB(res.data.list)
        setTotalB(res.data.totalCnt)
      }).catch(err=>console.log(err))

    axiosURL.get(`/board/article/list/search/community/${word.trim()}`)
      .then(res=>{
        setboardC(res.data.list)
        setTotalC(res.data.totalCnt)
      }).catch(err=>console.log(err)) 
    
  }, [word])

  //정규표현식을 사용해 text안에 포함된 word에만 highlight css를 적용
  const HighlightText=(text)=>{
    //문자열 전체에서, 공백을 포함해, word와 일치하는 문자를 찾음
    const regex = new RegExp(`(${word.replace(/ /g, '\\s*')})`, 'gi');
    // $1은 정규표현식에서 매치된 첫 번째 그룹을 가리키는데, 여기서는 괄호로 묶인 패턴을 의미
    return  <span dangerouslySetInnerHTML={{ __html: text.replace(regex, '<span class="highlight">$1</span>') }}></span>
  }
  return (
    <div className='search-result'>
      <h1 className='h1'>"{word}"</h1>
      {/* 공부궁물 게시판 */}
      <div className='container'>
        <h2 className='h2'>🔍 공부궁물 내 검색결과</h2>
        {
          boardA.length ?
          boardA.map((item, index) => (
            <Link to={`/articleDetail/${item.id}`} className='article' key={index}>
              <div className='row1'>
                <div className='title'><b>[{item.middleMajor}]</b>&nbsp;{HighlightText(item.title)}</div>
                <div className='icon-box'>
                  <GoodIcon className='icon' />&nbsp;{item.goods}&nbsp;&nbsp;
                  <ReplyIcon className='icon' />&nbsp;{item.commentCnt}
                </div>
              </div>
              <div className='row2'>{HighlightText(item.content)}</div>
            </Link>
          ))
          :
          <div className='empty'>"검색결과가 존재하지 않습니다!"</div> 
        }
        {
          totalA > 7 &&
          <Link to={`/searchResult/plus/boardTypeA/${word}/1`} className='plus'>
          검색결과 더보기
        </Link> 
        }
      </div>
      {/* 진로궁물게시판 */}
      <div className='container'>
        <h2 className='h2'>🔍 진로궁물 내 검색결과</h2>
        {
           boardB.length ? 
           boardB.map((item,index)=>( 
             <Link to={`/articleDetail/${item.id}`}  className='article' key = {index}>
             <div className='row1'>
             <div className='title'><b>[{item.middleMajor}]</b>&nbsp;{HighlightText(item.title)}</div>
               <div className='icon-box'>
                 <GoodIcon className='icon' />&nbsp;{item.goods}&nbsp;&nbsp;
                 <ReplyIcon className='icon' />&nbsp;{item.commentCnt}
               </div>
             </div>
             <div className='row2'>{HighlightText(item.content)}</div>
           </Link>
           )) 
           : 
           <div className='empty'>"검색결과가 존재하지 않습니다!"</div> 
        }
         {
          totalB > 7 &&
          <Link to={`/searchResult/plus/boardTypeB/${word}/1`} className='plus'>
          검색결과 더보기
        </Link> 
        }
      </div>
      {/* 자유게시판 */}
      <div className='container'>
        <h2 className='h2'>🔍 자유게시판 내 검색결과</h2>
        {
           boardC.length ? 
           boardC.map((item,index)=>( 
             <Link to={`/articleDetail/${item.id}`}  className='article' key = {index}>
             <div className='row1'>
             <div className='title'><b>[{item.middleMajor}]</b>&nbsp;{HighlightText(item.title)}</div>
               <div className='icon-box'>
                 <GoodIcon className='icon' />&nbsp;{item.goods}&nbsp;&nbsp;
                 <ReplyIcon className='icon' />&nbsp;{item.commentCnt}
               </div>
             </div>
             <div className='row2'>{HighlightText(item.content)}</div>
           </Link>
           ))
           :
           <div className='empty'>"검색결과가 존재하지 않습니다!"</div> 
        }
         {
          totalC > 7 &&
          <Link to={`/searchResult/plus/boardTypeC/${word}/1`} className='plus'>
          검색결과 더보기
        </Link> 
        }
      </div>
    </div>
  )
}

export default SearchResult