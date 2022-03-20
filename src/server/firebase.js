const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "drinkit-bc8d7.firebaseapp.com",
  projectId: "drinkit-bc8d7",
  storageBucket: "drinkit-bc8d7.appspot.com",
  messagingSenderId: "398508478954",
  appId: "1:398508478954:web:4985d271098d466efd2293",
};

const fireBaseApp = initializeApp(firebaseConfig);

module.exports = fireBaseApp;
