import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Main.css';
import SearchIcon from '@mui/icons-material/Search';
import { useLoginContext } from '../Utill/LogInContext';
import axiosURL from '../Utill/AxiosURL';

const Header = () => {
    const [onMenu, setOnMenu] = useState('');
    const [word, setWord] = useState('');
    const navigate = useNavigate();
    const { isLogIn } = useLoginContext();

    //키를눌렀을때 enter이면 서버로 전송
    const KeyDownSearch = (e) => {
        if (e.key === 'Enter') {
            Search()
        }
    }
    //서버로 전송 후 리다이렉션
    const Search = () => {
        if (word.trim !== '') {
            //서버전송 로직 추가
            /*

            */

            navigate(`/searchResult/${encodeURIComponent(word)}`);
        }
    }

    const changeMenu = (e) => {
        const menu = e.target.id
        setOnMenu(menu)
        if (isLogIn) {
            const token = localStorage.getItem("accessToken")
            axiosURL.get('/member/info/simple', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => {
                navigateToBoard(menu,res.data.middleMajor)
            }).catch(err => console.log(err))
        } else {
            navigateToBoard(menu,'entire')
        }  
    }
    const navigateToBoard=(menu,pMajor)=>{
        switch (menu) {
            case 'm1':
                navigate(`/studyAsList/${pMajor}/1`)
                break;
            case 'm2':
                navigate(`/jobAsList/${pMajor}/1`)
                break;
            case 'm3':
                navigate(`/community/${pMajor}/1`)
                break;
        }  
    }

    return (
        <div id='header'>
            <div className='header-wrap'>
                <div className='menu1'>
                    <Link to='/' className='logo' onClick={() => { setOnMenu('') }}>
                        <img src='/image/logo.png' alt='로고 및 홈버튼'></img>
                    </Link>
                    <div className='seach'>
                        <input className='seach-text' onChange={(e) => { setWord(e.target.value) }} onKeyDown={KeyDownSearch} placeholder='검색어를 입력하세요'></input>
                        <span className='seach-icon' onClick={Search}><SearchIcon /></span>
                    </div>
                </div>
                <ul className='menu2'>
                    <li id='m1' className={`m ${onMenu === 'm1' ? 'on' : ''}`} onClick={changeMenu}>공부궁물</li>
                    <li id='m2' className={`m ${onMenu === 'm2' ? 'on' : ''}`} onClick={changeMenu}>진로궁물</li>
                    <li id='m3' className={`m ${onMenu === 'm3' ? 'on' : ''}`} onClick={changeMenu}>자유게시판</li>
                </ul>
            </div>
        </div>
    )
}
export default Header