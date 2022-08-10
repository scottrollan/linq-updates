import React, { useState, useEffect } from 'react';
import UpdateJobs from './UpdateJobs';
import { fetchJobsData } from '../../fuctions/fetchData';
import { Button } from 'react-bootstrap';
import { createRandomString } from '../../fuctions/createRandomString';
import styles from './Jobs.module.scss';

export default function CreateEditJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({
    id: '',
    jobTitle: '',
    jobDescription: '',
    active: true,
    displayOrder: 99,
  });
  const [showEditPage, setShowEditPage] = useState(false);

  const openJob = (jobObj) => {
    setSelectedJob(jobObj);
    setShowEditPage(true);
  };

  const createNewJob = () => {
    const newId = `${createRandomString(8)}-${createRandomString(
      4
    )}-${createRandomString(4)}-${createRandomString(4)}-${createRandomString(
      12
    )}`;
    const newJob = {
      id: newId,
      jobTitle: '',
      jobDescription: '',
      active: true,
      displayOrder: 99,
    };
    setSelectedJob(newJob);
    openJob(newJob);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsArray = await fetchJobsData();
      setAllJobs(allJobs.concat(jobsArray));
    };
    fetchJobs();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <h5>Latino LinQ Jobs</h5>
      <div
        style={{ display: showEditPage ? 'none' : 'initial', margin: '2em 0' }}
      >
        <Button onClick={() => createNewJob()}>Create New Job Posting</Button>
        <p style={{ fontSize: 'smaller', marginTop: '2em' }}>
          Or click on one of the following to edit
        </p>
        <div className={styles.jobList}>
          {allJobs.map((j, idx) => {
            const thisJob = {
              id: j.id,
              jobTitle: j.jobTitle,
              jobDescription: j.jobDescription,
              active: j.active,
              displayOrder: j.displayOrder,
            };
            return (
              <Button
                key={`${j._id}${idx}`}
                onClick={() => openJob(thisJob)}
                variant={j.active ? 'primary' : 'secondary'}
              >
                {`${j.jobTitle}${j.active ? '' : ' - inactive'}`}
              </Button>
            );
          })}
        </div>
      </div>
      <div style={{ display: showEditPage ? 'inherit' : 'none' }}>
        <UpdateJobs
          setShowEditPage={setShowEditPage}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
        />
      </div>
    </div>
  );
}
