import { Transaction } from './Transaction';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salário',
    description: 'Pagamento mensal',
    type: 'Entrada',
    category: 'Salário',
    paymentMethod: 'PIX',
    amount: 3250.0,
    date: new Date('2025-09-01T08:12:00')
  },
  {
    id: '2',
    title: 'Conta de luz',
    description: 'Energia elétrica agosto',
    type: 'Saída',
    category: 'Outros',
    paymentMethod: 'Boleto',
    amount: 1500.0,
    date: new Date('2025-09-01T13:53:00')
  },
  {
    id: '3',
    title: 'Supermercado',
    description: 'Compras semanais',
    type: 'Saída',
    category: 'Alimentação',
    paymentMethod: 'Crédito',
    amount: 2000.0,
    date: new Date('2025-09-02T10:25:00')
  },
  {
    id: '4',
    title: 'Café da manhã',
    description: 'Padaria do bairro',
    type: 'Saída',
    category: 'Alimentação',
    paymentMethod: 'PIX',
    amount: 150.0,
    date: new Date('2025-09-02T07:32:00')
  },
  {
    id: '5',
    title: 'Venda online',
    description: 'Produto marketplace',
    type: 'Entrada',
    category: 'Outros',
    paymentMethod: 'Débito',
    amount: 850.0,
    date: new Date('2025-09-02T09:45:00')
  },
  {
    id: '6',
    title: 'Aluguel',
    description: 'Apartamento setembro',
    type: 'Saída',
    category: 'Outros',
    paymentMethod: 'Boleto',
    amount: 900.0,
    date: new Date('2025-09-03T15:10:00')
  },
  {
    id: '7',
    title: 'Freelance',
    description: 'Projeto web',
    type: 'Entrada',
    category: 'Outros',
    paymentMethod: 'PIX',
    amount: 1200.0,
    date: new Date('2025-09-03T11:20:00')
  },
  {
    id: '8',
    title: 'Cinema',
    description: 'Sessão com amigos',
    type: 'Saída',
    category: 'Lazer',
    paymentMethod: 'Crédito',
    amount: 300.0,
    date: new Date('2025-09-03T16:30:00')
  },
  {
    id: '9',
    title: 'Reembolso',
    description: 'Transporte empresa',
    type: 'Entrada',
    category: 'Transporte',
    paymentMethod: 'PIX',
    amount: 500.0,
    date: new Date('2025-09-04T17:40:00')
  },
  {
    id: '10',
    title: 'Notebook novo',
    description: 'Parcela 1/10',
    type: 'Saída',
    category: 'Outros',
    paymentMethod: 'Boleto',
    amount: 2700.0,
    date: new Date('2025-09-04T18:50:00')
  }
];
