import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Popup.module.scss';

const Thinking = ({ id }) => {
  return (
    <div className={styles.overlay} id={id}>
      <Spinner id="spinner" animation="border" />
    </div>
  );
};

export default Thinking;
