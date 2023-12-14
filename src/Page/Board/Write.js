import React, { useState, useEffect, useRef } from 'react'
import './Board.css'
import { useLoginContext } from '../../Utill/LogInContext'
import { useNavigate } from 'react-router'
import axiosURL from '../../Utill/AxiosURL';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const { isLogIn } = useLoginContext();
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [needSubject, setNeedSubject] = useState(true);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [boardType, setBoardType] = useState('공부궁물');
  const [middleMajor, setMiddleMajor] = useState('');
  const [middleMajorList, setMiddleMajorList] = useState([]);
  const [content,setContent] = useState('')
  const token = localStorage.getItem('accessToken');
  useEffect(() => { 
    if (!isLogIn) {
      alert("로그아웃 되었습니다. 다시 로그인 해 주세요.")
      navigate("/logIn")
    }
    axiosURL.get("/contents/major-list/middle")
      .then(res => {
        setMiddleMajorList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    axiosURL.get('/member/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(res => {
      setMember(res.data)
      setMiddleMajor(res.data.middleMajor)
    }).catch(err => {
      console.log(err)
    })

  }, [])
  const isSubject = (e) => {  
    setBoardType(e.target.value) 
    setSubject(null);
    if (e.target.value === '공부궁물') {
      setNeedSubject(true)
    } else {
      setNeedSubject(false)
    }
  }

  const submitBtn=(e)=>{ 
    e.preventDefault()
    const article = {
      title:title,
      boardType:boardType,
      content:content,
      middleMajor:middleMajor,
      subject:subject, 
    }
    axiosURL.post('/board/article/write', article, {
      headers:{
      Authorization: `Bearer ${token}`,
      }
    }).then(res=>{
      alert("게시글이 정상적으로 등록되었습니다!")
      navigate(`/articleDetail/${res.data}`) 
    }).catch(err=>{
      alert("게시글을 저장에 실패했습니다. 다시 시도하세요")
      console.log(err)
    })
  }
  const modules={
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike'], 
        [{ 'color': [] }, { 'background': [] }],  
        [{ 'align': [] }], 
      ],
    }, 
  }
  return (
    <>
      {
        isLogIn &&
        <div id='write'>
          <form>          
          <div className='bar'>새 글쓰기</div>
          <div className='set-box'>
            <div className='t-box'>
              <p className='t-tit'>제목</p>
              <input className='t-txt' placeholder='제목을 입력해주세요' minLength={2} maxLength={50} required onChange={(e)=>{setTitle(e.target.value)}}></input>
            </div>
            <div className='sub-box'>

              <div className='sub-t-box'>
                <p className='t-tit'>게시판</p>
                <select className='s-box' onChange={isSubject} value={boardType}>
                  <option className='opt' value='공부궁물' >공부궁물</option>
                  <option className='opt' value='진로궁물'>진로궁물</option>
                  <option className='opt' value='자유게시판' >자유게시판</option>
                </select>
              </div>

              {needSubject &&
                <div className='sub-t-box second'>
                  <p className='t-tit'>과목</p>
                  <input className='s-txt' placeholder='과목명을 입력해주세요' required minLength={2} maxLength={20} onChange={(e)=>{setSubject(e.target.value)}}></input>
                </div>
              } 
            </div>

            <div className='sub-t-box'>
              <p className='t-tit'>학과선택</p>
              <select className='s-box' value={middleMajor} onChange={(e) => { setMiddleMajor(e.target.value) }} >
                {middleMajorList.map((item, index) => (
                  <option className='opt' value={item.middle} key={index}>{item.middle}</option>
                ))
                }
              </select>
            </div>

          </div>
          <div id='editor'>
            <ReactQuill 
            className='custom-editor'
            modules={modules} 
            onChange={setContent} 
            >
            </ReactQuill>
          </div>
          <div className='btn-box'>
            <button className='btn' type='submit' onClick={submitBtn}>글쓰기</button>
          </div>
          </form> 
        </div>
      }
    </>

  )
}

export default Write