import React from 'react';
import { Button, Dialog, ScrollView, Text, XStack } from 'tamagui';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  closeable?: boolean;
  children?: React.ReactNode;
}

export function Modal({ open, onClose, title, closeable, children }: ModalProps) {
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
            paddingVertical={0}
            paddingHorizontal={0}
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
              {closeable && (
                <Button
                  size="$2"
                  circular
                  onPress={onClose}
                  backgroundColor="$gray200"
                  hoverStyle={{ backgroundColor: '$gray300' }}
                >
                  <Text fontSize={16} color="$gray700">
                    X
                  </Text>
                </Button>
              )}
            </XStack>

            {/* Dica: Se for criar um modal  e tiver erro no $9, tira o Dialog.title, ele buga nessa versão do Tamagui */}
            <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
          </Dialog.Content>
        </Dialog.FocusScope>
      </Dialog.Portal>
    </Dialog>
  );
}
