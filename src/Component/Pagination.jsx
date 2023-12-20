import React, { useState, useEffect } from 'react'

const Pagination = ({ pageInfo, changePage }) => {
    const [pageNumbers, setPageNumbers] = useState([])
    useEffect(() => {
        //버튼만들기
        const arr = []
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            arr.push(i)
        }
        console.log(pageInfo)
        setPageNumbers(arr);
    }, [pageInfo])
    const callChangePage = (page) => {
        console.log("요청페이지:",page)
        changePage(page);
    }
    return (
        <div id='pagination'> 
            {pageInfo.startPage > 1 &&
                <>
                    <button className='function f1' onClick={() => callChangePage(1)}>&lt;&lt;</button>
                    <button className='function f2' onClick={() => callChangePage(pageInfo.startPage - 1)}>&lt;</button>
                </>
            }
            {
                pageNumbers.map((item, index) => (
                    item === pageInfo.curPage ?
                        <button className='curpage' key={index}>{item}</button>
                        :
                        <button className='btn' key={index} onClick={() => callChangePage(item)} value={item}>{item}</button>
                ))
            }
            {
                pageInfo.endPage < pageInfo.allPage &&
                <>
                    <button className='function f2' onClick={() => callChangePage(pageInfo.endPage+1)} >&gt;</button>
                    <button className='function f1' onClick={() => callChangePage(pageInfo.allPage)} >&gt;&gt;</button>
                </>
            }
        </div>
        )
}

export default Pagination