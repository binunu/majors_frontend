import React from 'react'
import MajorSelect from '../../Component/MajorSelect'
import { useState } from 'react'
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeedIcon from '@mui/icons-material/DashboardOutlined';
import { Link } from 'react-router-dom';
const StudyAsPeed = () => {
  const [dmSubject,setDmSubject] = useState('국어교육')
  return (
    <div id='study-as-peed'className='main-board'>
      <MajorSelect dmSubject ={dmSubject} setDmSubject={setDmSubject}/>
      <div className='mode'>
      <PeedIcon className='icon cur'/>
      <Link to='/studyAsList'><ListIcon className='icon'/></Link> 
      </div>
      피드
    </div>
  )
}

export default StudyAsPeed