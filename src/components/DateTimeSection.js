import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from '../pages/Events/Events.module.scss';

const DateTimeSection = ({ id, start, end }) => {
  const renderDate = (dateInput) => {
    const d = new Date(dateInput);
    const dNum = d.getDate().toString();
    let date;
    if (dNum.length === 1) {
      date = `0${dNum.toString()}`;
    } else {
      date = dNum.toString();
    }
    const mNum = (d.getMonth() + 1).toString();
    let month;
    if (mNum.length === 1) {
      month = `0${mNum.toString()}`;
    } else {
      month = mNum.toString();
    }
    const year = d.getFullYear().toString();
    const dateStr = `${year}-${month}-${date}`;
    return dateStr;
  };

  const renderTime = (input) => {
    const t = new Date(input);
    let h;
    let m;
    const hNum = t.getHours().toString();

    if (hNum.length === 1) {
      h = `0${hNum}`;
    } else {
      h = hNum;
    }
    const mNum = t.getMinutes().toString();
    if (mNum.length === 1) {
      m = `0${mNum}`;
    } else {
      m = mNum;
    }
    const timeStr = `${h}:${m}`;
    return timeStr;
  };

  const [thisStartDate, setThisStartDate] = useState(renderDate(start));
  const [thisStartTime, setThisStartTime] = useState(renderTime(start));
  const [thisEndDate, setThisEndDate] = useState(renderDate(end));
  const [thisEndTime, setThisEndTime] = useState(renderTime(end));

  return (
    <div>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setThisStartDate(e.target.value)}
            id={`startDate${id}`}
            value={thisStartDate}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            onChange={(e) => setThisStartTime(e.target.value)}
            id={`startTime${id}`}
            value={thisStartTime}
          ></Form.Control>
        </Form.Group>
      </div>
      <div className={styles.oneLine}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setThisEndDate(e.target.value)}
            id={`endDate${id}`}
            value={thisEndDate}
          ></Form.Control>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            onChange={(e) => setThisEndTime(e.target.value)}
            id={`endTime${id}`}
            value={thisEndTime}
          ></Form.Control>
        </Form.Group>
      </div>
    </div>
  );
};

export default DateTimeSection;
