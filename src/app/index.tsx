import 'react-native-get-random-values';

import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login/page');
  }, [router]);

  return null;
}
