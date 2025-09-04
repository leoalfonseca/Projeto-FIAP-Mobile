
import { XStack } from 'tamagui';


import { useDisclosure } from '@/shared/hooks/useDisclosure';

import { HeaderPopover } from './HeaderPopover';

import { ProfilePicture } from '../profile/ProfilePicture';

export function Header() {


  const { open, onOpen, onClose } = useDisclosure();

  return (
   
      <XStack alignItems="center" gap={4} onPress={onOpen} marginHorizontal={16}>
        <ProfilePicture onOpen={onOpen} />
        <HeaderPopover open={open} onOpen={onOpen} onClose={onClose} />
      </XStack>
  );
}
