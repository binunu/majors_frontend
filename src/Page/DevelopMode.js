import React from 'react'
import './DevelopMode.css'
const DevelopMode = ({ setDmIsLogIn }) => {
    return (
        <div id='dm'>
            <h1>개발자 리모컨</h1>
            <div className='dm-login'> 
                <div>
                    <input id='yes-login' type='radio' name='on' className='radio' onClick={() => { setDmIsLogIn(true)}}></input>
                    <label htmlFor='yes-login' >로그인</label>
                </div>
                <div>
                    <input id='not-login' type='radio' name='on' defaultChecked={true} className='radio' onClick={() => { setDmIsLogIn(false) }} ></input>
                    <label htmlFor='not-login' >미로그인</label>
                </div> 
            </div>
        </div>
    )
}

export default DevelopMode