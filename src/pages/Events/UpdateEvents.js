import React, { useEffect, useState } from 'react';
import DateTimeSection from '../../components/DateTimeSection';
import BilingualSection from '../../components/BilingualSection';
import ImageSection from '../../components/ImageSection';
import LinkSection from '../../components/LinkSection';
import CheckErrors from '../../popups/CheckErrors';
import Thinking from '../../popups/Thinking';
import ActionComplete from '../../popups/ActionComplete';
import $ from 'jquery';
import { Client } from '../../api/client';
import { fetchEventsData } from '../../fuctions/fetchData';
import { Button, Form, Carousel } from 'react-bootstrap';
import styles from './Events.module.scss';

const UpdateEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const fileSelectHandler = (file) => {
    setSelectedFile(file);
  };

  let newStart;
  let newEnd;
  let form = {};

  const checkErrors = (id) => {
    const startStr = (
      $(`#startDate${id}`).val() +
      ' ' +
      $(`#startTime${id}`).val()
    ).trim();
    const endStr = (
      $(`#endDate${id}`).val() +
      ' ' +
      $(`#endTime${id}`).val()
    ).trim();

    newStart = Date.parse(startStr);
    newEnd = Date.parse(endStr);
    if (isNaN(newEnd)) {
      $(`#endTime${id}`).val('');
      newEnd = newStart;
    }

    const dateDiff = newStart - newEnd;
    const englishTitle = $(`#title${id}`).val();
    const spanishTitle = $(`#titleEsp${id}`).val();
    const englishDescr = $(`#description${id}`).val();
    const spanishDescr = $(`#descriptionEsp${id}`).val();
    switch (true) {
      case isNaN(dateDiff): //newStart is invalid
        setErrorMessage(<p>Please enter a valide Start Date</p>);
        openErrorPopup(id);
        break;
      case dateDiff > 0: //end Date is before start date
        setErrorMessage(
          <p>
            End Date/Time must be later than Start Date/Time (or left blank)
          </p>
        );
        openErrorPopup(id);
        break;
      case !englishTitle || !spanishTitle:
        setErrorMessage(
          <p>
            You must enter a <i>title</i> in English <u>and</u> Spanish
          </p>
        );
        openErrorPopup(id);
        break;
      case !englishDescr || !spanishDescr:
        setErrorMessage(
          <p>
            You must enter a <i>description</i> in English <u>and</u> Spanish
          </p>
        );
        openErrorPopup(id);
        break;
      case endStr === '' || newEnd === newStart:
        form.start = new Date(newStart);
        form.end = '';
        prepareForm(id);
        break;
      default:
        form.start = new Date(newStart);
        form.end = new Date(newEnd);
        prepareForm(id);
        break;
    }
  };

  const openErrorPopup = (id) => {
    $(`#checkErrors${id}`).css('display', 'flex');
  };

  const prepareForm = (id) => {
    $('#thinking').css('display', 'flex');
    const preparedImageObj = {
      _type: 'image',
      asset: { _ref: $(`#image${id}`).val(), _type: 'reference' },
    };
    form._id = id;
    form._type = 'event';
    form.description = $(`#description${id}`).val();
    form.descriptionEsp = $(`#descriptionEsp${id}`).val();
    form.image = { ...preparedImageObj };
    form.importantInfo = $(`#info${id}`).val();
    form.importantInfoEsp = $(`#infoEsp${id}`).val();
    form.link1 = $(`#link1${id}`).val();
    form.link2 = $(`#link2${id}`).val();
    form.link1Description = $(`#link1Description${id}`).val().trim();
    form.link2Description = $(`#link2Description${id}`).val().trim();
    form.title = $(`#title${id}`).val();
    form.subtitle = $(`#subtitle${id}`).val();
    form.titleEsp = $(`#titleEsp${id}`).val();
    form.subtitleEsp = $(`#subtitleEsp${id}`).val();
    $('#thinking').css('display', 'none');

    console.log(form);
    submitForm();
  };

  const submitForm = async () => {
    const now = new Date();
    const preUpdate = Date.parse(now);
    let response = await Client.createOrReplace(form).catch((err) => {
      alert('Oh no, the update failed: ', err.message);
      return;
    });

    const updatedAt = Date.parse(response._updatedAt);
    if (updatedAt >= preUpdate) {
      $('#thinking').css('display', 'none');
      $('#success').css('display', 'flex');
    }
  };

  const fetchEvents = async () => {
    const eventsArray = await fetchEventsData();
    setEvents(events.concat(eventsArray));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.updateEvents}>
      <Carousel interval={null}>
        {events.map((e, index) => {
          return (
            <Carousel.Item key={`${e.title}${index}`}>
              <CheckErrors id={e.id} message={errorMessage} />
              <ActionComplete
                title={e.title}
                titleEsp={e.titleEsp}
                action="edited"
              />
              <Thinking />
              <div className={styles.mainInputArea}>
                <h2>
                  {e.title} / {e.titleEsp}
                </h2>
                <h3>{`event ${index + 1} of ${events.length}`}</h3>
                <Form>
                  <DateTimeSection
                    id={e.id}
                    start={e.start}
                    end={e.end}
                    allDay={e.allDay}
                  />
                  <BilingualSection
                    id={e.id}
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
                    image={e.image}
                    initialUrl={e.imageUrl}
                    selectedFile={selectedFile}
                    fileSelectHandler={(file) => fileSelectHandler(file)}
                  />
                  <LinkSection
                    id={e.id}
                    link1={e.link1}
                    link2={e.link2}
                    link1Description={e.link1Description}
                    link2Description={e.link2Description}
                  />
                  <Button
                    onClick={() => checkErrors(e.id)}
                    style={{ margin: '2rem 0' }}
                  >
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
