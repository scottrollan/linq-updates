import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Popup.module.scss';

const Thinking = () => {
  return (
    <div className={styles.overlay} id="thinking">
      <Spinner id="spinner" animation="border" />
    </div>
  );
};

export default Thinking;
