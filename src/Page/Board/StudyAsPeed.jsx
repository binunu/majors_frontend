import React from 'react'
import MajorSelect from '../../Component/MajorSelect'
import { useState } from 'react'
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeedIcon from '@mui/icons-material/DashboardOutlined';
import { Link } from 'react-router-dom';
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const StudyAsPeed = () => {
  const [dmSubject,setDmSubject] = useState('국어교육')
  return (
    <div id='study-as-peed'className='main-board'>
      <MajorSelect dmSubject ={dmSubject} setDmSubject={setDmSubject}/>
      <div className='mode'>
        <div>
      <PeedIcon className='icon cur'/>
      <Link to='/studyAsList'><ListIcon className='icon'/></Link> 
        </div>
      </div>
      
    </div> 
  ) 
}

export default StudyAsPeed 