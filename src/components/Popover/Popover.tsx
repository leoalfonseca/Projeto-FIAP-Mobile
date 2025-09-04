import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useEffect } from 'react';
import { Pressable, StyleSheet, BackHandler } from 'react-native';
import { Button, Popover, Portal, YStack } from 'tamagui';

interface PopoverProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  size?: number | string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  closeOnOutsidePress?: boolean;
}

export function PopOver({
  trigger,
  children,
  size = '$5',
  open,
  onOpen,
  onClose,
  closeOnOutsidePress = true
}: PopoverProps) {
  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [open, onClose]);

  return (
    <>
      {open && closeOnOutsidePress && (
        <Portal>
          <Pressable
            style={[StyleSheet.absoluteFill, { zIndex: 999, backgroundColor: 'transparent' }]}
            onPress={onClose}
          />
        </Portal>
      )}

      <Popover
        size={size}
        allowFlip
        stayInFrame
        resize
        open={open}
        onOpenChange={(isOpen) => (isOpen ? onOpen() : onClose())}
      >
        <Popover.Trigger asChild>
          {trigger ? (
            trigger
          ) : (
            <Button
              backgroundColor="transparent"
              borderWidth={0}
              color="$gray900"
              size="$1"
              hoverStyle={{ backgroundColor: 'transparent' }}
              pressStyle={{ backgroundColor: 'transparent' }}
              icon={open ? ChevronUp : ChevronDown}
            />
          )}
        </Popover.Trigger>

        <Popover.Content
          borderWidth={1}
          borderColor="$gray400"
          width={200}
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          padding="$4"
          alignItems="flex-start"
          justifyContent="flex-start"
          // garante que fique acima do overlay
          zIndex={1000}
          elevation="$3"
          animation={[
            'quick',
            {
              opacity: { overshootClamping: true }
            }
          ]}
        >
          <Popover.Arrow borderWidth={1} borderColor="$gray400" />
          {/* envolver em YStack/Pressable evita "vazar" toque pro overlay */}
          <YStack onPress={() => {}}>{children}</YStack>
        </Popover.Content>
      </Popover>
    </>
  );
}
