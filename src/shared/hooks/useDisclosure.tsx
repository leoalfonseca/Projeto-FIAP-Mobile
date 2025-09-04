import { useCallback, useState } from 'react';

export function useDisclosure(initialState: boolean = false) {
  const [open, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { open, onOpen, onClose, onToggle };
}
