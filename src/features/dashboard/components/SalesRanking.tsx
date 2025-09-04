import React from 'react';
import { YStack, XStack, Text, View, Button } from 'tamagui';

interface SalesRankingData {
  label: string;
  percentage: number;
  value: string;
  orders: number;
  icon: any;
}

interface SalesRankingProps {
  data: SalesRankingData[];
}

export default function SalesRanking({ data }: SalesRankingProps) {
  return (
    <YStack>
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize={12} fontWeight="bold">
          Ranking de Vendas
        </Text>
        <Button size="$3">Filtrar</Button>
      </XStack>

      <Text fontSize={10} marginBottom="$4">
        Por meio de pagamento
      </Text>

      <YStack
        borderWidth={1}
        borderColor="$gray5"
        borderRadius={8}
        padding="$4"
        alignSelf="flex-start"
      >
        <YStack space="$4">
          {data.map((item, index) => (
            <XStack key={index} alignItems="center" space="$3">
              {/* Círculo de Progresso Customizado */}
              <View
                width={60}
                height={60}
                borderRadius={999}
                borderWidth={5}
                borderColor="$blue10"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="$3" fontWeight="bold">
                  {item.percentage}%
                </Text>
              </View>

              <YStack>
                <XStack alignItems="center" space="$2">
                  <item.icon size={20} color="#4B5563" />
                  <Text fontSize={8} fontWeight="500">
                    {item.label}
                  </Text>
                </XStack>
                <Text fontSize={10} fontWeight="bold" color="$gray12">
                  {item.value}
                </Text>
                <Text fontSize="$2" color="$gray10">
                  {item.orders} pedidos
                </Text>
              </YStack>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </YStack>
  );
}
