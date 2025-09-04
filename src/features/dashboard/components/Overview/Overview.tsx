import { Text, XStack, YStack } from 'tamagui';

import { OverviewCard } from './Card';

import { OverviewChart } from './Chart';

import { PaymentsReceivedCard } from './PaymentsReceivedCard';

import { TypeInsightEnum } from '../../enum/TypeInsightEnum';
import { ResumeGroup, ResumeItem } from '../../model/ResumeItem';
import { OverviewSkeleton } from '../OverviewSkeleton';

interface OverviewProps {
  insights: ResumeGroup[];
  isLoading: boolean;
  backOffice: boolean;
  objId?: string;
  type?: string;
}

export function Overview({ insights, isLoading, backOffice, objId, type }: OverviewProps) {
  if (isLoading) {
    return <OverviewSkeleton />;
  }

  return (
    <YStack gap="$4">
      {insights.map((insightGroup, index) => (
        <YStack key={index} gap="$3">
          {!objId && (
            <XStack alignItems="center" marginBottom="$2">
              <Text fontSize={16} fontWeight="bold">
                {insightGroup.title}
              </Text>
            </XStack>
          )}

          <XStack flexWrap="wrap" gap="$2">
            {insightGroup.insights.map((item: ResumeItem) => {
              if (item.type === TypeInsightEnum.COMPARATIVE) {
                return <PaymentsReceivedCard data={item} key={item.id} />;
              }

              if (
                item.type === TypeInsightEnum.SIMPLE ||
                item.type === TypeInsightEnum.SIMPLE_WITH_AMOUNT
              ) {
                return (
                  <OverviewCard
                    key={item.id}
                    data={item}
                    backOffice={backOffice}
                    objId={objId || ''}
                    type={type || ''}
                  />
                );
              }

              if (item.type === TypeInsightEnum.CHART) {
                return <OverviewChart key={item.id} insight={item} />;
              }

              return null;
            })}
          </XStack>
        </YStack>
      ))}
    </YStack>
  );
}
