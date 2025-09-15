import { useMutation } from '@/infra/reactQuery/useMutation';

export async function deleteProduct(id: string): Promise<void> {
  return;
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    invalidKeys: [{ key: ['products'], exact: false }]
  })();
}
