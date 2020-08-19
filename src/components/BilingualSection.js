import React, { useState } from 'react';
import $ from 'jquery';
import { Form } from 'react-bootstrap';
import styles from '../pages/Events/Events.module.scss';

const BilingualSection = ({
  title,
  titleEsp,
  subtitle,
  subtitleEsp,
  description,
  descriptionEsp,
  info,
  infoEsp,
}) => {
  const [thisTitle, setThisTitle] = useState(title);
  const [thisTitleEsp, setThisTitleEsp] = useState(titleEsp);
  const [thisSubtitle, setThisSubtitle] = useState(subtitle);
  const [thisSubtitleEsp, setThisSubtitleEsp] = useState(subtitleEsp);
  const [thisDescription, setThisDescription] = useState(description);
  const [thisDescriptionEsp, setThisDescriptionEsp] = useState(descriptionEsp);
  const [thisInfo, setThisInfo] = useState(info);
  const [thisInfoEsp, setThisInfoEsp] = useState(infoEsp);

  const change = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    console.log('id: ', id, 'value: ', value);
    `${id}`(value);
  };
  return (
    <div className={styles.bilingual}>
      <div className={styles.oneLine}>
        <div className={styles.formGroup}>
          <h3
            style={{
              color: 'var(--linq-green)',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            <u>English</u>
          </h3>
        </div>
        <div className={styles.formGroup}>
          <h3
            style={{
              color: 'var(--linq-green',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            <u>Español</u>
          </h3>
        </div>
      </div>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setThisTitle(e.target.value)}
            value={thisTitle}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setThisTitleEsp(e.target.value)}
            value={thisTitleEsp}
          ></Form.Control>
        </Form.Group>
      </div>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Subitle</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setThisSubtitle(e.target.value)}
            value={thisSubtitle}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Subtítulo</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setThisSubtitleEsp(e.target.value)}
            value={thisSubtitleEsp}
          ></Form.Control>
        </Form.Group>
      </div>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            onChange={(e) => setThisDescription(e.target.value)}
            value={thisDescription}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            onChange={(e) => setThisDescriptionEsp(e.target.value)}
            value={thisDescriptionEsp}
          ></Form.Control>
        </Form.Group>
      </div>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Additional Note</Form.Label>
          <p>(ex: "Register now!")</p>
          <Form.Control
            type="text"
            onChange={(e) => setThisInfo(e.target.value)}
            value={thisInfo}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Información importante</Form.Label>
          <p>(ej: ¡Registrarse ahora!)</p>
          <Form.Control
            type="text"
            onChange={(e) => setThisInfoEsp(e.target.value)}
            value={thisInfoEsp}
          ></Form.Control>
        </Form.Group>
      </div>
    </div>
  );
};

export default BilingualSection;
