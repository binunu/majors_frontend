import React, { useState } from 'react'
import DraftEditor from '../../Component/DraftEditor'
import './Board.css'


const Write = () => {
  const [needSubject, setNeedSubject] = useState(true);
  const isSubject = (e) => {
    if (e.target.value === '공부궁물') {
      setNeedSubject(true)
    } else {
      setNeedSubject(false)
    }
  }
  return (
    <div id='write'>
      <div className='bar'>새 글쓰기</div>
      <div className='set-box'>
        <div className='t-box'>
          <p className='t-tit'>제목</p>
          <input className='t-txt' placeholder='제목을 입력해주세요'></input>
        </div>
        <div className='sub-box'>

          <div className='sub-t-box'>
            <p className='t-tit'>게시판</p>
            <select className='s-box' onChange={isSubject}>
              <option className='opt' value='공부궁물' >공부궁물</option>
              <option className='opt' value='진로궁물'>진로궁물</option>
              <option className='opt' value='자유게시판' >자유게시판</option>
            </select>
          </div>

          {needSubject &&
            <div className='sub-t-box second'>
              <p className='t-tit'>과목</p>
              <input className='s-txt' placeholder='과목명을 입력해주세요'></input>
            </div>
          }

        </div>

        <div className='sub-t-box'>
          <p className='t-tit'>학과선택</p>
          <select className='s-box'>
            <option className='opt' value='공부궁물'>해운경영</option>
            <option className='opt' value='진로궁물'>컴퓨터공학</option>
            <option className='opt' value='자유게시판'>교육학</option>
          </select>
        </div>

      </div>
      <DraftEditor />
      <div className='btn-box'>
        <button className='btn'>글쓰기</button>
      </div>
    </div>
  )
}

export default Write