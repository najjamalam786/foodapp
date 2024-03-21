
// import { getApp, getApps, initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDxME3h_6qgXWHG5QvaHde6HJZVP-7EIKg",
  authDomain: "fooddeliveryapp-4818c.firebaseapp.com",
  databaseURL: "https://fooddeliveryapp-4818c-default-rtdb.firebaseio.com",
  projectId: "fooddeliveryapp-4818c",
  storageBucket: "fooddeliveryapp-4818c.appspot.com",
  messagingSenderId: "833788459560",
  appId: "1:833788459560:web:74004faebbc2725567931d"
};

// Initialize Firebase
// const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// const firestore = getFirestore(app);
// const storage = getStorage(app);

// export {app, firestore, storage };

export const app = initializeApp(firebaseConfig); 