import React, { useState } from 'react'
import './Member.css'
import { Link } from 'react-router-dom';

const Find = () => {
  const emailPattern = /^[가-힣a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [onBtn, setOnBtn] = useState(false)
  const [isPassTest, setIsPassTest] = useState(true)
  const [state, setState] = useState('A')
  const [email, setEmail] = useState('')
  const [authNum, setAuthNum] = useState('')
  const [onEmailMessage,setOnEmailMessage] = useState(false)
  const [onAuthMessage, setOnAuthMessage] = useState(false)
  const [password, setPassword] =useState('')
  const [passwordForm, setPasswordFrom] = useState(null) //비번형식체크
  const [passPassword, setPassPassword] = useState(null)
  const [onPwBtn,setOnPwBtn] = useState(false)

  const changeEmail = (e) => {
    setEmail(e.target.value)
    if (emailPattern.test(e.target.value)) {
      setIsPassTest(true)
      setOnBtn(true)
    } else {
      setIsPassTest(false)
      setOnBtn(false)
    }
  }
  const nextToB = () => {
    //존재하는 이메일인지 확인
    const answer = 'llsbdm001@naver.com'
    if(email===answer){
      setState('B') 
      setOnEmailMessage(false)
    }else{
      setOnEmailMessage(true)
    }
  }
  const nextToC = () => {
    //인증번호 맞는지 확인
    const answer = '1234'
    if (authNum === answer) {
      alert('인증 성공')
      setState('C')
      setOnAuthMessage(false)
    } else {
      setOnAuthMessage(true)
    } 
  }
  const nextToLast=()=>{
    if(passPassword){
      setState('Last')
    }else{
      alert('비밀번호를 다시 확인해주세요')
    }
  }

  // 비밀번호 중복확인
  const checkPassword = (e) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;
    setPassword(e.target.value)
    setPassPassword(null)  
    setOnPwBtn(false)
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
      setOnPwBtn(false)
    } else if (value === password) {
      setPassPassword(true)
      setOnPwBtn(true)
    } else {
      setPassPassword(false)
      setOnPwBtn(false)
    }

  }
   
  return (
    <div id='find' className='member-basic'>
      <div className='container'>
        {state === 'A' &&
          <div className='container'>
              <h1 className='h1'>비밀번호 재설정</h1>
              <Link to='/main' className='to-main'>메인으로</Link>
            <input className={`input ${isPassTest ? '' : 'red'}`} placeholder='이메일을 입력해주세요' onChange={changeEmail} />
            {
              onEmailMessage &&
              <p className='message-f'>존재하지 않는 이메일입니다.</p>
            }
            {onBtn ?
              <input type='button' className='submit-btn on' onClick={nextToB} value='인증번호 전송' />
              :
              <input type='button' disabled className='submit-btn' value='인증번호 전송' />
            }
          </div>
        }
        {state === 'B' &&
          <div className='container'>
            <p className='h2'>{email}<br />으로 전송된 인증번호를 입력해주세요.</p>
            <p className='h3'>인증번호 재전송하기</p>
            <input className={`input ${isPassTest ? '' : 'red'}`} placeholder='인증번호를 입력해주세요' onChange={(e) => { setAuthNum(e.target.value) }} />
            {
              onAuthMessage &&
              <p className='message-f'>인증번호가 틀렸습니다.</p>
            }
            <input type='button' className='submit-btn on' onClick={nextToC} value='확인' />
          </div>
        }
        {
          state === 'C' &&
          <div className='container'>
            <p className='h2'>이메일 인증에 성공하셨습니다.</p>
            <p className='h4'>비밀번호를 재설정해주세요.</p>
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
          }{
            onPwBtn?
            <input type='button' className='submit-btn on' onClick={nextToLast} value='변경' />
            :
            <input type='button' disabled className='submit-btn' onClick={nextToLast} value='변경' /> 
          }
          
          </div>
        }
        { state==='Last' &&
          <div className='container'>
            <p className='h2'>비밀번호 변경에 성공했습니다</p>
            <p className='h4'>다시 로그인해주세요</p>
            <Link to='/login' className='login-btn'>로그인</Link>
            <Link to='/main'className='main-btn'>메인으로</Link>
          </div>

        }

      </div>
    </div>
  )
}

export default Find