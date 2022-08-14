import { Client } from '../api/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(Client);

const urlFor = (source) => {
  return builder.image(source);
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
