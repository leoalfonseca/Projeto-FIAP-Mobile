import { useQuery } from '@tanstack/react-query';


import { PaginationParametersDto } from '@/shared/model/PaginationParametersDto';

import { ProductPaginated } from '../model/ProductPaginated';

export async function getProducts(
  listProducts: PaginationParametersDto
): Promise<ProductPaginated> {
  try {
    const queryParams = new URLSearchParams({
      page: listProducts.page.toString(),
      limit: listProducts.limit.toString(),
      search: listProducts.search || '',
      isPublic: (listProducts.isPublic ?? false).toString()
    });

  
    return {} as ProductPaginated;
  } catch (error) {
    console.log('error', { error });

    return {} as ProductPaginated;
  }
}

export function useProducts(listProducts: PaginationParametersDto) {
  return useQuery({
    queryKey: ['products', JSON.stringify(listProducts)],
    queryFn: () => getProducts(listProducts)
  });
}
