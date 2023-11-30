import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Member.css'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [availableEmail, setAvailable] = useState(false)
  // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const tryLogIn = (e) => {
    e.preventDefault()
    const emailPattern = /^[가-힣a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) {
      alert('성공!')
    } else {
      alert('올바른 이메일 형식을 입력해주세요')
    }

  }
  return (
    <div id='login' className='member-basic'> 
      <form onSubmit={tryLogIn}>
        <div className='container'> 
          <h1 className='h1'>로그인</h1>
          <Link to='/main' className='to-main'>메인으로</Link> 
          <input className='input' minLength={3} maxLength={254} placeholder='이메일을 입력하세요' onChange={(e) => { setEmail(e.target.value) }} required />
          <input className='input' type='password' minLength={8} maxLength={16} onChange={(e) => { setPassword(e.target.value) }} placeholder='비밀번호를 입력하세요' required />
          <button className='submit-btn' type='submit'>로그인</button>
          <div className='etc-box'>
            <Link className='join-btn' to='/join'>회원가입</Link>
            <Link className='find-btn' to='/find'>비밀번호 재설정</Link>
          </div>
          <div className='social' social>
            {/* 카카오 and 네이버 로그인 만들자! */}
          </div>
        </div>
      </form>
    </div>
  )
}

export default LogIn