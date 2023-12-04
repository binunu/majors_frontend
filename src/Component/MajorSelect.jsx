import { List } from '@mui/material'
import React,{useEffect,useState} from 'react' 
import axios from 'axios'

const MajorSelect = ({ dmSubject, setDmSubject }) => {
    const [showList, setShowList] = useState(false)
    const [majors, setMajors] = useState([])
    const [copyMajors,setCopyMajors] = useState([])   
    const axiosURL = axios.create({baseURL:'http://localhost:8080'})
    const dmChangeSub = (e) => {
        setDmSubject(e.target.dataset.value)
        setShowList(false)
    }
    useEffect(()=>{ 
        //중분류가져오기
        axiosURL.get('/contents/major-list/middle')
        .then(res=>{
            console.log(res.data)
            setMajors(res.data);
            setCopyMajors(res.data);
        })
        .catch(error=>{
            console.error(error);
        })
    },[])
    const seachMajor = (e) => {
        const topic = e.target.value
        if (topic === '') {
            setMajors(copyMajors)
        } else { 
            const newList = copyMajors.filter((item) => item.major.includes(topic)); 
            setMajors(newList)
        }
    }

    return (
        <div id='major-select'>
            <div className='select cen' onClick={() => { setShowList(true) }}>{dmSubject}</div>
            {showList &&
                <>
                    <div className='background' onClick={() => { setShowList(false) }}></div>
                    <div className='option-box'>
                        <div className='input-div cen'><input type='text' className='input' placeholder='전공명을 검색하세요' onChange={seachMajor} /></div>
                        <div className='op-box'>
                            {majors.map((item, index) => (
                                <div className='option cen' key={index} data-value={item.middle} onClick={dmChangeSub}>{item.middle}</div>
                            ))}
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default MajorSelect