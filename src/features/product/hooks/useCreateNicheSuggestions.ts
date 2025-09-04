import { useMutation } from '@tanstack/react-query';

import { CreateNicheSuggestionsDto } from '../model/CreateNicheSuggestionsDto';

export async function createNicheSuggestions(body: CreateNicheSuggestionsDto): Promise<void> {
  return;
}

export function useCreateNicheSuggestions() {
  return useMutation({
    mutationFn: createNicheSuggestions
  });
}
