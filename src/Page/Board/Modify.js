import React, { useState, useEffect } from 'react'
import './Board.css'
import { useLoginContext } from '../../Utill/LogInContext'
import { useNavigate, useParams } from 'react-router'
import axiosURL from '../../Utill/AxiosURL';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Modify = () => {
  const { isLogIn } = useLoginContext();
  const navigate = useNavigate(); 
  const [needSubject, setNeedSubject] = useState();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [boardType, setBoardType] = useState('');
  const [middleMajor, setMiddleMajor] = useState('');
  const [middleMajorList, setMiddleMajorList] = useState([]);
  const [content,setContent] = useState('')
  const token = localStorage.getItem('accessToken');

  //수정추가
  const {id} = useParams() 

  useEffect(() => { 
    //게시글받아오기
    axiosURL.get(`/board/article/detail/${id}`) //
      .then(res => {   
        setTitle(res.data.title)
        if(res.data.subject){
          setSubject(res.data.subject) 
          setNeedSubject(true)
        }else{
          setNeedSubject(false)
        }
        setBoardType(res.data.boardType)
        setMiddleMajor(res.data.middleMajor)
        setContent(res.data.content)

      }).catch(err => {
        console.log(err)
        alert("게시글을 찾을 수 없습니다. 다시 시도하세요.")
        // navigate(-1)
      })

    axiosURL.get("/contents/major-list/middle")
      .then(res => {
        setMiddleMajorList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
       
  }, [])
  const isSubject = (e) => {  
    setBoardType(e.target.value)  
    setSubject(null);
    if (e.target.value === 'study') {
      setNeedSubject(true)
    } else {
      setNeedSubject(false)
    }
  }

  const submitBtn=(e)=>{  
    e.preventDefault()
    const article = {
      id:id, 
      title:title,
      boardType:boardType,
      content:content,
      middleMajor:middleMajor,
      subject:subject, 
    }
    axiosURL.post('/board/modify/article', article, {
      headers:{
      Authorization: `Bearer ${token}`,
      }
    }).then(res=>{ 
      alert("게시글이 정상적으로 수정되었습니다!")
      navigate(`/articleDetail/${res.data}`) 
    }).catch(err=>{
      alert("게시글 수정에 실패했습니다. 다시 시도하세요")
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
              <input className='t-txt' defaultValue={title} minLength={2} maxLength={50} required onChange={(e)=>{setTitle(e.target.value)}}></input>
            </div>
            <div className='sub-box'>

              <div className='sub-t-box'>
                <p className='t-tit'>게시판</p>
                <select className='s-box' onChange={isSubject} value={boardType}>
                  <option className='opt' value='study' >공부궁물</option>
                  <option className='opt' value='job'>진로궁물</option>
                  <option className='opt' value='community' >자유게시판</option>
                </select>
              </div>

              {needSubject &&
                <div className='sub-t-box second'>
                  <p className='t-tit'>과목</p>
                  <input className='s-txt' defaultValue={subject} required minLength={2} maxLength={20} onChange={(e)=>{setSubject(e.target.value)}}></input>
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
            value={content}
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

export default Modify