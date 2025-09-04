import { GetThemeValueForKey, getTokens } from '@tamagui/core';
import { Tabs } from 'expo-router';

import { Image, XStack, Text } from 'tamagui';

import { Header } from '@/components/layout/Header';
import { MenuItems } from '@/components/layout/MenuItems';

export function Footer() {
  const tokens = getTokens();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tokens.color.$primary100.val,
          borderTopWidth: 0,
          height: 60,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 100,
          marginHorizontal: 10,
          marginBottom: 16,
          position: 'absolute',
          elevation: 5,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4
        },
        tabBarActiveTintColor: tokens.color.$primary500.val,
        tabBarInactiveTintColor: 'white'
      }}
    >
      {MenuItems.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerTitle: () => (
              <XStack alignItems="center" gap="$2">
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={{ width: 100, height: 20 }}
                />
               
              </XStack>
            ),
            headerTitleAlign: 'left',
            headerRight: () => Header(),
            headerStyle: {
              backgroundColor: tokens.color.$gray100.val
            },
            headerTintColor: '#fff',
            tabBarIcon: ({ color, size }) => (
              <Icon color={color as GetThemeValueForKey<'color'>} size={size ?? 22} />
            )
          }}
        />
      ))}
    </Tabs>
  );
}
