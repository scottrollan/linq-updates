import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import RichTextEditor from '../../components/RichTextEditor';
import styles from './Jobs.module.scss';
import { EditorState, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export default function Jobs() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const contentState = editorState.getCurrentContent();

  const seeResult = () => {
    const result = stateToHTML(contentState);
    console.log(editorState);
    console.log(contentState);
    console.log(result);
  };
  return (
    <div className={styles.jobs}>
      <div className={styles.editor}>
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
