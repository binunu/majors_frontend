import React, { useEffect } from 'react'
import './Component.css' 
import { useState } from 'react'

const OpenChat = () => {
  const [sendBtn,setSendBtn] = useState(0)
  const activeSendBtn=(e)=>{
    setSendBtn(e.target.value.length)
  }
  return ( 
    <div id='chat-room'>
      <div className='box1'><span className='curcle'/><p className='title'>OPEN CHAT</p><span className='curcle'/></div>
      <div className='box2'>현재 12명의 전공자들이 참여중입니다.</div>
      <div className='box3'></div>
      <div className='box4'>
      <textarea className='text-box' placeholder='내용을 입력하세요' onChange={activeSendBtn}></textarea>  
      <div className='btn-box'><button className={`enter ${sendBtn?'active':''}`}>전송</button></div>
      
      </div>
    </div>  
  )
}

export default OpenChat