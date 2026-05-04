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
    caption: "Le geste qui fait tout.",
    items: [
      {
        name: "Coupe Homme",
        price: "25 €",
        duration: "30 min",
        description: "Shampooing, coupe ciseaux ou tondeuse, finitions.",
      },
      {
        name: "Coupe Enfant",
        price: "20 €",
        duration: "25 min",
        description: "Pour les moins de 12 ans.",
      },
      {
        name: "Tondeuse seule",
        price: "18 €",
        duration: "20 min",
        description: "Coupe entièrement à la tondeuse, contours soignés.",
      },
    ],
  },
  {
    title: "Barbe",
    caption: "Sculptée, jamais bâclée.",
    items: [
      {
        name: "Taille de barbe",
        price: "18 €",
        duration: "20 min",
        description: "Mise en forme, contours, soin hydratant.",
      },
      {
        name: "Rasage traditionnel",
        price: "25 €",
        duration: "30 min",
        description: "Serviette chaude, mousse, rasoir, baume apaisant.",
      },
    ],
  },
  {
    title: "Combos & Soins",
    caption: "L'expérience complète.",
    items: [
      {
        name: "Coupe + Barbe",
        price: "38 €",
        duration: "50 min",
        description: "Le rituel signature de la maison.",
      },
      {
        name: "Coupe + Rasage",
        price: "45 €",
        duration: "60 min",
        description: "Coupe sur mesure et rasage à la lame.",
      },
      {
        name: "Soin du visage",
        price: "20 €",
        duration: "20 min",
        description: "Gommage, masque, hydratation.",
      },
    ],
  },
];
