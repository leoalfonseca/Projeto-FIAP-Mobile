import { ComparativeTypeEnum } from '../enum/ComparativeTypeEnum';
import { TypeInsightEnum } from '../enum/TypeInsightEnum';

interface SimpleInsight {
  type: TypeInsightEnum.SIMPLE | TypeInsightEnum.SIMPLE_WITH_AMOUNT;
  count: number;
  totalPrice?: number;
}

interface ComparativeInsight {
  type: TypeInsightEnum.COMPARATIVE;
  amount: number;
  compareAmount: number;
  dataType: ComparativeTypeEnum;
  compareTitle: string;
}

interface ChartInsight {
  type: TypeInsightEnum.CHART;
  data: ItemData[];
}

interface ItemData {
  label: string;
  value: number;
}

export type ResumeItem<TypeInsight = TypeInsightEnum> = {
  id: string;
  title: string;
  type: TypeInsight;
} & (SimpleInsight | ComparativeInsight | ChartInsight);

export interface ResumeGroup {
  title: string;
  insights: ResumeItem[];
}
