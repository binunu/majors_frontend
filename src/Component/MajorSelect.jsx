import { List } from '@mui/material'
import React,{useEffect,useState} from 'react' 
import axiosURL from '../Utill/AxiosURL'

const MajorSelect = ({type,cateInit, changeMajor }) => {
    const [showList, setShowList] = useState(false)
    const [category, setCategory] = useState(cateInit)
    const [majors, setMajors] = useState([])
    const [copyMajors,setCopyMajors] = useState([])    
    useEffect(()=>{ 
        //중분류가져오기
        axiosURL.get('/contents/major-list/middle')
        .then(res=>{ 
            setMajors(res.data); 
            setCopyMajors(res.data);
        })
        .catch(error=>{
            console.error(error);
        })
    },[])
    const majorHandler = (e) => {
        changeMajor(e.target.dataset.value)
        setCategory(e.target.dataset.value)
        setShowList(false)
        setMajors(copyMajors); 
    }
    const seachMajor = (e) => {
        const topic = e.target.value
        if (topic === '') {
            setMajors(copyMajors)
        } else { 
            const newList = copyMajors.filter((item) => item.middle.includes(topic)); 
            setMajors(newList)
        }
    }

    return (
        <div id='major-select'>
            <div className='select cen' onClick={() => { setShowList(true) }}>{type} &gt; {category==='entire'?'전체보기':category}</div>
            {showList &&
                <>
                    <div className='background' onClick={() => { setShowList(false); setMajors(copyMajors);}}></div>
                    <div className='option-box'>
                        <div className='input-div cen'><input type='text' className='input' placeholder='전공명을 검색하세요' onChange={seachMajor} /></div>
                        <div className='op-box'>
                        <div className='option cen'   data-value={"entire"} onClick={majorHandler}>전체보기</div>
                            {majors.map((item, index) => (
                                <div className='option cen' key={index} data-value={item.middle} onClick={majorHandler}>{item.middle}</div>
                            ))}
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default MajorSelect