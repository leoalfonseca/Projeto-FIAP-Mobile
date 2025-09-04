'use client';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';

import { getClient } from '../clients/getClient';

const firebaseConfig = getClient().firebaseSettings;

let messaging: undefined | Messaging = undefined;

if (firebaseConfig) {
  const firebaseApp = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    messaging = getMessaging(firebaseApp);
  }
}

export { messaging, getToken, onMessage };
