import { BanknoteArrowDown, BanknoteArrowUp } from '@tamagui/lucide-icons';
import { YStack, Text, XStack, Card } from 'tamagui';

import { Transaction } from '../model/Transaction';

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Card
      padding="$4"
      margin="$2"
      backgroundColor="white"
      gap={6}
      position="relative"
      borderRadius={10}
      shadowColor="#000"
    >
      <XStack justifyContent="space-between" alignItems="center">
        <YStack width={30}>
          {transaction.type === 'Entrada' ? (
            <BanknoteArrowUp color="$green500" />
          ) : (
            <BanknoteArrowDown color="$red500" />
          )}
        </YStack>
        <Text fontSize={14} fontWeight="500" width={80} textAlign="right" color="$primary400">
          {transaction?.type}
        </Text>
        <Text fontSize={14} fontWeight="500" width={80} textAlign="right" color="$primary400">
          {transaction?.time}
        </Text>
        <Text fontSize={14} fontWeight="500" width={80} textAlign="right" color="$primary400">
          {transaction?.paymentMethod}
        </Text>
        <Text fontSize={14} fontWeight="500" width={80} textAlign="right" color="$primary400">
          {transaction?.value}
        </Text>
      </XStack>
    </Card>
  );
}
