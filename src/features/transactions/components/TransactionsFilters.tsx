import React, { useState } from 'react';
import { XStack, YStack, Button, Input, Label, Select, Text } from 'tamagui';

type Props = {
  onChange: (f: any) => void;
};

export function TransactionsFilters({ onChange }: Props) {
  const [type, setType] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  const apply = () =>
    onChange({
      type: type as any,
      category,
      paymentMethod,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    });

  const clear = () => {
    setType(undefined);
    setCategory(undefined);
    setPaymentMethod(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    onChange({});
  };

  return (
    <YStack gap="$3">
      <XStack gap="$2" flexWrap="wrap">
        {/* Type */}
        <YStack width="48%">
          <Label>Tipo</Label>
          <Select value={type} onValueChange={setType}>
            <Select.Trigger>
              <Text>{type || 'Todos'}</Text>
            </Select.Trigger>
            <Select.Content>
              <Select.Item index={1} value="">
                Todos
              </Select.Item>
              <Select.Item index={2} value="Entrada">
                Entrada
              </Select.Item>
              <Select.Item index={3} value="Saída">
                Saída
              </Select.Item>
            </Select.Content>
          </Select>
        </YStack>

        {/* Categoria */}
        <YStack width="48%">
          <Label>Categoria</Label>
          <Select value={category} onValueChange={setCategory}>
            <Select.Trigger>
              <Text>{category || 'Todas'}</Text>
            </Select.Trigger>
            <Select.Content>
              {['Alimentação', 'Transporte', 'Salário', 'Lazer', 'Outros'].map((c, index) => (
                <Select.Item index={index} key={c} value={c}>
                  {c}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </YStack>

        <YStack width="48%">
          <Label>Pagamento</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <Select.Trigger>
              <Text>{paymentMethod || 'Todos'}</Text>
            </Select.Trigger>
            <Select.Content>
              {['PIX', 'Crédito', 'Débito', 'Boleto', 'Dinheiro'].map((p, index) => (
                <Select.Item index={index} key={p} value={p}>
                  {p}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </YStack>

        <YStack width="48%">
          <Label>Início</Label>
          <Input value={startDate} onChangeText={setStartDate} placeholder="yyyy-mm-dd" />
        </YStack>
        <YStack width="48%">
          <Label>Fim</Label>
          <Input value={endDate} onChangeText={setEndDate} placeholder="yyyy-mm-dd" />
        </YStack>
      </XStack>

      <XStack gap="$2" justifyContent="flex-end">
        <Button onPress={clear} variant="outlined">
          Limpar
        </Button>
        <Button onPress={apply}>Aplicar</Button>
      </XStack>
    </YStack>
  );
}
