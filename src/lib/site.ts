export const site = {
  name: "Gaoson's Barber Shop",
  shortName: "Gaoson",
  tagline: "Crafted Cuts. Curated Kicks.",
  description:
    "Salon de coiffure homme premium et dépôt-vente sneakers & lifestyle, ancré au cœur de Biot. Coupe nette, héritage authentique, culture de la rue.",
  address: {
    street: "32 Rue Saint-Sébastien",
    postalCode: "06410",
    city: "Biot",
    country: "France",
    full: "32 Rue Saint-Sébastien, 06410 Biot",
  },
  hours: [
    { days: "Mardi — Dimanche", time: "08:45 — 19:00" },
    { days: "Lundi", time: "Fermé" },
  ],
  links: {
    booksy:
      "https://booksy.com/fr-fr/20935_gaosons-barber-shop_barbier_118662_biot#ba_s=seo",
    instagram: "https://www.instagram.com/gaosonbarbershop/",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=32+Rue+Saint-S%C3%A9bastien+06410+Biot",
  },
  legal: {
    siret: "350 067 146 00018",
    host: {
      name: "IONOS SE",
      address: "7 place de la Gare, BP 70109, 57201 Sarreguemines",
    },
  },
  elfsightWidgetId: "dbe5b599-f9b6-4952-a657-b26fe8c232c5",
} as const;

export type Site = typeof site;
