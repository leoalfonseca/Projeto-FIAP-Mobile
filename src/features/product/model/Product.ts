import { Project } from '@/features/auth/model/Project';
import { ResumeItem } from '@/features/dashboard/model/ResumeItem';

import { Levels } from './Levels';

export interface ProductTreatmentPlan {
  id: string;
  title: string;
  numberOfItems: number;
  status: boolean | null;
  isPublic: boolean | null;
  productId: string;
  price: number;
  inclusiveOffers: ProductTreatmentPlan[];
}

export interface ProductStock {
  id: string;
  type: 'ENTRY' | 'EXIT';
  quantity: number;
  reason: string;
}

export interface ProductLink {
  id: string;
  productId: string;
  externalId: string;
  product?: Product;
}

export interface OfferLink {
  id: string;
  offerId: string;
  externalId: string;
  offer?: ProductTreatmentPlan;
}

export interface MetaData {
  video: string;
  niche: string;
  initialCommission: number;
  affiliationRules: Levels;
  releaseDate: string;
  salesPage: string;
  payTLink: string;
  b4Link: string;
  coinsPerReal?: number;
  commissionLevel2?: number;
  commissionLevel3?: number;
}
export interface Product {
  id: string;
  image?: string;
  name: string;
  description: string;
  isPublic: boolean | null;
  createdAt: string;
  offers: ProductTreatmentPlan[];
  resume: ResumeItem;
  project: Project;
  projectId: string;
  metaData?: MetaData;
  currentStock?: number;
}
