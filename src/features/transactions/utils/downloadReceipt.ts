// receipt-download.ts
import * as FileSystem from 'expo-file-system/legacy';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Alert, Linking, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

function getExtFromUrl(url: string) {
  const clean = url.split('?')[0];
  const m = clean.match(/\.(jpg|jpeg|png|heic|webp)$/i);
  return (m?.[1]?.toLowerCase() || 'jpg') as 'jpg' | 'jpeg' | 'png' | 'heic' | 'webp';
}

async function requestMediaPermission() {
  try {
    const r: any = await (MediaLibrary as any).requestPermissionsAsync?.({
      accessPrivileges: 'addOnly'
    } as any);
    if (r && typeof r.granted === 'boolean') return r;
  } catch {
    console.log('[receipt] requestPermissionsAsync(new) not supported -> falling back');
  }
  return (await MediaLibrary.requestPermissionsAsync()) as any;
}

export async function downloadReceipt(receiptUrl?: string) {
  try {
    if (!receiptUrl) {
      Toast.show({ type: 'info', text1: 'Este lançamento não tem recibo.' });
      return;
    }

    const ext = getExtFromUrl(receiptUrl);
    const localPath = FileSystem.cacheDirectory + `receipt_${Date.now()}.${ext}`;

    console.log('[receipt] downloading ->', receiptUrl);
    const { uri } = await FileSystem.downloadAsync(receiptUrl, localPath);
    console.log('[receipt] downloaded to', uri);

    console.log('[receipt] request media permission…');
    const perm: any = await requestMediaPermission();
    console.log('[receipt] permission result', perm);

    if (perm?.granted) {
      await MediaLibrary.saveToLibraryAsync(uri);
      Toast.show({ type: 'success', text1: 'Recibo salvo em Fotos ✅' });
      return;
    }

    if (Platform.OS === 'ios') {
      Alert.alert(
        'Permissão necessária',
        'Para salvar em Fotos, permita o acesso nas Configurações.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Abrir Ajustes', onPress: () => Linking.openSettings() }
        ]
      );
    }

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
      return;
    }

    Toast.show({
      type: 'info',
      text1: 'Recibo baixado',
      text2: 'Compartilhe o arquivo para salvar onde preferir.'
    });
  } catch (e: any) {
    const msg = String(e?.message || e);
    console.log('[receipt] error', e);
    if (msg.includes('PHPhotosErrorDomain') || msg.includes('3301')) {
      Toast.show({
        type: 'error',
        text1: 'Sem permissão para salvar nas Fotos',
        text2: 'Abra Ajustes > Privacidade > Fotos e permita o acesso.'
      });
      return;
    }
    Toast.show({ type: 'error', text1: 'Erro ao baixar recibo', text2: msg });
  }
}
