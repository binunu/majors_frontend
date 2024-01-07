import React, { useEffect, useState } from 'react'
import axiosURL from '../Utill/AxiosURL';
import './Component.css'

// const ChangeMajorModal = ({setSmallMajorObject,largeMajor,middleMajor,smallMajor}) => {
const ChangeMajorModal = () => { 
  const [middleMajor, setMiddleMajor] = useState('')
  const [largeMajor, setLargeMajor] = useState('')
  const [smallMajor, setSmallMajor] = useState('') 

  const [major, setMajor] = useState()

  const [largeList, setLargeList] = useState([])
  const [middleList, setMiddleList] = useState([])
  const [smallList, setSmallList] = useState([])
  const [showMiddle, setShowMiddle] = useState(false)
  const [showSmall, setShowSmall] = useState(false)

  const [onCustomMajor, setOnCustomMajor] = useState(false)

  useEffect(() => {
    axiosURL.get('/contents/major-list/large')
      .then(res => {
        setLargeList(res.data);
      })
      .catch(error => {
        console.error(error);
      })
    const params = new URLSearchParams(window.location.search)
    setMajor(params.get('major')) 
  }, []) 

  const changeLargeMajor = (e) => {
    setLargeMajor(e.target.value)
    setOnCustomMajor(false)
    setShowMiddle(false)
    setShowSmall(false)
    setSmallMajor('')
    if (e.target.value === 'base') {
      setShowMiddle(false)
    } else {
      setShowMiddle(true)
      const large = e.target.value;
      axiosURL.get(`/contents/major-list/middle`, {
        params: { large }
      })
        .then(res => {
          setMiddleList(res.data);
        })
        .catch(error => {
          console.error(error);
        })
    }
  }
  const changeMiddleMajor = (e) => {
    setOnCustomMajor(false)
    setMiddleMajor(e.target.value)
    setSmallMajor('')
    if (e.target.value === 'base') {
      setShowSmall(false)
    } else {
      setShowSmall(true)
      const middle = e.target.value;
      axiosURL.get(`/contents/major-list/small`, {
        params: { middle }
      })
        .then(res => {
          setSmallList(res.data);
        })
        .catch(error => {
          console.error(error);
        })

    }
  }
  const changeSmallMajor = (e) => {
    if (e.target.value === '직접입력') {
      setOnCustomMajor(true)
      setSmallMajor(null)
    } else {
      setSmallMajor(e.target.value)
      setOnCustomMajor(false)
    }
  }

  const submitMajor=()=>{
    window.setMajorObject(largeMajor, middleMajor, smallMajor) 
    window.close()
  }

  return (
    <div id='change-major-modal' >
      <div className='container'>
        <h1 className='h1'>변경할 전공을 선택하세요</h1>
        <select className='input' onChange={changeLargeMajor}>
          <option value='base'>대분류 선택</option>
          {
            largeList.map((item, index) => (
              <option value={item.large} key={index}>{item.large}</option>
            ))
          }
        </select>
        {
          showMiddle &&
          <select className='input' onChange={changeMiddleMajor}>
            <option value='base'>중분류 선택</option>
            {
              middleList.map((item, index) => (
                <option value={item.middle} key={index}>{item.middle}</option>
              ))
            }
          </select>
        }
        {
          showSmall &&
          <select className='input' onChange={changeSmallMajor}>
            <option value='base'>소분류 선택</option>
            {
              smallList.map((item, index) => (
                <option value={item.small} key={index}>{item.small}</option>
              ))
            }
            <option value='직접입력'>직접입력</option>
          </select>
        }
        {
          onCustomMajor &&
          <input className='input' placeholder='전공을 입력해주세요' onChange={(e) => { setSmallMajor(e.target.value) }}></input>
        }
        {
          smallMajor && smallMajor !== 'base' && smallMajor!==major?
        <button className='submit-btn on' onClick={submitMajor}>적용</button>
        :
        <button className='submit-btn'>적용</button>
        }
      </div>
    </div>
  )
}

export default ChangeMajorModal