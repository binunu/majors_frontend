import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [onAuthEmail, setOnAuthEmail] = useState(false)
  const [authNum, setAuthNum] = useState('')
  const [nickname, setNickname] = useState('')


  const [emailForm, setEmailForm] = useState(null) //이메일형식체크
  const [passEmail, setPassEmail] = useState(null) //이메일중복체크
  const [passwordForm, setPasswordFrom] = useState(null) //비번형식체크
  const [passPassword, setPassPassword] = useState(null)
  const [passAuthNum, setPassAuthNum] = useState(null)
  const [passNickname, setPassNickname] = useState(null)
 

  const checkEmail = () => {  // 1. 형식체크 t/f, 중복확인 t/f, 인증번호 폼 on/off
    //이메일형식체크
    const emailPattern = /^[가-힣a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) { //형식체크 통과 
      setEmailForm(true)
      if (email === 'llsbdm001@naver.com') { //이메일서버보내서 중복체크하기
        setOnAuthEmail(true)
        setPassEmail(true) 
      } else {
        setPassEmail(false) 
        setOnAuthEmail(false) 
      }  
    } else {
      //형식체크 실패시
      setEmailForm(false)
      setOnAuthEmail(false) 
      setPassEmail(null) 
    }

  }
  //메세지 띄우기 관련
  const changeEmail = (e) => { //만약 인증을 받고 다시 입력값을 수정하면 메세지가 그대로 남아있을테니까 메세지도 초기화
    var value = e.target.value
    if (value === '') {
      setEmailForm(null)
      setOnAuthEmail(false)
    }
    setEmail(value)
  }
  const checkPassword = (e) => {
    setPassword(e.target.value)
    setPassPassword(null)
    // const passwordPattern =/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,16}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;

    if (passwordPattern.test(e.target.value)) {
      setPasswordFrom(false)
    } else {
      setPasswordFrom(true)
    }
  }
  const checkDoublePassword = (e) => { 
    var value = e.target.value
    if (value === '') {
      setPassPassword(null)
    } else if (value === password) {
      setPassPassword(true)
    } else {
      setPassPassword(false)
    }

  }
  const checkAuthNum = () => {
    const test = '1234'
    if (authNum === test) {
      setPassAuthNum(true)
    } else {
      setPassAuthNum(false)
    }
  }
  const checkNickname = () => {
    //passNickname 서버로보내기
    if (nickname === '1234') {
      setPassNickname(true)

    } else {

      setPassNickname(false)
    }
  }
  const test = (e) => {
    e.preventDefault()
    console.log(passEmail,passAuthNum, passPassword, passNickname)
  }
  return (
    <div id='join' className='member-basic'>
      <form>
        <div className='container'> 
          <h1 className='h1'>회원가입</h1> 
          <input className='input' placeholder='이름' minLength={2} maxLength={10} onChange={(e) => setName(e.target.value)} />
          <div className='auth-box'>
            <input className='input ip-auth' min={3} maxLength={254} placeholder='email@majors.com' onChange={changeEmail} />
            {
              email ?
                <input type='button' className='auth-btn on' value='중복확인' onClick={checkEmail} />
                :
                <input type='button' className='auth-btn' value='중복확인' />
            }
          </div>
          {
            emailForm === false && passEmail==null &&
            <p className='message-f'>올바른 이메일 형식을 입력해주세요</p>
          }
            {
              emailForm && passEmail == false &&
              <p className='message-f'>이미 존재하는 이메일입니다</p>
  
            }
          {
            emailForm && passEmail &&
            <p className='message-t'>인증번호가 발송되었습니다</p>
          }
          {onAuthEmail &&
            <div className='auth-box'>
              <input className='input ip-auth' placeholder='인증번호를 입력해주세요' onChange={(e) => { setAuthNum(e.target.value) }} />
              {
                authNum ?
                  <input type='button' className='auth-btn on' value='확인' onClick={checkAuthNum} />
                  :
                  <input type='button' className='auth-btn' value='확인' />
              }
            </div>
          }
          {passAuthNum &&
            <p className='message-t'>인증이 완료되었습니다</p>
          }
          {passAuthNum === false &&
            <p className='message-f'>인증번호가 일치하지 않습니다</p>
          }
          <input className='input' type='password' minLength={8} maxLength={16} placeholder='8~16자리 비밀번호 입력' onChange={checkPassword} />
          {passwordForm &&
            <p className='message-f'>8~16자이내, 대소문자와 숫자를 1개 이상 포함해주세요</p>
          }
          <input className='input' type='password' placeholder='비밀번호 확인' onChange={checkDoublePassword} />
          {passPassword === true &&
            <p className='message-t'>비밀번호가 일치합니다</p>
          }
          {passPassword === false &&
            <p className='message-f'>비밀번호가 일치하지 않습니다</p>
          }
          <div className='auth-box'>
            <input className='input ip-auth' placeholder='닉네임을 입력해주세요' minLength={2} maxLength={8} onChange={(e) => setNickname(e.target.value)} />
            {
              nickname ?
                <input type='button' className='auth-btn on' value='중복확인' onClick={checkNickname} />
                :
                <input type='button' className='auth-btn' value='중복확인' />
            }
          </div>
          {passNickname &&
            <p className='message-t'>사용가능한 닉네임입니다 </p>
          }{
            passNickname === false &&
            <p className='message-f'>이미 존재하는 닉네임입니다 </p>

          }
          {
            passEmail && passPassword && passNickname && passAuthNum ?
              <button type='button' className='submit-btn on' onClick={test} >회원가입</button>
              :
              <button type='submit' className='submit-btn d' onClick={test}>회원가입</button>
          }
          <div className='login-box'> 
          <p className='login-p'>이미 계정이 있으신가요?<Link to='/login' className='login-btn'>로그인</Link></p>
          <Link to='/main' className='to-main'>메인으로</Link>
          {/* <div className='social-box'>간편로그인</div> */}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Join