// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';
import { getStorage, FirebaseStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAvWRqRzck1TtltyFkBsrg2u-0-df7PLQ4",
    authDomain: "barber-shop-81297.firebaseapp.com",
    databaseURL: "https://barber-shop-81297-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "barber-shop-81297",
    storageBucket: "barber-shop-81297.firebasestorage.app",
    messagingSenderId: "147643373144",
    appId: "1:147643373144:web:541ec60c25ac572f121c2d",
    measurementId: "G-GMPLWKY5S3"
  };

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Database = getDatabase(app);
export const storage: FirebaseStorage = getStorage(app);