import React,{useEffect, useState} from 'react'
// import { useState } from 'react'
import './Board.css'
import { Link } from 'react-router-dom'
import { useLoginContext } from '../../Utill/LogInContext'
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import axiosURL from '../../Utill/AxiosURL'


const Home = () => {
  const {isLogIn} = useLoginContext();
  const [gArticles, setGArticles] = useState([])
  const [cArticles, setCArticles] = useState([])
  const [rArticles, setRArticles] = useState([])
  const [mArticles, setMArticles] = useState([])
  const [ranking, setRanking] = useState([])

  useEffect(()=>{
    if(isLogIn){
      const token = localStorage.getItem("accessToken")
      axiosURL.get('/board/article/list/user/major',{//전공
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res=>setMArticles(res.data)).catch(err=>console.log(err))
      axiosURL.get('/board/article/list/user/rank',{ //랭킹(게시글 + 댓글)
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res=>setRanking(res.data)).catch(err=>console.log(err))
    }
    axiosURL.get('/board/article/list/goods').then(res=>setGArticles(res.data)).catch(err=>console.log(err))//추천
    axiosURL.get('/board/article/list/comments').then(res=>setCArticles(res.data)).catch(err=>console.log(err))//댓글
    axiosURL.get('/board/article/list/recency').then(res=>setRArticles(res.data)).catch(err=>console.log(err))//최신  
    
  },[isLogIn])
  return (
    <div id='home'> 
      <div className='board'>
        <p className='title'>👍추천 TOP 5</p>
        {gArticles && gArticles.length > 0 ?
          gArticles.map((article,index)=>(
            <div className='article' key={index}>
              <Link to={`/articleDetail/${article.id}`} className='a a1'><b>[{article.middleMajor}]</b> {article.title}</Link>
              <div className='a-tail'>
                    <GoodIcon className='icon'/>&nbsp;{article.goods}&nbsp;&nbsp; 
                  </div>
            </div> 
          ))
          :
              <p className='empty-p'>게시글이 존재하지 않습니다!</p>
        }
        
      </div>
      <div className='section'>
        <div className='board board2'>
          <p className='title'>💬 댓글 많은 게시글</p>
          {cArticles && cArticles.length > 0 ?
            cArticles.map((article,index)=>(
              <div className='article' key={index}>
                 <Link to={`/articleDetail/${article.id}`} className='a a2'>{article.title}</Link>
                 <div className='a-tail'> 
                    <ReplyIcon className='icon'/>&nbsp;{article.commentCnt}
                  </div> 
              </div> 
              
            ))
            :
              <p className='empty-p'>작성된 댓글이 존재하지 않습니다!</p>
          }
          
        </div>
        <div className='board board2'>
          <p className='title'>🕑 최신 게시글</p>
          {rArticles && rArticles.length > 0 ?
            rArticles.map((article,index)=>(
              <div className='article' key={index}>
                 <Link to={`/articleDetail/${article.id}`} className='a a3'>{article.title}</Link>
                <p className='major'>({article.middleMajor})</p>
              </div> 
            ))
            :
            <p className='empty-p'>게시글이 존재하지 않습니다!</p>
          }
        </div>
      </div>
      <div className='section'>
        <div className='board board2'>
          <p className='title'>🔥 우리 전공 핫한 게시글</p>
          {isLogIn ?
            <>
              { mArticles.length>0?
            mArticles.map((article,index)=>(
              <div className='article' key={index}>
                 <Link to={`/articleDetail/${article.id}`} className='a a3'>{article.title}</Link>
                <p className='major'>({article.middleMajor})</p>
              </div> 
            ))
            :
            <p className='empty-p'>게시글이 존재하지 않습니다!</p>
          }
            </>
            :
            <div className='login'>
              <p>로그인 후 바로 확인하세요!</p>
              <Link to='/logIn' className='link'>로그인하기&gt;&gt;</Link>
            </div>
          }
        </div>
        <div className='board board2'>
          <p className='title'>👑 우리 전공 최고의 아웃풋은?</p>
          {isLogIn ?
            <>
            {  
              ranking.map((member,index)=>(
                <div className='pf-box'>
                <div className='pf'>
                  <div className='pf1'><img src={`http://localhost:8080/image/view/${member.profile}`} alt='프로필사진'/></div>
                  <div className='pf2'>{member.nickname}</div>
                </div>
                <div className={`pf3 rank-${index+1}`}>{index+1}등</div>
              </div> 
                )) 
              } 
            </>
            :
            <div className='login'>
              <p>로그인 후 바로 확인하세요!</p>
              <Link to='/logIn' className='link'>로그인하기&gt;&gt;</Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Home