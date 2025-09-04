import React from 'react';

import { Text, YStack, XStack, Card, Image, Separator } from 'tamagui';

import FormatNumber from '@/components/FormatNumber/FormatNumber';

import { TypeInsightEnum } from '../../enum/TypeInsightEnum';
import { ResumeItem } from '../../model/ResumeItem';

interface OverviewCardProps {
  data: ResumeItem<TypeInsightEnum.SIMPLE | TypeInsightEnum.SIMPLE_WITH_AMOUNT>;
  backOffice: boolean;
  objId?: string;
  type?: string;
}

export function OverviewCard({ data }: OverviewCardProps) {
  return (
    <Card
      bordered
      elevate
      padding="$3"
      borderRadius={16}
      height={150}
      width={'100%'}
      overflow="hidden"
      justifyContent="space-between"
    >
      <Image
        source={require('../../../../../public/static/payLog/assets/cardDashGray.png')}
        resizeMode="contain"
        style={{
          position: 'absolute',
          bottom: -70,
          right: -10,
          width: 200,
          height: 150,
          zIndex: 0
        }}
      />
      <YStack flex={1} gap="$2" justifyContent="space-between">
        <YStack gap={16}>
          <Text fontSize="$2" color="$gray40" fontWeight="600">
            {data.title}
          </Text>
          <Separator />
        </YStack>

        {data.totalPrice !== undefined && (
          <Text fontSize={22} color="$green10" fontWeight="600">
            {FormatNumber({ number: data.totalPrice || 0, format: 'currency' })}
          </Text>
        )}

        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={20} fontWeight="800">
            {data.count}
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
}
