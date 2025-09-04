import React from 'react';
import { Image } from 'react-native';
import { Text, YStack, XStack, Card } from 'tamagui';

import FormatNumber from '@/components/FormatNumber/FormatNumber';
import { TypeInsightEnum } from '@/features/dashboard/enum/TypeInsightEnum';
import { ResumeItem } from '@/features/dashboard/model/ResumeItem';

interface PaymentsReceivedCardProps {
  data: ResumeItem<TypeInsightEnum.COMPARATIVE>;
}

export function PaymentsReceivedCard({ data }: PaymentsReceivedCardProps) {
  return (
    <Card
      bordered
      borderRadius={16}
      padding="$4"
      height={150}
      width={'100%'}
      overflow="hidden"
      backgroundColor="$gray500"
      elevate
    >
      <YStack flex={1} gap="$2" justifyContent="space-between">
        <YStack gap={16} position="relative">
          <Image
            source={require('../../../../../public/static/payLog/assets/cardDashBg.png')}
            resizeMode="contain"
            style={{
              position: 'absolute',
              bottom: -50,
              right: -20,
              width: 200,
              height: 100,
              zIndex: 0
            }}
          />
          <Text fontSize="$2" fontWeight="600" color="$secondary200">
            {data.title}
          </Text>
          {data.amount !== undefined && (
            <Text fontSize={24} fontWeight="800" color="white" zIndex={1}>
              {FormatNumber({ number: data.amount || 0, format: 'currency' })}
            </Text>
          )}
        </YStack>

        <XStack
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="$secondary500"
          borderBottomLeftRadius={8}
          borderBottomRightRadius={8}
          paddingVertical={7}
          paddingHorizontal="$2"
        >
          <Text fontSize={12} fontWeight="400">
            {data.compareTitle}
          </Text>

          {data.compareAmount !== undefined && (
            <Text fontSize={12} fontWeight="400">
              {FormatNumber({ number: data.compareAmount || 0, format: 'currency' })}
            </Text>
          )}
        </XStack>
      </YStack>
    </Card>
  );
}
