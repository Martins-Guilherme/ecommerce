import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZ2Ztfp_DPFRaT5zzDlIsZZQonDXyy3mY',
  authDomain: 'club-ecommerce-43c3f.firebaseapp.com',
  projectId: 'club-ecommerce-43c3f',
  storageBucket: 'club-ecommerce-43c3f.firebasestorage.app',
  messagingSenderId: '482850871562',
  appId: '1:482850871562:web:cc3850f2f5b1a7fd3e02f3',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
