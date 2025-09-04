import React from 'react';
import { View } from 'react-native';
import { Text, YStack, XStack, Card, Separator } from 'tamagui';
import { VictoryPie, VictoryTooltip } from 'victory-native';

import { TypeInsightEnum } from '../../enum/TypeInsightEnum';
import { ResumeItem } from '../../model/ResumeItem';
import { getColorFromRange } from '../../utils/getColorFromRange';

interface ChartProps {
  insight: ResumeItem<TypeInsightEnum.CHART>;
}

export function OverviewChart({ insight }: ChartProps) {
  const maxValue = Math.max(...insight.data.map((d) => d.value));

  const chartData = insight.data.map((item, index) => ({
    x: item.label || `Item ${index + 1}`,
    y: item.value || 0,
    color: getColorFromRange(maxValue, item.value) || '#cccccc'
  }));

  return (
    <Card
      bordered
      elevate
      paddingVertical="$4"
      paddingHorizontal="$3"
      gap="$3"
      borderRadius={16}
      width={'100%'}
      overflow="hidden"
      justifyContent="space-between"
    >
      <Text fontSize={20} fontWeight="bold">
        {insight.title}
        <Separator />
      </Text>

      <XStack alignItems="center" justifyContent="space-between" gap="$4">
        <View style={{ width: 160, height: 200 }}>
          <VictoryPie
            data={chartData}
            colorScale={chartData.map((entry) => entry.color)}
            innerRadius={80}
            labelRadius={65}
            labelComponent={<VictoryTooltip />}
            padding={18}
            width={160}
            height={200}
          />
        </View>

        <YStack gap="$2" flex={1}>
          {chartData.map((entry, index) => (
            <XStack key={index} alignItems="center" gap="$2">
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: entry.color,
                  borderRadius: 999
                }}
              />
              <Text fontSize={12}>{entry.x}</Text>
            </XStack>
          ))}
        </YStack>
      </XStack>
    </Card>
  );
}
