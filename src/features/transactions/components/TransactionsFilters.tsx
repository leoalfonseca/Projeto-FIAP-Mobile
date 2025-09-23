import { ChevronDown, ListFilter } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { XStack, YStack, Button, Input, Label, Accordion, Paragraph } from 'tamagui';

import { Select } from '@/components/Select/Select';

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
    <Accordion overflow="hidden" type="multiple" marginBottom="$4">
      <Accordion.Item value="a1">
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderWidth={0}
          borderRadius={8}
        >
          <XStack alignItems="center" gap="$2">
            <ListFilter color="$primary400" />
            <Paragraph color="$primary400" fontWeight="700">
              Filtros
            </Paragraph>
          </XStack>
          <ChevronDown color="$primary400" />
        </Accordion.Trigger>
        <Accordion.HeightAnimator>
          <Accordion.Content exitStyle={{ opacity: 0 }}>
            <YStack gap="$3">
              <XStack gap="$2" flexWrap="wrap">
                <YStack width="48%">
                  <Select
                    value={type}
                    onValueChange={setType}
                    placeholder="Tipo"
                    variant="outlined"
                    iconAfter={ChevronDown as any}
                    options={[
                      { label: 'Todos', value: '' },
                      { label: 'Entrada', value: 'Entrada' },
                      { label: 'Saída', value: 'Saída' }
                    ]}
                    disablePreventBodyScroll
                  />
                </YStack>

                <YStack width="48%">
                  <Select
                    value={category}
                    onValueChange={setCategory}
                    placeholder="Categoria"
                    variant="outlined"
                    iconAfter={ChevronDown as any}
                    options={[
                      { label: 'Todas', value: '' },
                      { label: 'Alimentação', value: 'Alimentação' },
                      { label: 'Transporte', value: 'Transporte' },
                      { label: 'Salário', value: 'Salário' },
                      { label: 'Lazer', value: 'Lazer' },
                      { label: 'Outros', value: 'Outros' }
                    ]}
                    disablePreventBodyScroll
                  />
                </YStack>

                <YStack width="48%">
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    placeholder="Pagamento"
                    variant="outlined"
                    iconAfter={ChevronDown as any}
                    options={[
                      { label: 'Todos', value: '' },
                      { label: 'PIX', value: 'PIX' },
                      { label: 'Crédito', value: 'Crédito' },
                      { label: 'Débito', value: 'Débito' },
                      { label: 'Boleto', value: 'Boleto' },
                      { label: 'Dinheiro', value: 'Dinheiro' }
                    ]}
                    disablePreventBodyScroll
                  />
                </YStack>
                <YStack width="48%" />
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
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
}
