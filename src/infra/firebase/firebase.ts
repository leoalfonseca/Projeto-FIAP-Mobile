import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, type Auth } from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

const extra = Constants.expoConfig?.extra || {};
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const firebaseConfig = {
  apiKey: extra.EXPO_PUBLIC_FB_API_KEY,
  authDomain: extra.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: extra.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: extra.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: extra.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: extra.EXPO_PUBLIC_FB_APP_ID
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

let auth: Auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: reactNativePersistence(AsyncStorage)
    });
  } catch {
    auth = getAuth(app);
  }
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
export const now = () => serverTimestamp();
