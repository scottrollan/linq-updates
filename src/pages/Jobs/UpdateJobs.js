import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import RichTextEditor from '../../components/RichTextEditor';
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import styles from './Jobs.module.scss';

export default function UpdateJobs({
  setShowEditPage,
  selectedJob,
  setSelectedJob,
}) {
  const desc = selectedJob.jobDescription;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const contentState = editorState.getCurrentContent();

  const handleTitleChange = (e) => {
    setSelectedJob({ ...selectedJob, jobTitle: e.target.value });
  };
  const seeResult = () => {
    const result = stateToHTML(contentState);
    // console.log(`<h4>${jobTitle}</h4>${result}`);
    // console.log(selectedJob);
    console.log(convertFromHTML(selectedJob.jobDescription));
  };

  return (
    <div className={styles.jobs}>
      <div className={styles.editor}>
        <Form.Control
          type="input"
          id="jobTitle"
          style={{ textAlign: 'center', fontSize: '24px', fontWeight: '700' }}
          placeholder="Enter Job Title Here"
          value={selectedJob.jobTitle}
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
