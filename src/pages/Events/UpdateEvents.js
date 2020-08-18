import React, { useEffect, useState } from 'react';
// import $ from 'jquery';
import { Client, fetchEvents } from '../../api/client';
import imageUrlBuilder from '@sanity/image-url';
import { Button, Form, Carousel } from 'react-bootstrap';
import styles from './Events.module.scss';

const UpdateEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  // const [photoLink, setPhotoLink] = useState('');

  const builder = imageUrlBuilder(Client);

  const urlFor = async (source) => {
    return builder.image(source);
  };

  const fileSelectHandler = (e) => {
    const thisFile = e.target.files[0];
    setSelectedFile(thisFile);
  };
  const fileUploadHandler = async () => {
    let imageRes = await Client.assets.upload('image', selectedFile);
    // setPhotoLink(imageRes.url);
  };

  const submitChanges = (e) => {
    console.log(e);
  };

  const fetchData = async () => {
    let theseEvents = [];
    let futureEvents = [];
    const losEventos = await fetchEvents;
    losEventos.forEach(async (v) => {
      // const imageObj = v.image;
      // const imageUrl = urlFor(imageObj).url().toString();
      let currentEvent = {
        id: v._id,
        start: v.start,
        end: v.end,
        allDay: v.allDay,
        title: v.title,
        titleEsp: v.titleEsp,
        subtitle: v.subtitle,
        subtitleEsp: v.subtitulo,
        info: v.importantInfo,
        infoEsp: v.informaci0nImportante,
        description: v.description,
        descriptionEsp: v.descriptionEsp,
        link1Description: v.link1Description,
        link1: v.link1,
        link2Description: v.link2Description,
        link2: v.link2,
        image: v.image,
      };
      theseEvents.push(currentEvent);
      const now = new Date(Date.now());
      const today = now.toISOString();
      futureEvents = theseEvents.filter((ev) => ev.start >= today);
    });
    setEvents(events.concat(futureEvents));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.updateEvents}>
      <Carousel interval={null}>
        {events.map((e, index) => {
          return (
            <Carousel.Item key={`${e.title}${index}`}>
              <div className={styles.mainInputArea}>
                <h2>
                  {e.title} / {e.titleEsp}
                </h2>
                <h3>{`event ${index + 1} of ${events.length}`}</h3>
                <Form onSubmit={() => submitChanges(e.id)}>
                  <div className={styles.oneLine}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={new Date(e.start).toLocaleDateString()}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label
                        style={{
                          display: e.allDay ? 'none' : 'inherit',
                        }}
                      >
                        Start Time
                      </Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={new Date(e.start).toLocaleTimeString()}
                        style={{
                          display: e.allDay ? 'none' : 'inherit',
                        }}
                      ></Form.Control>

                      <Form.Label
                        style={{
                          width: '100%',
                          display: e.allDay ? 'inherit' : 'none',
                        }}
                      >
                        All Day Event?
                      </Form.Label>
                      <Form.Check
                        type="checkbox"
                        checked
                        readOnly
                        value={e.allDay}
                        style={{
                          width: '100%',
                          display: e.allDay ? 'inherit' : 'none',
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div
                    className={styles.oneLine}
                    style={{
                      display: e.allDay ? 'none' : 'flex',
                    }}
                  >
                    <Form.Group className={styles.formGroup}>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={
                          e.end ? new Date(e.end).toLocaleDateString() : 'none'
                        }
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label>and Time</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={
                          e.end ? new Date(e.end).toLocaleTimeString() : 'none'
                        }
                      ></Form.Control>{' '}
                    </Form.Group>
                  </div>
                  <div className={styles.bilingual}>
                    <div className={styles.oneLine}>
                      <div className={styles.formGroup}>
                        <h3
                          style={{
                            color: 'var(--linq-green',
                            alignSelf: 'center',
                            textAlign: 'center',
                          }}
                        >
                          <u>English</u>
                        </h3>
                      </div>
                      <div className={styles.formGroup}>
                        <h3
                          style={{
                            color: 'var(--linq-green',
                            alignSelf: 'center',
                            textAlign: 'center',
                          }}
                        >
                          <u>Español</u>
                        </h3>
                      </div>
                    </div>
                    <div className={styles.oneLine}>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={e.title}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={e.titleEsp}
                        ></Form.Control>
                      </Form.Group>
                    </div>
                    <div className={styles.oneLine}>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label>Subitle</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={e.subtitle}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label>Subtítulo</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={e.subtitleEsp}
                        ></Form.Control>
                      </Form.Group>
                    </div>
                    <div className={styles.oneLine}>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          readOnly
                          value={e.description}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          readOnly
                          value={e.descriptionEsp}
                        ></Form.Control>
                      </Form.Group>
                    </div>
                    <div className={styles.oneLine}>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label>Additional Note</Form.Label>
                        <p>(ex: "Register now!")</p>
                        <Form.Control
                          type="text"
                          readOnly
                          value={e.info}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label>Información importante</Form.Label>
                        <p>(ej: ¡Registrarse ahora!)</p>
                        <Form.Control
                          type="text"
                          readOnly
                          value={e.infoEsp}
                        ></Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div
                    className={styles.oneLine}
                    style={{ margin: '1rem 0', alignItems: 'center' }}
                  >
                    <div className={styles.formGroup}>
                      <img
                        src={e.image}
                        alt="no image"
                        style={{ maxWidth: '100%', borderRadius: '1rem' }}
                      />
                    </div>
                    <Form.Group className={styles.formGroup}>
                      <Form.File
                        name="file"
                        label="Upload New Image"
                        onChange={(e) => fileSelectHandler(e)}
                        button={`${e.id}Button`}
                        feedbackTooltip
                      />
                      <Button
                        disabled
                        id={`${e.id}Button`}
                        onClick={() => fileUploadHandler()}
                      >
                        Upload Photo
                      </Button>
                    </Form.Group>
                  </div>
                  <div className={styles.oneLine}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label>First URL (if any)</Form.Label>
                      <p>(ex: http://google.com )</p>
                      <Form.Control
                        type="url"
                        readOnly
                        value={e.link1}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label>Second URL (if any)</Form.Label>
                      <p>(ex: http://yahoo.com )</p>
                      <Form.Control
                        type="text"
                        readOnly
                        value={e.link2}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                  <div className={styles.oneLine}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label>First URL Description</Form.Label>
                      <Form.Control
                        type="url"
                        readOnly
                        value={e.link1Description}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label>Second URL description</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={e.infoEsp}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                  <Button type="submit" style={{ margin: '2rem 0' }}>
                    Submit Changes
                  </Button>
                </Form>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default UpdateEvents;
