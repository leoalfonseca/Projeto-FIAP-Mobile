import { useQuery } from '@tanstack/react-query';

import { ProductWithOffer } from '@/features/dashboard/model/ProductWithOffer';

export async function getProductsWithOffers(): Promise<ProductWithOffer[]> {
  
  return {} as ProductWithOffer[];
}

export function useProductsWithOffers() {
  return useQuery({
    queryKey: ['productsWithOffers'],
    queryFn: getProductsWithOffers
  });
}
