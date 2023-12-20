import React, { useState, useEffect } from 'react'
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeedIcon from '@mui/icons-material/DashboardOutlined';
import { Link, useParams,useNavigate } from 'react-router-dom';
import MajorSelect from '../../Component/MajorSelect'
import GoodIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ReplyIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import axiosURL from '../../Utill/AxiosURL';
import { useLoginContext } from '../../Utill/LogInContext'; 
import Pagination from '../../Component/Pagination';

const JobAsList = () => {
    const navigate = useNavigate()
  const {major,pageNum} = useParams();
  const [articles, setArticles] = useState([])
  const [render, setRender] = useState(false) 
  const [pageInfo,setPageInfo] = useState({});  

  useEffect(() => {   
    getArticles(major,pageNum) 
  }, [major,pageNum])

  const getArticles=(category,page)=>{ 
    // setCateInit(category)
    console.log(category,page)
    axiosURL.get(`/board/article/list/job/${category}/${page}`)
      .then(res => {  
        // console.log(res.data.list)
        setArticles(res.data.list)
        setPageInfo(res.data.pageInfo)
        setRender(true) 
      })
      .catch(err => console.log(err))
  } 
  const changePage=(page)=>{
    navigate(`/jobAsList/${major}/${page}`)
  }
  const changeMajor=(pmajor)=>{
    navigate(`/jobAsList/${pmajor}/1`)
  }
  return (
    <div id='study-as-list' className='main-board'>
      {render &&
        <> 
          <MajorSelect type={"취업궁물"} cateInit={major} changeMajor={changeMajor} />
          <div className='mode'>
            <div>
              <Link to={`/boardAsPeed/job/${major}/1`}><PeedIcon className='icon' /></Link>
              <ListIcon className='icon cur' />
            </div>
          </div>
          <div className='article-list'>
            {articles.length>0?
              articles.map((item, index) => (
                <Link to={`/articleDetail/${item.id}`} className='article' key={index}>
                  <div className='a-title'><b>[{item.subject?item.subject:item.middleMajor}]</b> {item.title}</div>
                  <div className='a-tail'>
                    <GoodIcon className='icon' />&nbsp;{item.replyCnt}&nbsp;&nbsp;
                    <ReplyIcon className='icon' />&nbsp;{item.goodCnt}
                  </div>
                </Link>
              ))
              :
              <p className='empty-p'>등록된 게시글이 없습니다!!</p>
            }


          </div>
          <div className='pagenation'>
           <Pagination pageInfo={pageInfo} changePage={changePage}/>
          </div>
        </>
      }
    </div>
  )
}

export default JobAsList