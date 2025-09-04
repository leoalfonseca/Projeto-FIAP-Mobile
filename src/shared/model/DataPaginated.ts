import { ResumeItem } from '@/features/dashboard/model/ResumeItem';

import { PaginationInfo } from './PaginationInfo';

export interface DataPaginated<DataType = unknown> {
  pagination: PaginationInfo;
  data: DataType[];
  resume?: ResumeItem;
}
