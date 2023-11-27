import React from 'react'
import MajorSelect from '../../Component/MajorSelect'
import { useState } from 'react'
const JobAsPeed = () => {
  const [dmSubject,setDmSubject] = useState('해운경영')
  return (
    <div><MajorSelect dmSubject={dmSubject} setDmSubject={setDmSubject}/></div>
  )
}

export default JobAsPeed