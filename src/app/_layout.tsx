import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '@/../tamagui.config';
import { registerForPushNotificationsAsync } from '@/utils/notifications';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('@/assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf')
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Theme name="will">
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
        </Theme>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
