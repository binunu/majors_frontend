import React from 'react'
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeedIcon from '@mui/icons-material/DashboardOutlined';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import MajorSelect from '../../Component/MajorSelect'

const StudyAsList = () => {
  const [dmSubject, setDmSubject] = useState('국어교육')
  return (
    <div id='study-as-list' className='main-board'>
      <MajorSelect dmSubject={dmSubject} setDmSubject={setDmSubject} />
      <div className='mode'>
        <Link to='/studyAsPeed'><PeedIcon className='icon' /></Link>
        <ListIcon className='icon cur'/> 
      </div>
      리스트
    </div>
  )
}

export default StudyAsList