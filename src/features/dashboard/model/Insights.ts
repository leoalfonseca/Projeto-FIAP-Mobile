import { RankType } from './RankType';
import { RegionData } from './RegionData';
import { ResumeGroup } from './ResumeItem';

export interface Insights {
  resume: ResumeGroup[];
  byRegion: RegionData[];
  productRank: RankType[];
  affiliateRank: RankType[];
  producerRank?: RankType[];
  affiliateProductRank: RankType[];
}
