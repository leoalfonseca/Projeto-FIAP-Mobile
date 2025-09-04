import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateNicheSuggestionsDto {
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;

  @IsNotEmpty({ message: 'A URL é obrigatória.' })
  @Transform(({ value }) => {
    if (!value) return value;
    return value.startsWith('http') ? value : `https://${value}`;
  })
  @IsUrl({}, { message: 'A URL informada não é válida.' })
  urlRef: string;
}
