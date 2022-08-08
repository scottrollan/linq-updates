import React, { useState, useEffect } from 'react';
import { UpdateJob } from './UpdateJobs';
import { fetchJobsData } from '../../fuctions/fetchData';
import { Button } from 'react-bootstrap';
import { createRandomString } from '../../fuctions/createRandomString';
import { Link } from 'react-router-dom';
import styles from './Jobs.module.scss';

export default function CreateEditJobs() {
  const [allJobs, setAllJobs] = useState([]);

  const openJob = (id) => {};

  const createNewJob = () => {
    const newId = `${createRandomString(8)}-${createRandomString(
      4
    )}-${createRandomString(4)}-${createRandomString(4)}-${createRandomString(
      12
    )}`;
    const newJob = { _id: newId };
    openJob(newJob._id);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsArray = await fetchJobsData();
      setAllJobs(allJobs.concat(jobsArray));
    };
    fetchJobs();
  }, []);

  return (
    <div style={{ margin: '2em 0' }}>
      <Button onClick={() => createNewJob()}>Create New Job Posting</Button>
      <p style={{ fontSize: 'smaller', marginTop: '2em' }}>
        Or click on one of the following to edit
      </p>
      <div className={styles.jobList}>
        {allJobs.map((j) => {
          return (
            <Button
              key={j._id}
              onClick={() => openJob(`${j._id}`)}
              variant={j.active ? 'primary' : 'secondary'}
            >
              {`${j.jobTitle}${j.active ? '' : ' - inactive'}`}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
