// AverageTicketCard.native.tsx (mockado)
import { AlertCircle } from '@tamagui/lucide-icons';
import React, { useMemo, useState, useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';
import { YStack, XStack, Text, getTokens, Tooltip as TmTooltip, Card, Button } from 'tamagui';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory-native';

import { InsightFilterEnum } from '../enum/InsightFilterEnum';

type ChartPoint = { label: string; value: number };
type InlineComparative = {
  id: string | number;
  title: string;
  amount: number;
  compareAmount: number;
  diff: number;
  percentage: number;
  chart: { data: ChartPoint[] };
};

const MOCK_INSIGHTS: InlineComparative[] = [
  {
    id: InsightFilterEnum.TODAY,
    title: 'Dia',
    amount: 178.45,
    compareAmount: 165.2,
    diff: 13.25,
    percentage: 8.02,
    chart: {
      data: [
        { label: '08:00', value: 150 },
        { label: '10:00', value: 165 },
        { label: '12:00', value: 180 },
        { label: '14:00', value: 175 },
        { label: '16:00', value: 185 },
        { label: '18:00', value: 210 }
      ]
    }
  },
  {
    id: InsightFilterEnum.WEEK,
    title: 'Semana',
    amount: 192.31,
    compareAmount: 186.9,
    diff: 5.41,
    percentage: 2.89,
    chart: {
      data: [
        { label: 'Seg', value: 180 },
        { label: 'Ter', value: 195 },
        { label: 'Qua', value: 190 },
        { label: 'Qui', value: 198 },
        { label: 'Sex', value: 205 },
        { label: 'Sáb', value: 176 },
        { label: 'Dom', value: 164 }
      ]
    }
  },
  {
    id: InsightFilterEnum.MONTH,
    title: 'Mês',
    amount: 205.77,
    compareAmount: 199.16,
    diff: 6.61,
    percentage: 3.32,
    chart: {
      data: [
        { label: '01', value: 180 },
        { label: '05', value: 190 },
        { label: '10', value: 200 },
        { label: '15', value: 210 },
        { label: '20', value: 205 },
        { label: '25', value: 215 },
        { label: '30', value: 225 }
      ]
    }
  }
];

const mockedUpdateTime = new Date().toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit'
});

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n ?? 0);

export function AverageTicketCard({
  height = 350,
  chartHeight = 205
}: {
  height?: number;
  chartHeight?: number;
}) {
  const tokens = getTokens();
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [active, setActive] = useState<string | number>(MOCK_INSIGHTS[0].id);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  }, []);

  const insights = MOCK_INSIGHTS;
  const updateTime = mockedUpdateTime;

  const filtered = useMemo<InlineComparative>(() => {
    return insights.find((i) => i.id === active) ?? insights[0];
  }, [insights, active]);

  const data = useMemo(
    () =>
      (filtered.chart?.data ?? []).map((d) => ({
        x: d.label,
        y: Number(d.value) || 0
      })),
    [filtered]
  );

  const primary = tokens.color.$red400.val;
  const trendColor = tokens.color.$red400.val;

  return (
    <Card height={height} padding="$4" backgroundColor="$color1" width="100%">
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
        <XStack alignItems="center" gap="$2">
          <XStack>
            <Text fontWeight="700">Ticket Médio</Text>
          </XStack>
          <TmTooltip placement="top">
            <XStack alignItems="center">
              <AlertCircle size={16} color={tokens.color.$gray500.val} />
            </XStack>
          </TmTooltip>
        </XStack>

        <XStack gap="$1">
          {insights.map((i) => {
            const isActive = active === i.id;
            return (
              <Button
                key={String(i.id)}
                size="$1"
                paddingHorizontal="$2"
                backgroundColor={isActive ? '$color3' : 'transparent'}
                color={isActive ? '$primary400' : '$gray8'}
                fontWeight="700"
                onPress={() => setActive(i.id)}
              >
                {i.title}
              </Button>
            );
          })}
        </XStack>
      </XStack>

      <XStack justifyContent="space-between" alignItems="center" marginVertical="$3" gap="$2">
        <XStack alignItems="center" gap="$2">
          <Text fontSize={18} fontWeight="800" color={tokens.color.$primary400.val}>
            {formatCurrency(filtered.amount)}
          </Text>
          <XStack
            backgroundColor="$color3"
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius={8}
          >
            <Text fontWeight="700" color={trendColor} fontSize={12}>
              {filtered.percentage >= 0 ? '+' : ''}
              {filtered.percentage.toFixed(2)}%
            </Text>
          </XStack>
          <Text fontWeight="700" color={trendColor}>
            {filtered.diff >= 0 ? '+' : '–'} {formatCurrency(Math.abs(filtered.diff))}
          </Text>
        </XStack>
      </XStack>

      <YStack marginTop="$3" height={chartHeight} onLayout={handleLayout} overflow="hidden">
        {containerWidth > 0 && (
          <Svg width={containerWidth} height={chartHeight}>
            <Defs>
              <LinearGradient id="avgTicketGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={primary} stopOpacity={0.3} />
                <Stop offset="1" stopColor={primary} stopOpacity={0.05} />
              </LinearGradient>
            </Defs>

            <VictoryChart
              width={containerWidth}
              height={chartHeight}
              padding={{ top: 10, bottom: 40, left: 45, right: 24 }}
              domainPadding={{ x: 18, y: [8, 16] }}
              standalone={false}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) =>
                    `${typeof datum.x === 'string' ? datum.x : ''}\n${formatCurrency(
                      Number(datum.y)
                    )}`
                  }
                  labelComponent={
                    <VictoryTooltip
                      renderInPortal={false}
                      flyoutStyle={{
                        fill: tokens.color.$primary100.val,
                        stroke: tokens.color.$primary200.val
                      }}
                      cornerRadius={6}
                      flyoutPadding={{ top: 8, bottom: 8, left: 10, right: 10 }}
                    />
                  }
                />
              }
            >
              <VictoryAxis
                style={{
                  axis: { stroke: 'transparent' },
                  ticks: { stroke: 'transparent' },
                  tickLabels: { fill: tokens.color.$gray900.val, fontSize: 10 }
                }}
                tickFormat={(t) => (typeof t === 'string' ? t.slice(0, 3) : t)}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: 'transparent' },
                  grid: { stroke: tokens.color.$gray300.val, strokeDasharray: '3,3' },
                  tickLabels: { fill: tokens.color.$gray900.val, fontSize: 10 }
                }}
              />

              <VictoryArea
                interpolation="natural"
                animate={false}
                data={data}
                x="x"
                y="y"
                style={{
                  data: { stroke: primary, strokeWidth: 2, fill: 'url(#avgTicketGradient)' }
                }}
              />

            
            </VictoryChart>
          </Svg>
        )}
      </YStack>

    
    </Card>
  );
}
