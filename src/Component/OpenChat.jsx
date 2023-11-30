import React, { useRef, useEffect } from 'react';
import './Component.css' 
import { useState } from 'react'

const OpenChat = () => {
  const [sendBtn,setSendBtn] = useState(0)
  const dmRef = useRef(null);
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  useEffect(() => {
    const dmElement = dmRef.current;
    if (dmElement) {
      dmElement.onmousedown = dragMouseDown;
    }
  }, []);

  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    dmRef.current.style.top = dmRef.current.offsetTop - pos2 + 'px';
    dmRef.current.style.left = dmRef.current.offsetLeft - pos1 + 'px';
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };


  const activeSendBtn=(e)=>{
    setSendBtn(e.target.value.length)
  }

  return ( 
    <div id='chat-room' ref={dmRef}>
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