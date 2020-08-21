import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from '../pages/Events/Events.module.scss';

const LinkSection = ({
  id,
  link1,
  link2,
  link1Description,
  link2Description,
}) => {
  const [thisLink1, setThisLink1] = useState(link1);
  const [thisLink2, setThisLink2] = useState(link2);
  const [thisLink1Description, setThisLink1Description] = useState(
    link1Description
  );
  const [thisLink2Description, setThisLink2Description] = useState(
    link2Description
  );

  return (
    <div>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>First URL (if any)</Form.Label>
          <p>(ex: http://google.com )</p>
          <Form.Control
            type="url"
            onChange={(e) => setThisLink1(e.target.value)}
            id={`link1${id}`}
            value={thisLink1}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Second URL (if any)</Form.Label>
          <p>(ex: http://yahoo.com )</p>
          <Form.Control
            type="text"
            onChange={(e) => setThisLink2(e.target.value)}
            id={`link2${id}`}
            value={thisLink2}
          ></Form.Control>
        </Form.Group>
      </div>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>First URL Description</Form.Label>
          <Form.Control
            type="url"
            onChange={(e) => setThisLink1Description(e.target.value)}
            id={`link1Description${id}`}
            value={thisLink1Description}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Second URL description</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setThisLink2Description(e.target.value)}
            id={`link2Description${id}`}
            value={thisLink2Description}
          ></Form.Control>
        </Form.Group>
      </div>
    </div>
  );
};

export default LinkSection;
