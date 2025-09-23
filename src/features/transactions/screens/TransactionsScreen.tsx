import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { YStack, Text, View, getTokens, Button, XStack, Spinner } from 'tamagui';

import { useDisclosure } from '@/shared/hooks/useDisclosure';

import { TransactionCard } from '../components/TransactionCard';
import { TransactionModal } from '../components/TransactionModal';
import { TransactionsFilters } from '../components/TransactionsFilters';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction } from '../model/Transaction';
import { TxFilters } from '../services/transactions.service';
import { downloadReceipt } from '../utils/downloadReceipt';

export function TransactionsScreen() {
  const tokens = getTokens();
  const { open, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState<any>({});
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const { items, loading, hasMore, loadMore, refresh, refreshing } = useTransactions(
    filters as TxFilters
  );

  function handleEditTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction);
    onOpen();
  }

  return (
    <YStack
      flex={1}
      paddingHorizontal="$4"
      paddingTop="$3"
      paddingBottom="$5"
      backgroundColor={tokens.color.$background}
    >
      <View flex={1} gap="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={20} fontWeight="800" color="$primary400">
            Transações
          </Text>
          <Button backgroundColor="$primary200" onPress={onOpen} alignSelf="flex-end">
            <Text fontWeight="bold" color="$gray100">
              Nova Transação
            </Text>
          </Button>
        </XStack>

        <TransactionsFilters onChange={setFilters} />

        {!items?.length && !loading ? (
          <Text fontSize={14} color="black">
            Nenhuma transação encontrada.
          </Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: { item: Transaction }) => (
              <TransactionCard
                transaction={item}
                onEdit={() => handleEditTransaction(item)}
                onDownloadReceipt={() => downloadReceipt(item.receiptUrl as string)}
              />
            )}
            onEndReachedThreshold={0.6}
            onEndReached={() => hasMore && loadMore()}
            ListFooterComponent={loading ? <Spinner marginTop="$3" /> : null}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          />
        )}
      </View>

      <TransactionModal
        open={open}
        onClose={() => {
          setSelectedTransaction(null);
          onClose();
        }}
        onSaved={refresh}
        transaction={selectedTransaction}
      />
    </YStack>
  );
}
