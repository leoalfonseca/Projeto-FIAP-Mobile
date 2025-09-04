import { YStack, ScrollView, getTokens } from 'tamagui';

import { AverageTicketCard } from '../components/AverageTicketCard';
import { SalesCard } from '../components/SalesChart';

export function DashboardScreen() {

  return (
    <ScrollView
      style={{ padding: 16 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <YStack gap="$4">
        <SalesCard />

        <AverageTicketCard />


      </YStack>
    </ScrollView>
  );
}
