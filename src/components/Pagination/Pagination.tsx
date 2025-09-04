import { MoveLeft, MoveRight } from '@tamagui/lucide-icons';
import { XStack, Text, Button } from 'tamagui';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
  return (
    <XStack justifyContent="space-around" alignItems="center" marginTop="$4">
      <Button
        onPress={() => setPage(page - 1)}
        disabled={page === 1}
        backgroundColor={'$primary400'}
      >
        <MoveLeft size={16} color={'$gray100'} />
      </Button>
      <Text fontSize={12} fontWeight="bold">
        Página {page} de {totalPages}
      </Text>

      <Button
        onPress={() => setPage(page + 1)}
        disabled={page === totalPages}
        backgroundColor={'$primary400'}
      >
        <MoveRight size={16} color={'$gray100'} />
      </Button>
    </XStack>
  );
}
