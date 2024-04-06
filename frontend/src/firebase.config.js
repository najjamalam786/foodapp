
// import { getApp, getApps, initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://fooddeliveryapp-4818c-default-rtdb.firebaseio.com",
  projectId: "fooddeliveryapp-4818c",
  storageBucket: "fooddeliveryapp-4818c.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
// const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// const firestore = getFirestore(app);
// const storage = getStorage(app);

// export {app, firestore, storage };

export const app = initializeApp(firebaseConfig); 