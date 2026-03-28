import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA6Hg4GG3VH61cFVpF1w_p_7sDSzIfTmsM',
  authDomain: 'nivoa-320a4.firebaseapp.com',
  projectId: 'nivoa-320a4',
  storageBucket: 'nivoa-320a4.firebasestorage.app',
  messagingSenderId: '301437188082',
  appId: '1:301437188082:web:61b54b06bf2d79ca60dd6b',
  measurementId: 'G-5XE1SN4H2R'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

