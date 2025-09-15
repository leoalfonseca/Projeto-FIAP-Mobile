import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title!: string;

  @IsOptional()
  description?: string;

  @IsIn(['Entrada', 'Saída'], { message: 'Tipo inválido.' })
  type!: 'Entrada' | 'Saída';

  @IsIn(['Alimentação', 'Transporte', 'Salário', 'Lazer', 'Outros'], {
    message: 'Categoria inválida.'
  })
  category!: 'Alimentação' | 'Transporte' | 'Salário' | 'Lazer' | 'Outros';

  @IsIn(['PIX', 'Crédito', 'Débito', 'Boleto', 'Dinheiro'], { message: 'Pagamento inválido.' })
  paymentMethod!: 'PIX' | 'Crédito' | 'Débito' | 'Boleto' | 'Dinheiro';

  @Transform(({ value }) => (typeof value === 'string' ? Number(value.replace(',', '.')) : value))
  @IsNumber({}, { message: 'Valor inválido.' })
  @Min(0.01, { message: 'O valor deve ser maior que zero.' })
  amount!: number;

  @IsNotEmpty({ message: 'A data é obrigatória.' })
  date!: string;

  @IsOptional()
  receiptUrl?: string;
}
