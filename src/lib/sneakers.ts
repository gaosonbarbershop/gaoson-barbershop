export type SneakerStatus = "available" | "reserved" | "sold";

export type Sneaker = {
  slug: string;
  brand: string;
  model: string;
  size: string;
  condition: string;
  price: number | null;
  status: SneakerStatus;
  image: string;
  description?: string;
  order: number;
};

export function formatPrice(price: number | null): string {
  if (price === null) return "Sur demande";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export const STATUS_LABEL: Record<SneakerStatus, string> = {
  available: "Disponible",
  reserved: "Réservée",
  sold: "Vendue",
};
