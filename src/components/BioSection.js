import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from '../pages/Board/Board.module.scss';

const BioSection = ({
  name,
  titleEng,
  titleEsp,
  bioEng,
  bioEsp,
  displayOrder,
  memberNum,
}) => {
  const toPlainText = (blocks = []) => {
    return blocks
      .map((block) => {
        if (block._type !== 'block' || !block.children) {
          return '';
        }

        return block.children.map((child) => child.text).join('');
      })
      .join('\n\n');
  };

  const [thisName, setThisName] = useState(name);
  const [thisTitleEng, setThisTitleEng] = useState(titleEng);
  const [thisTitleEsp, setThisTitleEsp] = useState(titleEsp);
  const [thisBioEng, setThisBioEng] = useState(toPlainText(bioEng));
  const [thisBioEsp, setThisBioEsp] = useState(toPlainText(bioEsp));
  const [thisDisplayOrder, setThisDisplayOrder] = useState(displayOrder);

  return (
    <div className={styles.bio}>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Name/nombre</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setThisName(e.target.value)}
            value={thisName}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Order to appear on page</Form.Label>
          <p>{`(there are ${memberNum} total members)`}</p>
          <Form.Control
            type="number"
            onChange={(e) => setThisDisplayOrder(e.target.value)}
            value={thisDisplayOrder}
          ></Form.Control>
        </Form.Group>
      </div>
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
            onChange={(e) => setThisTitleEng(e.target.value)}
            value={thisTitleEng}
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
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows="10"
            onChange={(e) => setThisBioEng(e.target.value)}
            value={thisBioEng}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            onChange={(e) => setThisBioEsp(e.target.value)}
            value={thisBioEsp}
          ></Form.Control>
        </Form.Group>
      </div>
    </div>
  );
};

export default BioSection;
