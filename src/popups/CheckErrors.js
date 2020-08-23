import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import styles from './Popup.module.scss';

const CheckErrors = ({ id, message, goTo }) => {
  const closePopup = (id) => {
    $(`#checkErrors${id}`).css('display', 'none');
    $(goTo).focus().select();
    $('html, body').animate(
      {
        scrollTop: $(goTo).offset().top,
      },
      500
    );
  };

  return (
    <div id={`checkErrors${id}`} className={styles.overlay} style={{}}>
      <div className={styles.whiteSpace}>
        <h2>Check Errors</h2>
        {message}

        <Button variant="secondary" onClick={() => closePopup(id)}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default CheckErrors;
