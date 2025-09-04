export interface Offer {
  id: string;
  title: string;
  numberOfItems: number;
  status: boolean | string | null;
  isPublic: boolean | string | null;
  productId: string;
  price: number;
  inclusiveOffers: Offer[];
}

export interface ProductWithOffer {
  id: string;
  name: string;
  offers: Offer[];
}
