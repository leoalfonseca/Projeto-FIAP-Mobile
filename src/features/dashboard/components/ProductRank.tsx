import React from 'react';
import { FlatList } from 'react-native';
import { XStack, Text, Avatar } from 'tamagui';

import { getUserInitials } from '@/shared/getUserInitials';

import { RankType } from '../model/RankType';

interface ProductRankData {
  data: RankType[];
  isLoading: boolean;
  tokens: any;
}

export default function ProductRank({ data, tokens }: ProductRankData) {
  const renderItem = ({ item }: { item: RankType }) => (
    <XStack
      justifyContent="space-between"
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderBottomWidth={1}
      borderColor={tokens.color.$gray300.val}
    >
      <XStack flex={1} alignItems="center" gap="$2">
        <Avatar circular size="$1" backgroundColor={tokens.color.$primary50.val}>
          <Avatar.Fallback
            backgroundColor={tokens.color.$primary50.val}
            justifyContent="center"
            alignItems="center"
          >
            <Text color={tokens.color.$gray800.val} fontSize={10}>
              {getUserInitials(item.name || 'NM')}
            </Text>
          </Avatar.Fallback>
        </Avatar>
        <Text color={tokens.color.$gray800.val} fontSize={12}>
          {item.name}
        </Text>
      </XStack>
      <Text
        color={tokens.color.$primary400.val}
        textAlign="left"
        style={{ flexGrow: 0, minWidth: 30 }}
        fontSize={12}
      >
        {item.count}
      </Text>
    </XStack>
  );

  return (
    <FlatList
      scrollEnabled={false}
      ListHeaderComponent={
        <XStack justifyContent="space-between" paddingHorizontal="$4" paddingVertical="$3">
          <Text fontWeight={300} color={tokens.color.$primary400.val}>
            Produtos Mais Vendidos
          </Text>
          <Text fontWeight={300} color={tokens.color.$primary400.val}>
            QTD.
          </Text>
        </XStack>
      }
      data={data}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={renderItem}
      contentContainerStyle={{
        borderColor: '#E2E8F0',
        borderRadius: 8,
        backgroundColor: '#fff'
      }}
    />
  );
}
