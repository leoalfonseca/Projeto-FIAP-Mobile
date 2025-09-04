import { ArrowLeft } from '@tamagui/lucide-icons';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { getTokens, XStack, Image, Text } from 'tamagui';

import { Header } from '@/components/layout/Header';

export function useGenericHeader(title: string) {
  const navigation = useNavigation();
  const tokens = getTokens();

  useEffect(() => {
    navigation.setOptions({
      title,
      headerTitleAlign: 'left',
      headerLeft: () => (
        <XStack alignItems="center" gap="$2">
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
            <ArrowLeft size="$2" color="$primary400" />
          </TouchableOpacity>
          <XStack alignItems="center" gap="$2">
            <Image source={require('@/assets/images/icon.png')} style={{ width: 60, height: 40 }} />
            <Text color="$primary400" fontWeight={300} textTransform="uppercase">
              affiliates
            </Text>
          </XStack>
        </XStack>
      ),
      headerRight: () => <Header />,
      headerStyle: {
        backgroundColor: tokens.color.$gray100.val
      },
      headerTintColor: 'white'
    });
  }, [navigation, title, tokens]);
}
