import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { YStack, Text, View, getTokens, Button, XStack, Spinner } from 'tamagui';

import { useDisclosure } from '@/shared/hooks/useDisclosure';

import { TransactionCard } from '../components/TransactionCard';
import { TransactionModal } from '../components/TransactionModal';
import { TransactionsFilters } from '../components/TransactionsFilters';
import { useTransactions } from '../hooks/useTransactions';
import { TxFilters } from '../services/transactions.service';

export function TransactionsScreen() {
  const tokens = getTokens();
  const { open, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState<any>({});
  const { items, loading, hasMore, loadMore, refresh, refreshing } = useTransactions(
    filters as TxFilters
  );

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
            renderItem={({ item }) => <TransactionCard transaction={item} />}
            onEndReachedThreshold={0.6}
            onEndReached={() => hasMore && loadMore()}
            ListFooterComponent={loading ? <Spinner marginTop="$3" /> : null}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          />
        )}
      </View>

      <TransactionModal open={open} onClose={onClose} />
    </YStack>
  );
}
