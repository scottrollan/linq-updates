import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import RichTextEditor from '../../components/RichTextEditor';
import styles from './Jobs.module.scss';
import { EditorState, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export default function Jobs() {
  const [jobTitle, setJobTitle] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const contentState = editorState.getCurrentContent();

  const handleTitleChange = (e) => {
    setJobTitle(e.target.value);
  };
  const seeResult = () => {
    const result = stateToHTML(contentState);
    console.log(`<h4>${jobTitle}</h4>${result}`);
    // console.log(contentState);
    // console.log(result);
  };
  return (
    <div className={styles.jobs}>
      <div className={styles.editor}>
        <Form.Control
          type="input"
          id="jobTitle"
          style={{ textAlign: 'center', fontSize: '24px', fontWeight: '700' }}
          placeholder="Enter Job Title Here"
          value={jobTitle}
          onChange={(e) => handleTitleChange(e)}
        ></Form.Control>
        <RichTextEditor
          editorState={editorState}
          setEditorState={setEditorState}
          contentState={contentState}
        />
      </div>
      <Button onClick={() => seeResult()}>Log Editor State to Console</Button>
    </div>
  );
}
