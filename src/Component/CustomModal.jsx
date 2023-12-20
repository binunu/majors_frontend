import React, { useState, useEffect } from 'react'


const CustomModal = ({ type, setOnModal, removeSubmit }) => {
    const [modalContent, setModalContent] = useState({})
    const yesBtn=()=>{
        removeSubmit()
        setOnModal(false)
    }
    useEffect(() => {
        console.log(type)
        if (type === 'save') {//저장(개인정보수정)
            setModalContent({ question: '저장하시겠습니까?', warnning: '' })
        } else if (type === 'leave') { //회원탈퇴
            setModalContent({ question: '정말 회원을 탈퇴하시겠습니까?', warnning: '※ 추후 동일한 이메일로 재가입이 불가능합니다.' })
        } else if (type === 'comment') {  //댓글삭제
            setModalContent({ question: '댓글을 삭제하시겠습니까?', warnning: '※ 이 작업은 되돌릴 수 없습니다.' })
        } else if (type === 'reply') {  //댓글삭제
            setModalContent({ question: '답글을 삭제하시겠습니까?', warnning: '※ 이 작업은 되돌릴 수 없습니다.' })
        } else if (type === 'write') {//글삭제
            setModalContent({ question: '글을 삭제하시겠습니까?', warnning: '※ 이 작업은 되돌릴 수 없습니다.' })
        } else if (type === 'good') { //좋아요취소
            setModalContent({ question: '좋아요를 취소하시겠습니까?', warnning: '' })
        } else if (type === 'bad') { //싫어요취소
            setModalContent({ question: '싫어요를 취소하시겠습니까?', warnning: '' })
        } else if (type === 'scrap') { //스크랩제거
            setModalContent({ question: '스크랩을 제거하시겠습니까?', warnning: '' })
        } else if (type === 'create') { //글쓰기
            setModalContent({ question: '새 글을 등록하시겠습니까?', warnning: '' })
        }

    }, [type])
    return (
        <div id='custom-modal'>
            <div className='modal-background'>
                <div className='modal-box'>
                    <div className='q-box'>
                        <p className='question'>{modalContent.question}</p>
                        {
                            modalContent.warnning !== '' &&
                            <p className='warnning'>{modalContent.warnning}</p>
                        }
                    </div>
                    <div className='btn-box'>
                        <button className='btn' onClick={() => { setOnModal(false) }}>취소</button>
                        <button className='btn yes' onClick={yesBtn}>예</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CustomModal