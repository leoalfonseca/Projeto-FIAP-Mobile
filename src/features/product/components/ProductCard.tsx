import { Image as ImageIcon, Lock } from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';
import { YStack, Text, XStack, Image } from 'tamagui';

import { Product } from '../model/Product';

interface ProductCardProps {
  product: Product;
  isBlocked: boolean;
  onPressBlocked?: () => void;
  onPressDetails?: () => void;
}

export function ProductCard({
  product,
  isBlocked,
  onPressBlocked,
  onPressDetails
}: ProductCardProps) {
  return (
    <YStack
      padding="$4"
      marginBottom="$2"
      backgroundColor="white"
      gap={6}
      position="relative"
      borderRadius={10}
      onPress={onPressDetails}
    >
      <YStack justifyContent="space-between" gap={10} height={200}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={{
              width: 200,
              height: 120,
              borderRadius: 6,
              alignSelf: 'center',
              opacity: isBlocked ? 0.3 : 1
            }}
            resizeMode="cover"
          />
        ) : (
          <ImageIcon size={100} color="#ccc" alignSelf="center" />
        )}

        <XStack justifyContent="space-between" alignItems="center">
          <YStack gap={10}>
            <Text fontSize={16} fontWeight="500" color={isBlocked ? '$gray600' : '$color'}>
              {product?.name}
            </Text>

            <Pressable onPress={onPressDetails}>
              <Text
                fontSize={16}
                fontWeight="600"
                color={isBlocked ? '$gray500' : '$primary500'}
                opacity={isBlocked ? 0.6 : 1}
              >
                Detalhe
              </Text>
            </Pressable>
          </YStack>
        </XStack>
      </YStack>

      {isBlocked && (
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 400,
            height: 235,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 6,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={onPressBlocked}
        >
          <YStack alignItems="center" gap="$1">
            <Lock color="white" size={32} />
            <Text color="white" fontWeight="600" fontSize={14}>
              Produto Bloqueado
            </Text>
          </YStack>
        </Pressable>
      )}
    </YStack>
  );
}
