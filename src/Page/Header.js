import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Main.css';
import SearchIcon from '@mui/icons-material/Search';  

const Header = ({setLogInPage}) => {
    const [onMenu, setOnMenu] = useState('');
    const [word, setWord] = useState('');
    const navigate = useNavigate(); 

    //헤더 메뉴 클릭에 따른 css변화
    const changeOnMenu = (e) => { 
        setOnMenu(e.target.id);
        setLogInPage(false); 
    }
    //키를눌렀을때 enter이면 서버로 전송
    const KeyDownSearch=(e)=>{
        if (e.key === 'Enter'){
            Search()
        }
    }
    //서버로 전송 후 리다이렉션
    const Search=()=>{ 
        if (word.trim !== ''){
            //서버전송 로직 추가
            /*

            */
             
            navigate(`/searchResult/${encodeURIComponent(word)}`);  
        }
    }
 
    return (
        <div id='header'>
            <div className='header-wrap'>
                <div className='menu1'>
                    <Link to='/' className='logo' onClick={()=>{setOnMenu('')}}> 
                        <img src='/image/logo.png' alt='로고 및 홈버튼'></img>
                    </Link>
                    <div className='seach'>
                        <input className='seach-text' onChange={(e)=>{setWord(e.target.value)}} onKeyDown={KeyDownSearch} placeholder='검색어를 입력하세요'></input>
                        <span className='seach-icon' onClick={Search}><SearchIcon/></span>
                    </div>
                </div>
                <div className='menu2'> 
                    <Link to='/studyAsPeed' id='m1' className={`m ${onMenu === 'm1' ? 'on' : ''}`} onClick={changeOnMenu}>공부궁물</Link>
                    <Link to='/jobAsPeed' id='m2' className={`m ${onMenu === 'm2' ? 'on' : ''}`} onClick={changeOnMenu}>취업궁물</Link> 
                    <Link to='/community' id='m3' className={`m ${onMenu === 'm3' ? 'on' : ''}`} onClick={changeOnMenu}>자유게시판</Link>
                </div>
            </div>
        </div>
    )
}
export default Header