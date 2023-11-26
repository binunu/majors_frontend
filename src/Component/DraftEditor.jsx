import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';  
import './Component.css'

const DraftEditor = () => {
  // 에디터 상태 설정
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty() // 빈 상태로 초기화
  );

  // 에디터 상태 업데이트 함수
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };  
  
  return ( 
    <div id='editor'>

    <Editor
              wrapperClassName="editor"
              editorClassName="editor"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'remove', 'history'],
                inline: { options: ['bold', 'italic', 'underline', 'strikethrough'], },
                blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: false },
              }}  
              localization={{
                locale: 'ko',
              }}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
     /> 
                </div>
  );
};

export default DraftEditor;
