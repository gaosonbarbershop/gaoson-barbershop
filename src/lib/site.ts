export type Site = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
    full: string;
  };
  hours: { days: string; time: string }[];
  links: {
    booksy: string;
    instagram: string;
    googleMaps: string;
  };
  legal: {
    siret: string;
    host: { name: string; address: string };
  };
  elfsightWidgetId: string;
};
