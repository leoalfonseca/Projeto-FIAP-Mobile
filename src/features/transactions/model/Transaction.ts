export type TransactionType = 'Entrada' | 'Saída';
export type PaymentMethod = 'PIX' | 'Crédito' | 'Débito' | 'Boleto' | 'Dinheiro';
export type Category = 'Alimentação' | 'Transporte' | 'Salário' | 'Lazer' | 'Outros';

export type Transaction = {
  id: string;
  title: string;
  description?: string;
  type: TransactionType;
  category: Category;
  paymentMethod: PaymentMethod;
  amount: number;
  date: Date;
  receiptUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
