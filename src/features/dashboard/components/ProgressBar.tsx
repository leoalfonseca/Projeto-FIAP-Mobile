'use client';

import { Text, YStack, XStack, Progress } from 'tamagui';

import FormatNumber from '@/components/FormatNumber/FormatNumber';

import { Skeleton } from '@/components/Skeleton/Skeleton';

import { useProfileMe } from '../hooks/useProfileMe';

interface ProgressCardProps {
  dashboard?: boolean;
  tokens: any;
}

export function ProgressCard({ dashboard, tokens }: ProgressCardProps) {
  const { data: profile, isLoading } = useProfileMe();

  if (isLoading) {
    return (
      <YStack
        justifyContent="flex-start"
        height={110}
        gap="$6"
        padding="$4"
        borderRadius={4}
        backgroundColor="#fff"
      >
        <Skeleton width={300} height={20} />
        <Skeleton width="100%" height={20} />
      </YStack>
    );
  }

  return (
    <YStack
      gap="$2"
      padding="$4"
      borderRadius={4}
      backgroundColor={dashboard ? 'white' : 'transparent'}
    >
      {dashboard && (
        <XStack gap="$2" alignItems="center" flexWrap="wrap">
          <Text fontSize="$2">Progresso para sua próxima conquista:</Text>
          <YStack
            backgroundColor="$primary400"
            paddingHorizontal="$2"
            paddingVertical={2}
            borderRadius={2}
          >
            <Text fontSize={10} color="white" fontWeight="600">
              {profile?.nextLevel?.nextReward?.title || profile?.nextLevel?.label}
            </Text>
          </YStack>
        </XStack>
      )}

      <XStack justifyContent="space-between">
        <Text color={tokens.color.$gray600.val}>
          {FormatNumber({
            number: profile?.balanceCommission || 0,
            format: 'currency'
          })}
        </Text>
        <Text color={tokens.color.$gray600.val}>
          {FormatNumber({
            number: profile?.nextLevel?.goalValue || 0,
            format: 'currency'
          })}
        </Text>
      </XStack>

      <YStack position="relative" justifyContent="center">
        <Progress
          value={profile?.nextLevel?.progressPercent || 0}
          size="$2"
          backgroundColor={tokens.color.$gray200.val}
          borderRadius={4}
          height={16}
        >
          <Progress.Indicator backgroundColor={tokens.color.$secondary300.val} borderRadius={4} />
        </Progress>

        <Text
          position="absolute"
          left="50%"
          fontSize="$1"
          fontWeight="600"
          color={tokens.color.$gray600.val}
        >
          {FormatNumber({
            number: profile?.nextLevel?.progressPercent || 0,
            format: 'percent'
          })}
        </Text>
      </YStack>
    </YStack>
  );
}
