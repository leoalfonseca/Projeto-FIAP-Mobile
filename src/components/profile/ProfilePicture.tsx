import { Pressable } from 'react-native';
import { Avatar, Text } from 'tamagui';

import { getUserInitials } from '@/shared/getUserInitials';

export function ProfilePicture({ onOpen }: { onOpen: () => void }) {
  return (
    <>
      <Pressable
        style={{
          padding: 7
        }}
        onPress={onOpen}
      >
        <Avatar circular size="$2">
          <>
            <Avatar.Image accessibilityLabel="Cam" source={require('../../assets/images/profile/user-1.jpg')} />
            <Avatar.Fallback justifyContent="center" alignItems="center">
              <Text color="$gray100" fontSize={10}>
                {getUserInitials('LAF')}
              </Text>
            </Avatar.Fallback>
          </>
        </Avatar>
      </Pressable>
    </>
  );
}
