export type Service = {
  name: string;
  price: string;
  duration: string;
  description?: string;
};

export type ServiceGroup = {
  title: string;
  caption: string;
  items: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Coupes",
    caption: "Le geste, la précision.",
    items: [
      {
        name: "Coupe",
        price: "20 €",
        duration: "20 min",
      },
      {
        name: "Coupe transformation",
        price: "30 €",
        duration: "35 min",
        description: "Cheveux long à court.",
      },
      {
        name: "Coupe enfant",
        price: "15 €",
        duration: "35 min",
        description: "Jusqu'à 10 ans.",
      },
      {
        name: "Dessin & design",
        price: "5 €",
        duration: "30 min",
        description: "Motif rasoir sur-mesure.",
      },
    ],
  },
  {
    title: "Forfait",
    caption: "Le rituel signature.",
    items: [
      {
        name: "Coupe + barbe",
        price: "25 €",
        duration: "35 min",
        description: "Le combo qui fait tout.",
      },
    ],
  },
  {
    title: "Barbe & Technique",
    caption: "Sculptée, jamais bâclée.",
    items: [
      {
        name: "Taille de barbe",
        price: "15 €",
        duration: "25 min",
      },
      {
        name: "Coloration barbe",
        price: "16 €",
        duration: "15 min",
      },
      {
        name: "Coloration",
        price: "15 €+",
        duration: "30 min",
      },
      {
        name: "Décoloration + coupe",
        price: "65 €+",
        duration: "2 h 30",
      },
    ],
  },
];
