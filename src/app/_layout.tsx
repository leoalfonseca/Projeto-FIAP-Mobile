import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '@/../tamagui.config';
import { auth } from '@/infra/firebase/firebase';
import { registerForPushNotificationsAsync } from '@/utils/notifications';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login/page');
      }
    });
    return unsub;
  }, [router, segments]);

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
        <Theme name="fiap">
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
