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
