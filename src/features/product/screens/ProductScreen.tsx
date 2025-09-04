import { useCallback, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { YStack, Spinner, Text, View, getTokens, Button, XStack } from 'tamagui';

import { useProfileMe } from '@/features/dashboard/hooks/useProfileMe';

import { useDisclosure } from '@/shared/hooks/useDisclosure';

import { NicheModal } from '../components/NicheModal';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { useProducts } from '../hooks/useProduct';
import { Product } from '../model/Product';

export interface ProductScreenProps {
  backOffice: boolean;
}

export function ProductScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filters] = useState({});
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const tokens = getTokens();

  const {
    data: reports,
    isLoading,
    isFetching,
    refetch
  } = useProducts({ page: 1, limit: 50, ...filters });

  const { data: profile, isLoading: isLoadingProfile } = useProfileMe();

  const { open, onOpen, onClose } = useDisclosure();

  const {
    open: openProductDetails,
    onOpen: onOpenProductDetails,
    onClose: onCloseProductDetails
  } = useDisclosure();

  const {
    open: openAccessBlocked,
    onOpen: onOpenAccessBlocked,
    onClose: onCloseAccessBlocked
  } = useDisclosure();

  function handleOpenDetails(isBlocked: boolean, product: Product) {
    if (!isBlocked) {
      setSelectedProduct(product);
      onOpenProductDetails();
    }
  }

  

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (isLoading || isLoadingProfile) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  return (
    <YStack
      flex={1}
      paddingHorizontal="$4"
      paddingTop="$3"
      paddingBottom="$5"
      backgroundColor={tokens.color.$primary50.val}
    >
      <View flex={1} marginBottom="$2" gap="$6">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={20} fontWeight="800" color="$primary400">
            Galeria de Produtos
          </Text>

          <Button
            backgroundColor={'$primary200'}
            disabled={isLoading}
            onPress={onOpen}
            alignSelf="flex-end"
          >
            {isLoading ? (
              <Spinner size={'small'} />
            ) : (
              <Text fontWeight="bold" color="$gray100">
                Sugerir Nicho
              </Text>
            )}
          </Button>
        </XStack>

        {!reports?.data?.length ? (
          <Text fontSize={14} color="black">
            Nenhum pedido encontrado.
          </Text>
        ) : (
          <FlatList
            data={reports?.data || []}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => {
              const level = profile?.levels.find(
                (lvl) => lvl.level === item.metaData?.affiliationRules
              );
              const isBlocked = level ? !level.unlocked : true;

              return (
                <ProductCard
                  product={item}
                  isBlocked={isBlocked}
                  onPressDetails={() => handleOpenDetails(isBlocked, item as Product)}
                />
              );
            }}
            ListFooterComponent={isFetching ? <Spinner /> : null}
            contentContainerStyle={{ paddingBottom: 16 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={20}
              />
            }
          />
        )}
      </View>

      <NicheModal open={open} onClose={onClose} />

      <ProductDetailsModal
        open={openProductDetails}
        onClose={onCloseProductDetails}
        product={selectedProduct}
      />

    
    </YStack>
  );
}
