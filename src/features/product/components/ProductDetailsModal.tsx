import React from 'react';
import { Linking } from 'react-native';
import { Button, Paragraph, ScrollView, Separator, Text, XStack, YStack } from 'tamagui';

import FormatNumber from '@/components/FormatNumber/FormatNumber';

import { Modal } from '@/components/Modal/Modal';


import { ProductMediaList } from './ProductMediaList';

import { Product } from '../model/Product';

interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
}

export function ProductDetailsModal({ open, onClose, product }: ProductDetailsModalProps) {


  return (
    <Modal open={open} onClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false} padding="$4">
        <YStack gap="$4">
          {!!product?.image && (
            <ProductMediaList image={product.image} video={product.metaData?.video} />
          )}

          <Text fontWeight={'700'} fontSize={20}>
            {product?.name}
          </Text>

          <XStack justifyContent="space-between" flexWrap="wrap" gap="$4">
            <YStack flex={1} gap="$2">
              <XStack gap="$2" alignItems="center">
                <Text color={'$gray700'} fontSize={14}>
                  Nicho:
                </Text>
                <Text color={'$gray700'} fontWeight="800" fontSize={14}>
                  {product?.metaData?.niche}
                </Text>
              </XStack>

              <XStack gap="$2" alignItems="center">
                <Text color={'$gray700'} fontSize={14}>
                  Comissão Inicial:
                </Text>
                <Text color={'$gray700'} fontWeight="800" fontSize={14}>
                  {FormatNumber({
                    number: product?.metaData?.initialCommission || 0,
                    format: 'percent'
                  })}
                </Text>
              </XStack>

              <XStack gap="$2" alignItems="center">
                <Text color={'$gray700'} fontSize={14}>
                  Nível:
                </Text>
                <Text color={'$gray700'} fontWeight="800" fontSize={14}>
                </Text>
              </XStack>
              <XStack gap="$2" alignItems="center">
                <Text color={'$gray700'} fontSize={14}>
                  Data de lançamento:
                </Text>
                <Text fontWeight="600" color="green" fontSize={14}>
                  {product?.metaData?.releaseDate &&
                    new Date(product.metaData.releaseDate).toLocaleDateString()}
                </Text>
              </XStack>
            </YStack>

            <YStack flex={1} gap="$2" alignItems="flex-end">
              {!!product?.metaData?.salesPage && (
                <Text
                  color="$primary100"
                  textDecorationLine="underline"
                  onPress={() => Linking.openURL(product?.metaData?.salesPage ?? '')}
                >
                  Página de venda
                </Text>
              )}

              {!!product?.metaData?.payTLink && (
                <Text
                  color="$primary100"
                  textDecorationLine="underline"
                  onPress={() => Linking.openURL(product?.metaData?.payTLink ?? '')}
                >
                  Link PayT
                </Text>
              )}

              {!!product?.metaData?.b4Link && (
                <Text
                  color="$primary100"
                  textDecorationLine="underline"
                  onPress={() => Linking.openURL(product?.metaData?.b4Link ?? '')}
                >
                  Link B4You
                </Text>
              )}
            </YStack>
          </XStack>

          <Separator borderColor="$gray400" />

          {!!product?.description && <Paragraph>{product.description}</Paragraph>}

        
        </YStack>
      </ScrollView>
    </Modal>
  );
}
