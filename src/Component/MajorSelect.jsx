import { List } from '@mui/material'
import React,{useEffect,useState} from 'react' 
import axios from 'axios'

const MajorSelect = ({ dmSubject, setDmSubject }) => {
    const [showList, setShowList] = useState(false)
    const [majors, setMajors] = useState([{ major: '경영학과' }, { major: '유아교육학과' }, { major: '토목공학과' }, { major: '컴퓨터공학과' }, { major: '중어중문학과' }, { major: '법학과' }, { major: '무용과' }, { major: '패션디자인' }, { major: '물리학과' }, { major: '시각디자인' }])
    const [copyMajors] = useState(majors) 
    const axiosURL = axios.create({baseURL:'http://localhost:8080/'})
    const dmChangeSub = (e) => {
        setDmSubject(e.target.dataset.value)
        setShowList(false)
    }
    useEffect(()=>{ 
        axios.get('http://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=af48551a29264363fa11979ef3e7ccec&svcType=api&svcCode=MAJOR&contentType=json&gubun=univ_list&univSe=univ')
        .then(res=>{
            console.log(res.data.dataSearch.content)})
        .catch(error=>{
            console.error(error);
        })
    })
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
            <div className='select cen' onClick={() => { setShowList(true) }}>{`대분류 > 중분류 > ${dmSubject}`}</div>
            {showList &&
                <>
                    <div className='background' onClick={() => { setShowList(false) }}></div>
                    <div className='option-box'>
                        <div className='input-div cen'><input type='text' className='input' placeholder='전공명을 검색하세요' onChange={seachMajor} /></div>
                        <div className='op-box'>
                            {majors.map((item, index) => (
                                <div className='option cen' key={index} data-value={item.major} onClick={dmChangeSub}>{item.major}</div>
                            ))}
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default MajorSelect