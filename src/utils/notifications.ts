import Constants, { ExecutionEnvironment } from 'expo-constants';

let messaging: typeof import('@react-native-firebase/messaging').default | null = null;

if (
  Constants.executionEnvironment &&
  Constants.executionEnvironment !== ExecutionEnvironment.StoreClient
) {
  messaging = require('@react-native-firebase/messaging').default;
}

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token;

  if (!Device.isDevice) {
    console.log('Deve estar em um dispositivo físico');
    return;
  }

  // Verificar e solicitar permissões
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Permissão para notificações negada');
    return;
  }

  try {
    if (Platform.OS === 'ios') {
      await messaging?.().registerDeviceForRemoteMessages();
    }

    const fcmToken = messaging ? await messaging().getToken() : null;
    token = fcmToken;

    console.log('FCM Token:', token);
  } catch (error) {
    console.error('Erro ao obter token FCM:', error);
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }

  return token;
}

// Handler para exibir notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});
