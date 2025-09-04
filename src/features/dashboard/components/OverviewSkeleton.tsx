import { YStack } from 'tamagui';

import { Skeleton } from '@/components/Skeleton/Skeleton';

export function OverviewSkeleton() {
  return (
    <YStack gap={16}>
      {[...Array(7)].map((_, i) => (
        <YStack
          key={i}
          padding="$4"
          borderWidth={1}
          borderColor="$gray5"
          borderRadius={8}
          width="100%"
          backgroundColor="$background"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.1}
          shadowRadius={2}
          gap={12}
        >
          <Skeleton width={48} height={48} rounded />
          <Skeleton width={180} height={20} />
          <Skeleton width={100} height={16} />
        </YStack>
      ))}
    </YStack>
  );
}
