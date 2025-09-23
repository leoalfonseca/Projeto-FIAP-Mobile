import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'FIAP',
  slug: 'FIAP',
  version: '1.0.0',
  orientation: 'portrait',
  owner: 'leoalfonseca',
  icon: './src/assets/images/logo_collapse.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  jsEngine: 'hermes',
  androidStatusBar: {
    barStyle: 'light-content',
    backgroundColor: '#131625'
  },
  extra: {
    EXPO_PUBLIC_FB_API_KEY: process.env.EXPO_PUBLIC_FB_API_KEY,
    EXPO_PUBLIC_FB_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
    EXPO_PUBLIC_FB_PROJECT_ID: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
    EXPO_PUBLIC_FB_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
    EXPO_PUBLIC_FB_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
    EXPO_PUBLIC_FB_APP_ID: process.env.EXPO_PUBLIC_FB_APP_ID,
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './src/assets/images/logo.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#131625'
      }
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/messaging',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
          infoPlist: {
            NSPhotoLibraryAddUsageDescription: 'Precisamos salvar seus recibos na Galeria.'
          }
        }
      }
    ],
    [
      'expo-notifications',
      {
        icon: './src/assets/images/apple-icon.png'
      }
    ],
    'expo-font',
    'expo-web-browser',
    'expo-secure-store'
  ],
  experiments: {
    typedRoutes: true
  }
});
