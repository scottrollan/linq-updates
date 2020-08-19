import React, { useState } from 'react';
import { Client } from '../api/client';
import $ from 'jquery';
import { Form, Button } from 'react-bootstrap';
import styles from '../pages/Events/Events.module.scss';

const ImageSection = ({
  id,
  initialUrl,
  selectedFile,
  fileSelectHandler,
  fileUploadHandler,
}) => {
  const [photoLink, setPhotoLink] = useState(initialUrl);

  const fileSelect = (e) => {
    const thisFile = e.target.files[0];
    const buttonId = e.target.getAttribute('button');
    fileSelectHandler(thisFile);
    $(`#${buttonId}`).show();
  };

  const fileUpload = async () => {
    let imageRes = await Client.assets.upload('image', selectedFile);
    setPhotoLink(imageRes.url);
    fileUploadHandler(imageRes.url);
  };

  return (
    <div
      className={styles.oneLine}
      style={{ margin: '1rem 0', alignItems: 'center' }}
    >
      <div className={styles.formGroup}>
        <img
          src={photoLink}
          alt=""
          style={{ maxWidth: '100%', borderRadius: '1rem' }}
        />
      </div>
      <Form.Group className={styles.formGroup}>
        <Form.File
          name="file"
          label="Upload New Image"
          onChange={(e) => fileSelect(e)}
          button={`${id}Button`}
          feedbackTooltip
        />
        <Button
          style={{ display: 'none' }}
          id={`${id}Button`}
          onClick={fileUpload}
        >
          Upload Photo
        </Button>
      </Form.Group>
    </div>
  );
};

export default ImageSection;
