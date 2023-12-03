import React,{useEffect, useState} from 'react'
import axios from 'axios'

const ApiTest = () => { 
    const [arr, setArr] = useState([])
    useEffect(()=>{  
        axios.get('http://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=af48551a29264363fa11979ef3e7ccec&svcType=api&svcCode=MAJOR&contentType=json&gubun=univ_list&univSe=univ') 
        // axios.get('http://openapi.work.go.kr/opi/majorInfo/majorSrch.do?authKey=af48551a29264363fa11979ef3e7ccec&returnType=XML&target=MAJORCD&srchType=A') 
        .then(res=>{
            console.log(res.data.dataSearch.content)
            setArr(res.data.dataSearch.content)
        })
        .catch(error=>{
            console.error(error);   
        })
    },[])
  return (
    <div>
        {arr.map(item=>(
            <>
            <div style={{ color: "blue" }}>{item.lClass}</div>
            <div style={{ backgroundColor: "yellow" }}>{item.mClass}</div>
            <div>{item.facilName}</div>
            <br/><br/><br/> 
            </>
        ))}
        </div>
  )
}

export default ApiTest