import { Client } from '../api/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(Client);

const urlFor = (source) => {
  return builder.image(source);
};

export const fetchEventsData = async () => {
  let theseEvents = [];
  let futureEvents = [];
  const losEventos = await Client.fetch("*[_type == 'event'] | order(start)");
  console.log(losEventos);
  alert('check console for return value');
  losEventos.forEach((v) => {
    const imageObj = v.image;
    const imageUrl = urlFor(imageObj).url().toString();
    let currentEvent = {
      id: v._id,
      start: v.start,
      end: v.end,
      allDay: v.allDay,
      title: v.title,
      titleEsp: v.titleEsp,
      subtitle: v.subtitle,
      subtitleEsp: v.subtitleEsp,
      info: v.importantInfo,
      infoEsp: v.importantInfoEsp,
      description: v.description,
      descriptionEsp: v.descriptionEsp,
      link1Description: v.link1Description,
      link1: v.link1,
      link2Description: v.link2Description,
      link2: v.link2,
      imageUrl: imageUrl,
      image: v.image,
    };
    theseEvents.push(currentEvent);
    const now = new Date(Date.now());
    const today = now.toISOString();
    futureEvents = theseEvents.filter((ev) => ev.start >= today);
  });
  return futureEvents;
  // setEvents(events.concat(futureEvents));
};

export const fetchBoardData = async () => {
  let thisBoard = [];
  const losMiembros = await Client.fetch(
    "*[_type == 'board'] | order(displayOrder)"
  );
  losMiembros.forEach((m) => {
    const imageObj = m.memberImage;
    const imageUrl = urlFor(imageObj).url().toString();
    let currentMember = {
      id: m._id,
      name: m.name,
      titleEng: m.titleEng,
      titleEsp: m.titleEsp,
      bioEng: m.bioEng,
      bioEsp: m.bioEsp,
      imageUrl: imageUrl,
      image: m.memberImage,
      displayOrder: m.displayOrder,
    };
    thisBoard.push(currentMember);
  });
  return thisBoard;
};

export const fetchJobsData = async () => {
  let theseJobs = [];
  const losPuestos = await Client.fetch(
    "*[_type == 'job'] | order(displayOrder)"
  );
  losPuestos.forEach((p) => {
    let currentJob = {
      id: p._id,
      jobTitle: p.jobTitle,
      jobDescription: p.jobDescription,
      active: p.active,
      displayOrder: p.displayOrder,
    };
    theseJobs.push(currentJob);
  });
  return theseJobs;
};
