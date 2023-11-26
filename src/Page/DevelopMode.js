import React, { useRef, useEffect } from 'react';
import './DevelopMode.css';

const DevelopMode = ({ setDmIsLogIn,setDmGraduate }) => {
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

  return (
    <div
      id='dm'
      ref={dmRef}
      className='dm-container'
    >
      <h1>개발자 리모컨</h1>
      <div className='dm-login'>
        <div>
          <input id='yes-login' type='radio' name='on' className='radio' onClick={() => { setDmIsLogIn(true)}} />
          <label htmlFor='yes-login' >로그인</label>
        </div>
        <div>
          <input id='not-login' type='radio' name='on' defaultChecked={true} className='radio' onClick={() => { setDmIsLogIn(false) }} />
          <label htmlFor='not-login' >미로그인</label>
        </div> 
      </div>

      <div className='dm-login'>
        <div>
          <input id='yes-gd' type='radio' name='gd' className='radio' onClick={() => { setDmGraduate(true)}} />
          <label htmlFor='yes-gd' >졸업생</label>
        </div>
        <div>
          <input id='not-gd' type='radio' name='gd' defaultChecked={true} className='radio' onClick={() => { setDmGraduate(false) }} />
          <label htmlFor='not-gd' >미졸업생</label>
        </div> 
      </div>
    </div>
  );
};

export default DevelopMode;
