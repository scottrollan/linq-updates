import React, { useEffect, useState } from 'react';
import DateTimeSection from '../../components/DateTimeSection';
import BilingualSection from '../../components/BilingualSection';
import ImageSection from '../../components/ImageSection';
import LinkSection from '../../components/LinkSection';
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

  const urlFor = (source) => {
    return builder.image(source);
  };

  const fileSelectHandler = (file) => {
    setSelectedFile(file);
  };
  const fileUploadHandler = (srcUrl) => {
    console.log(srcUrl);
  };

  const submitChanges = (e) => {
    console.log(e);
  };

  const fetchData = async () => {
    let theseEvents = [];
    let futureEvents = [];
    const losEventos = await fetchEvents;
    losEventos.forEach(async (v) => {
      const imageObj = v.image;
      const imageUrl = urlFor(imageObj).url().toString();
      // setPhotoLink(imageUrl);
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
        imageUrl: imageUrl,
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
                  <DateTimeSection
                    start={e.start}
                    end={e.end}
                    allDay={e.allDay}
                  />
                  <BilingualSection
                    title={e.title}
                    titleEsp={e.titleEsp}
                    subtitle={e.subtitle}
                    subtitleEsp={e.subtitleEsp}
                    description={e.description}
                    descriptionEsp={e.descriptionEsp}
                    info={e.info}
                    infoEsp={e.infoEsp}
                  />
                  <ImageSection
                    id={e.id}
                    initialUrl={e.imageUrl}
                    selectedFile={selectedFile}
                    fileSelectHandler={(file) => fileSelectHandler(file)}
                    fileUploadHandler={fileUploadHandler}
                  />
                  <LinkSection
                    link1={e.link1}
                    link2={e.link2}
                    link1Description={e.link1Description}
                    link2Description={e.link2Description}
                  />
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
