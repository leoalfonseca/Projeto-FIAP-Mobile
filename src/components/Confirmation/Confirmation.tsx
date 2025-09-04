import React from 'react';
import { Button, Dialog, ScrollView, Text, XStack } from 'tamagui';

interface ConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  body?: string;
  confirm?: {
    text: string;
    colorPalette: string;
  };
}

export function Confirmation({
  open,
  onClose,
  onConfirm,
  title,
  body,
  confirm
}: ConfirmationProps) {
  return (
    <Dialog open={open} onOpenChange={onClose} modal>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          backgroundColor="rgba(0,0,0,0.5)"
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          onPress={onClose}
        />

        <Dialog.FocusScope focusOnMount>
          <Dialog.Content
            bordered
            paddingVertical={20}
            paddingHorizontal={20}
            gap={16}
            width="90%"
            maxWidth={400}
            alignSelf="center"
            justifyContent="center"
            marginTop={0}
            key="content"
            animateOnly={['transform', 'opacity']}
            animation="quick"
            enterStyle={{ x: 0, y: 20, opacity: 0 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          >
            <XStack justifyContent="space-between" alignItems="center" width="100%">
              {title && (
                <Text fontWeight={'700'} fontSize={20}>
                  {title}
                </Text>
              )}
              <Button
                size="$2"
                circular
                onPress={onClose}
                hoverStyle={{ backgroundColor: '$gray300' }}
              >
                <Text fontSize={16} color="$gray700">
                  X
                </Text>
              </Button>
            </XStack>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text fontSize={16} fontWeight="400" marginVertical={16}>
                {body}
              </Text>
            </ScrollView>
            <XStack justifyContent="flex-end" padding="$3" gap="$6">
              <Button onPress={onClose} backgroundColor={confirm?.colorPalette}>
                <Text color="white">Cancelar</Text>
              </Button>
              <Button onPress={onConfirm} backgroundColor={confirm?.colorPalette}>
                <Text color="white">{confirm?.text}</Text>
              </Button>
            </XStack>
          </Dialog.Content>
        </Dialog.FocusScope>
      </Dialog.Portal>
    </Dialog>
  );
}
