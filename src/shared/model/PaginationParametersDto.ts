export interface PaginationParametersDto {
  page: number;
  limit: number;
  search?: string;
  projectId?: string;
  isPublic?: boolean;
}
