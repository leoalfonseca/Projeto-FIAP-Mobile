interface NumberToStringProps {
  number: number;
  format?: 'number' | 'currency' | 'percent';
}

export default function FormatNumber({ number, format }: NumberToStringProps) {
  if (format === 'currency') {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
  }

  if (format === 'percent') {
    return `${number}%`;
  }

  return String(number);
}
