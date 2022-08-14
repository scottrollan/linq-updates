import React, { useState, useEffect } from 'react';
import UpdateJobs from './UpdateJobs';
import { fetchJobsData } from '../../fuctions/fetchData';
import { Button } from 'react-bootstrap';
import { createRandomString } from '../../fuctions/createRandomString';
import $ from 'jquery';
import styles from './Jobs.module.scss';

export default function CreateEditJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState(0);
  const [editing, setEditing] = useState(false);
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
    displayOrder: activeJobs + 1,
  };

  const openJob = (id) => {
    setEditing(true);
    $('.jobDiv').hide();
    allJobs.forEach((job) => {
      if (id === job.id) {
        $(`#${id}`).show();
      }
    });
    $(`#${id}`).show(); //repeated to include the newJob
  };

  const createNewJob = () => {
    // setSelectedJob(newJob);
    openJob(newJob.id);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsArray = await fetchJobsData();
      setAllJobs([...jobsArray]);
      const actives = jobsArray.filter((job) => job.active);
      setActiveJobs(actives.length);
    };
    fetchJobs();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <h5>Latino LinQ Jobs</h5>
      <div
        // style={{ display: editing ? 'none' : 'initial', margin: '2em 0' }}
        id={newJob.id}
        className="jobDiv"
      >
        <Button
          style={{ maxWidth: '400px' }}
          variant="success"
          onClick={() => createNewJob()}
        >
          Create New Job Posting
        </Button>
        <div style={{ display: editing ? 'inline' : 'none' }}>
          <UpdateJobs
            job={newJob}
            activeJobs={activeJobs}
            setEditing={setEditing}
          />
        </div>
        <p style={{ fontSize: 'smaller', marginTop: '2em' }}>
          Or click on one of the following to edit
        </p>
      </div>
      <div className={styles.jobList}>
        {allJobs.map((j, idx) => {
          return (
            <div key={`${j._id}${idx}`} id={j.id} className="jobDiv">
              <Button
                onClick={() => openJob(j.id)}
                variant={j.active ? 'primary' : 'secondary'}
              >
                {`${j.jobTitle}${j.active ? '' : ' - inactive'}`}
              </Button>
              <div style={{ display: editing ? 'inline' : 'none' }}>
                <UpdateJobs
                  job={j}
                  activeJobs={activeJobs}
                  setEditing={setEditing}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
