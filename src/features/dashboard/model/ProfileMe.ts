import { Levels, LevelsData } from '@/features/career/model/Levels';

export interface ProfileMe {
  coins: number;
  balanceCommission: number;
  levels: LevelsData[];
  level: Levels;
  nextLevel: {
    nextReward?: {
      title: string;
      image: string;
    };
    baseValue: number;
    goalValue: number;
    progressPercent: number;
    level: Levels;
    label: string;
  };
}
