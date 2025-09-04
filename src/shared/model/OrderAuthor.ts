import { AffiliateLink } from '@/features/affiliates/model/AffiliateLink';

export interface OrderAuthor {
  name: string;
  picture: string;
  affiliateLinks: AffiliateLink[];
}
