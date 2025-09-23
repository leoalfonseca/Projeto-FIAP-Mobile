import { BanknoteArrowDown, BanknoteArrowUp, Download, Pencil } from '@tamagui/lucide-icons';
import { Text, XStack, Card, Button } from 'tamagui';

import FormatNumber from '@/components/FormatNumber/FormatNumber';

import { Transaction } from '../model/Transaction';

interface TransactionCardProps {
  transaction: Transaction;
  onEdit?: () => void;
  onDownloadReceipt?: () => void;
}

export function TransactionCard({ transaction, onEdit, onDownloadReceipt }: TransactionCardProps) {
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
        {transaction.type === 'Entrada' ? (
          <BanknoteArrowUp color="$green500" />
        ) : (
          <BanknoteArrowDown color="$red500" />
        )}
        <Text fontSize={14} fontWeight="500" textAlign="right" color="$primary400">
          {transaction?.type}
        </Text>

        <Text fontSize={14} fontWeight="500" textAlign="right" color="$primary400">
          {transaction?.paymentMethod}
        </Text>
        <Text fontSize={14} fontWeight="500" textAlign="right" color="$primary400">
          {FormatNumber({ number: transaction?.amount, format: 'currency' })}
        </Text>
        {onDownloadReceipt && (
          <Button
            icon={<Download />}
            size={36}
            color={'$gray800'}
            onPress={onDownloadReceipt}
          ></Button>
        )}
        <Button icon={<Pencil />} size={36} color={'$gray800'} onPress={onEdit}></Button>
      </XStack>
    </Card>
  );
}
