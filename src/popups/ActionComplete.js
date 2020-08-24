import React from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import styles from './Popup.module.scss';

const ActionComplete = ({ what, action }) => {
  const closeMe = () => {
    $('#success').css('display', 'none');
  };
  return (
    <div className={styles.overlay} id="success">
      <div className={styles.whiteSpace}>
        <h3>
          <i>{what}</i> was successfully {action}!
        </h3>

        <Button variant="secondary" onClick={() => closeMe()}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ActionComplete;
