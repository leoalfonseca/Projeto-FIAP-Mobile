import { CircleUser } from '@tamagui/lucide-icons';
import React from 'react';
import { FlatList } from 'react-native';
import { XStack, Text, Avatar } from 'tamagui';

import { getUserInitials } from '@/shared/getUserInitials';

import { RankType } from '../model/RankType';

interface AffiliateRankData {
  data: RankType[];
  isLoading: boolean;
  tokens: any;
}

export default function AffiliateRank({ data, isLoading, tokens }: AffiliateRankData) {
  const renderItem = ({ item }: { item: RankType }) => (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderBottomWidth={1}
      borderColor={tokens.color.$gray300.val}
    >
      <XStack flex={0.75} alignItems="center" gap="$2">
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
          {item.affiliateName}
        </Text>
      </XStack>

      <Text
        color={tokens.color.$primary400.val}
        fontSize={12}
        textAlign="left"
        minWidth={110}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.productName}
      </Text>

      {/* Valor total */}
      <Text color={tokens.color.$primary400.val} fontSize={12} textAlign="right" minWidth={80}>
        R${item.total?.toFixed(2)}
      </Text>
    </XStack>
  );

  return (
    <FlatList
      scrollEnabled={false}
      ListHeaderComponent={
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="$3"
          paddingVertical="$3"
        >
          <XStack flex={0.65}>
            <Text fontWeight={300} color={tokens.color.$primary400.val}>
              <CircleUser strokeWidth={1} color={tokens.color.$primary400.val} />
            </Text>
          </XStack>

          <Text width={110} fontWeight={300} color={tokens.color.$primary400.val} textAlign="left">
            Prod.
          </Text>

          <Text width={70} fontWeight={300} color={tokens.color.$primary400.val} textAlign="left">
            $
          </Text>
        </XStack>
      }
      data={data}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={isLoading ? undefined : renderItem}
      ListEmptyComponent={
        isLoading ? (
          <Text padding={12}>Carregando...</Text>
        ) : (
          <Text padding={12}>Nenhum afiliado encontrado.</Text>
        )
      }
      contentContainerStyle={{
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        backgroundColor: 'white'
      }}
    />
  );
}
