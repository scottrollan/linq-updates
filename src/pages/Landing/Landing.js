import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.scss';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <h4>Edit, Create New or Delete...</h4>
      <div className={styles.buttonDiv}>
        <Link to="/UpdateEvents" className={styles.navButton}>
          Calendar Events
        </Link>
        <Link to="/UpdateBoard" className={styles.navButton}>
          Board Members
        </Link>
        <Link to="/UpdateServices" className={styles.navButton}>
          Direct Services
        </Link>
      </div>
    </div>
  );
};

export default Landing;
