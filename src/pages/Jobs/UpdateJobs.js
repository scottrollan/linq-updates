import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import RichTextEditor from '../../components/RichTextEditor';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Client } from '../../api/client';
import $ from 'jquery';
import styles from './Jobs.module.scss';

export default function UpdateJobs({ job, activeJobs, setEditing }) {
  const [thisJob, setThisJob] = useState({ ...job });
  let initialDescr = job.jobDescription;
  const blocksFromHTML = convertFromHTML(initialDescr);
  const descrState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(descrState)
  );
  const contentState = editorState.getCurrentContent();

  const handleTitleChange = (e) => {
    setThisJob({ ...thisJob, jobTitle: e.target.value });
  };

  const setDisplayOrder = (n) => {
    setThisJob({ ...thisJob, displayOrder: n });
  };

  const toggleActive = () => {
    setThisJob({ ...thisJob, active: !thisJob.active });
  };

  const cancelEdit = () => {
    setEditing(false);
    $('.jobDiv').show();
  };

  const submitEdit = async (event) => {
    event.preventDefault();
    const newForm = {
      _id: thisJob.id,
      _type: 'job',
      jobTitle: thisJob.jobTitle,
      jobDescription: stateToHTML(contentState),
      displayOrder: parseInt(thisJob.displayOrder),
      active: thisJob.active,
    };
    // const rawState = convertToRaw(contentState);
    // console.log(rawState);
    console.log(newForm);
    let response = await Client.createOrReplace(newForm).catch((err) => {
      alert('Oh no, the update failed: ', err.message);
      return;
    });
    const updatedAt = Date.parse(response._updatedAt);
    console.log(`The record was updated at ${updatedAt}`);
  };

  return (
    <div className={styles.jobs}>
      <div className={styles.editor}>
        <Form onSubmit={(e) => submitEdit(e)}>
          <Form.Control
            type="input"
            id="jobTitle"
            style={{ textAlign: 'center', fontSize: '24px', fontWeight: '700' }}
            placeholder="Enter Job Title Here"
            value={thisJob.jobTitle}
            onChange={(e) => handleTitleChange(e)}
          ></Form.Control>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              verticalAlign: 'middle',
            }}
          >
            <Form.Check
              type="switch"
              id={`${thisJob.id}switch`}
              checked={thisJob.active}
              label={
                thisJob.active ? 'This job is Active' : 'This job is inactive!'
              }
              style={{
                color: thisJob.active ? 'green' : 'red',
                fontSize: 'smaller',
              }}
              onChange={() => toggleActive()}
            />
          </div>
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
            contentState={contentState}
          />

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 'smaller',
            }}
          >
            <Form.Control
              type="number"
              min={1}
              max={activeJobs + 1}
              value={thisJob.displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              style={{ width: 'auto' }}
            />
            <Form.Text>
              Order to appear on page (there are currently {activeJobs} active
              jobs)
            </Form.Text>
          </div>
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              style={{ margin: '1em' }}
              variant="secondary"
              onClick={() => cancelEdit()}
            >
              Cancel Edit
            </Button>
            <Button type="submit" style={{ margin: '1em' }} variant="success">
              Save Edit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
