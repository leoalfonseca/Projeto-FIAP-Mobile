import { LogOut } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { Button, YStack } from 'tamagui';

import { PopOver } from '../Popover/Popover';

interface HeaderPopoverProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function HeaderPopover({ open, onOpen, onClose }: HeaderPopoverProps) {
  async function handleLogout() {
    router.replace('/login/page');

    onClose();
  }
  return (
    <PopOver open={open} onOpen={onOpen} onClose={onClose}>
      <YStack alignItems="flex-start" gap={8}>
        <Button icon={<LogOut />} size={36} color={'$gray800'} onPress={handleLogout}>
          Sair
        </Button>
      </YStack>
    </PopOver>
  );
}
