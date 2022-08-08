const SANITY_KEY = process.env.REACT_APP_SANITY_KEY;

const sanityClient = require('@sanity/client');
export const Client = sanityClient({
  projectId: 'erqpw4nh',
  dataset: 'production',
  token: SANITY_KEY,
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true,
});

export const fetchEvents = Client.fetch("*[_type == 'event'] | order(start)");

export const fetchBoard = Client.fetch(
  "*[_type == 'board'] | order(displayOrder)"
);

export const fetchServices = Client.fetch(
  "*[_type == 'service'] | order(displayOrder)"
);
export const fetchJobs = Client.fetch(
  "*[_type == 'job'] | order(displayOrder)"
);
