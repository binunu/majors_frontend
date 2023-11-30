import React,{useEffect} from 'react'
// import { useState } from 'react'
import './Board.css'
import { Link } from 'react-router-dom'

const Home = ({ setLogInPage, dmIsLogIn }) => {
  const article = { title: '선배님들 질문있습니다선배님들 질문있습니다선배님들 질문있습니다선배님들 질문있습니다선배 님들 질문있습습니다선 배님들습 니다선배님들 니다선배님들 ......질문있습니다', major: '경제학' };
  useEffect(()=>{
    // console.log('hello Home!')
  })
  return (
    <div id='home'>
      <div className='board'>
        <p className='title'>👁&nbsp;이번 주 인기 게시글</p>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>

      </div>
      <div className='board'>
        <p className='title'>👍추천 TOP 10</p>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
        <div className='article'>
          <a href='#' className='a a1'>{article.title}</a>
          <p className='major'>({article.major})</p>
        </div>
      </div>
      <div className='section'>
        <div className='board board2'>
          <p className='title'>💬 댓글 많은 게시글</p>
          <div className='article'>
            <a href='#' className='a a2'>{article.title}</a>
            <p className='major'>({article.major})</p>
          </div>
          <div className='article'>
            <a href='#' className='a a2'>{article.title}</a>
            <p className='major'>({article.major})</p>
          </div>
          <div className='article'>
            <a href='#' className='a a2'>{article.title}</a>
            <p className='major'>({article.major})</p>
          </div>
          <div className='article'>
            <a href='#' className='a a2'>{article.title}</a>
            <p className='major'>({article.major})</p>
          </div>
          <div className='article'>
            <a href='#' className='a a2'>{article.title}</a>
            <p className='major'>({article.major})</p>
          </div>
        </div>
        <div className='board board2'>
          <p className='title'>🕑 최신 게시글</p>
          <div className='article'>
            <a href='#' className='a a2'>{article.title}</a>
            <p className='major'>({article.major})</p>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='board board2'>
          <p className='title'>🔥 우리 전공 핫한 게시글</p>
          {dmIsLogIn ?
            <>
              <div className='article'>
                <a href='#' className='a a2'>{article.title}</a>
                <p className='major'>({article.major})</p>
              </div>
              <div className='article'>
                <a href='#' className='a a2'>{article.title}</a>
                <p className='major'>({article.major})</p>
              </div>
              <div className='article'>
                <a href='#' className='a a2'>{article.title}</a>
                <p className='major'>({article.major})</p>
              </div>
              <div className='article'>
                <a href='#' className='a a2'>{article.title}</a>
                <p className='major'>({article.major})</p>
              </div>
              <div className='article'>
                <a href='#' className='a a2'>{article.title}</a>
                <p className='major'>({article.major})</p>
              </div>
            </>
            :
            <div className='login'>
              <p>로그인 후 바로 확인하세요!</p>
              <Link to='/logIn' className='link' onClick={() => { setLogInPage(true) }}>로그인하기&gt;&gt;</Link>
            </div>
          }
        </div>
        <div className='board board2'>
          <p className='title'>👑 우리 전공 최고의 아웃풋은?</p>
          {dmIsLogIn ?
            <>
              <div className='pf-box'>
                <div className='pf'>
                  <div className='pf1'><img /></div>
                  <div className='pf2'>넙치와순치</div>
                </div>
                <div className='pf3 rank-1'>1등</div>
              </div>
              <div className='pf-box'>
                <div className='pf'>
                  <div className='pf1'><img /></div>
                  <div className='pf2'>넙치와순치</div>
                </div>
                <div className='pf3 rank-2'>2등</div>
              </div>
              <div className='pf-box'>
                <div className='pf'>
                  <div className='pf1'><img /></div>
                  <div className='pf2'>넙치와순치</div>
                </div>
                <div className='pf3  rank-2'>3등</div>
            </div>
              <div className='pf-box'>
                <div className='pf'>
                  <div className='pf1'><img /></div>
                  <div className='pf2'>넙치와순치</div>
                </div>
                <div className='pf3'>4등</div>
              </div>
              <div className='pf-box'>
                <div className='pf'>
                  <div className='pf1'><img /></div>
                  <div className='pf2'>넙치와순치</div>
                </div>
                <div className='pf3'>5등</div>
              </div>
            </>
            :
            <div className='login'>
              <p>로그인 후 바로 확인하세요!</p>
              <Link to='/logIn' className='link' onClick={() => { setLogInPage(true) }}>로그인하기&gt;&gt;</Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Home