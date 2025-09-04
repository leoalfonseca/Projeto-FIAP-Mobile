import { Route, router, usePathname } from 'expo-router';

const headerRoutes = ['/perfil', '/ajuda', '/configuracoes'];

export function useHeaderNavigate() {
  const pathname = usePathname();

  function navigateFromHeader(target: Route, after?: () => void) {
    const alreadyInHeader = headerRoutes.includes(pathname);
    if (alreadyInHeader) {
      router.replace(target);
    } else {
      router.push(target);
    }
    after?.();
  }

  return { navigateFromHeader };
}
