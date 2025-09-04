import { IsOptional } from 'class-validator';

export class FilterDto {
  @IsOptional()
  productId?: string[];

  @IsOptional()
  offerId?: string[];

  @IsOptional()
  projectId?: string;

  @IsOptional()
  userId?: string;
}
