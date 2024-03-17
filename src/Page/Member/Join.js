import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosURL from '../../Utill/AxiosURL'
import './Member.css'

const Join = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('A')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [onAuthEmail, setOnAuthEmail] = useState(false)
  const [authNum, setAuthNum] = useState('')
  const [nickname, setNickname] = useState('')
  const [middleMajor, setMiddleMajor] = useState('')
  const [largeMajor, setLargeMajor] = useState('')
  const [major, setMajor] = useState('')

  const [emailForm, setEmailForm] = useState(null) //이메일형식체크
  const [passEmail, setPassEmail] = useState(null) //이메일중복체크
  const [passwordForm, setPasswordFrom] = useState(null) //비번형식체크
  const [passPassword, setPassPassword] = useState(null)
  const [passAuthNum, setPassAuthNum] = useState(null)
  const [passNickname, setPassNickname] = useState(null)

  const [graduated, setGraduated] = useState()
  const [onCustomMajor, setOnCustomMajor] = useState(false)
  //전공선택
  const [largeList, setLargeList] = useState([])
  const [middleList, setMiddleList] = useState([])
  const [smallList, setSmallList] = useState([])
  const [showMiddle, setShowMiddle] = useState(false)
  const [showSmall, setShowSmall] = useState(false)

  const [code, setCode] = useState('')
  const [isRetry, setIsRetry] = useState('중복확인');
  const [emailMessage,setEmailMessage] = useState()


  useEffect(() => {
    const dateString = '2023-12-15T01:59:36.274+00:00';
    const dateObject = new Date(dateString);
    //대분류가져오기
    axiosURL.get('/contents/major-list/large')
      .then(res => {
        setLargeList(res.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, [])

  const checkEmail = () => {  // 1. 형식체크 t/f, 중복확인 t/f, 인증번호 폼 on/off
    //이메일형식체크 
    setPassAuthNum(null) //인증메세지가있다면 지우기
    const emailPattern = /^[가-힣a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) { //형식체크 통과 > 중복체크
      setEmailForm(true)
      axiosURL.post('/member/email/exists', { email: email })
        .then(res => { 
          if (res.data===true) { 
            setOnAuthEmail(true)
            setPassEmail(true)
            sendEmail() }
        }).catch(error => {
          console.log(error)
          setEmailMessage(error.response.data)
          setPassEmail(false)
          setOnAuthEmail(false)
        })

    } else {
      //형식체크 실패시
      setEmailForm(false)
      setOnAuthEmail(false)
      setPassEmail(null)
    }
  }

  //이메일인증전송
  const sendEmail = () => {
    axiosURL.post('/member/email/send', { email: email }) //이메일로 인증번호 보내기
      .then(res2 => {
        console.log(res2.data)
        setIsRetry('재전송')
        setCode(res2.data)
      }).catch(error => {
        console.log('인증번호 전송 실패')
        console.log(error)
      })
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
    if (authNum === code) {
      setPassAuthNum(true)
    } else {
      setPassAuthNum(false)
    }
  }
  const checkNickname = () => {
    axiosURL.get('/member/nickname/exist', {
      params: { nickname: nickname }
    }).then(res => {
      if (res.data) {
        setPassNickname(true)
      } else {
        setPassNickname(false)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const changeLargeMajor = (e) => {
    setLargeMajor(e.target.value)
    setOnCustomMajor(false)
    setShowMiddle(false)
    setShowSmall(false)
    setMajor('')
    if (e.target.value === 'base') {
      setShowMiddle(false)
    } else {
      setShowMiddle(true)
      const large = e.target.value;
      axiosURL.get(`/contents/major-list/middle`, {
        params: { large }
      })
        .then(res => {
          setMiddleList(res.data);
        })
        .catch(error => {
          console.error(error);
        })
    }
  }
  const changeMiddleMajor = (e) => {
    setOnCustomMajor(false)
    setMiddleMajor(e.target.value)
    setMajor('')
    if (e.target.value === 'base') {
      setShowSmall(false)
    } else {
      setShowSmall(true)
      const middle = e.target.value;
      axiosURL.get(`/contents/major-list/small`, {
        params: { middle }
      })
        .then(res => {
          setSmallList(res.data);
        })
        .catch(error => {
          console.error(error);
        })

    }
  }
  const changeSmallMajor = (e) => {
    if (e.target.value === '직접입력') {
      setOnCustomMajor(true)
      setMajor(null)
    } else {
      setMajor(e.target.value)
      setOnCustomMajor(false)
    }
  }
  const submitJoin = () => {
    setState('B')
  }
  const submitSet = (e) => {
    e.preventDefault() 
    if (!passEmail || !passAuthNum || !passPassword || !passNickname) {
      e.preventDefault()
      alert("입력한 정보를 다시 확인해주세요")
    }

    const requestData = {
      name: name,
      email: email,
      password: password,
      nickname: nickname,
      largeMajor : largeMajor,
      middleMajor: middleMajor,
      major: major,
      graduated: graduated,
    };

    axiosURL.post('/member/join', requestData)
      .then(res => {
        setState('Last')
      }).catch(err => {
        console.log(err)
      })
  }
  const gologIn = () => {
    navigate("/login", { state: { from: "/join" } });
  }
  return (
    <div id='join' className='member-basic'>
      <form>
        {state === 'A' &&
          <div className='container'>
            <h1 className='h1'>회원가입</h1>
            <input className='input' placeholder='이름' minLength={2} maxLength={10} onChange={(e) => setName(e.target.value)} />
            <div className='auth-box'>
              <input className='input ip-auth' min={3} maxLength={254} placeholder='email@majors.com' onChange={changeEmail} />
              {
                email ?
                  <input type='button' className='auth-btn on' value={isRetry} onClick={checkEmail} />
                  :
                  <input type='button' className='auth-btn' value={isRetry} />
              }
            </div>
            {
              emailForm === false && passEmail == null &&
              <p className='message-f'>올바른 이메일 형식을 입력해주세요</p>
            }
            {
              emailForm && !passEmail &&
              <p className='message-f'>{emailMessage}</p>

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
              <p className='message-f'>8~16자이내, 영문자와 숫자를 1개 이상 포함해주세요</p>
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
                <button type='button' className='submit-btn on' onClick={submitJoin} >회원가입</button>
                :
                <button type='button' className='submit-btn d' >회원가입</button>
            }
            <div className='login-box'>
              <p className='login-p'>이미 계정이 있으신가요?<Link to='/login' className='login-btn'>로그인</Link></p>
              <Link to='/' className='to-main'>메인으로</Link>
              {/* <div className='social-box'>간편로그인</div> */}
            </div>
          </div>

        }
        {state === 'B' &&
          <div className='container'>
            <h1 className='h1'>당신의 전공은 무엇인가요?</h1>
            <select className='input' onChange={changeLargeMajor}>
              <option value='base'>대분류 선택</option>
              {
                largeList.map((item, index) => (
                  <option value={item.large} key={index}>{item.large}</option>
                ))
              }
            </select>
            {
              showMiddle &&
              <select className='input select-h' onChange={changeMiddleMajor}>
                <option value='base'>중분류 선택</option>
                {
                  middleList.map((item, index) => (
                    <option value={item.middle} key={index}>{item.middle}</option>
                  ))
                }
              </select>
            }
            {
              showSmall &&
              <select className='input select-h' onChange={changeSmallMajor}>
                <option value='base'>소분류 선택</option>
                {
                  smallList.map((item, index) => (
                    <option value={item.small} key={index}>{item.small}</option>
                  ))
                }
                <option value='직접입력'>직접입력</option>
              </select>
            }
            {
              onCustomMajor &&
              <input className='input' placeholder='전공을 입력해주세요' onChange={(e) => { setMajor(e.target.value) }}></input>
            }

            <h1 className='h1'>대학교를 졸업했나요?</h1>
            <div className='gd-box'>
              <input className={`gd-btn ${graduated === 'Y' ? 'on' : ''}`} type='button' value='예' onClick={() => { setGraduated('Y') }}></input>
              <input className={`gd-btn ${graduated === 'N' ? 'on' : ''}`} type='button' value='아니오' onClick={() => { setGraduated('N') }}></input>
            </div>
            {
              major && major !== 'base' && graduated ?
                <button type='submit' className='submit-btn on width' onClick={submitSet}>확인</button>
                :
                <button disabled className='submit-btn width no'>확인</button>
            }
          </div>
        }
      </form>
      {state === 'Last' &&
        <div className='container'>
          <p className='h1'>회원가입이 완료되었습니다</p>
          <p className='h5'>다양한 {major}의 전공자들을 만나보세요!</p>
          <span className='last-login-btn' onClick={gologIn} >로그인</span>
          <Link to='/' className='main-btn'>메인으로</Link>
        </div>
      }

    </div>
  )
}

export default Join