// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpV4sTgwVzswp5bVzb43ZNdNb_sdWdi2o",
  authDomain: "handwriting-dataset.firebaseapp.com",
  projectId: "handwriting-dataset",
  storageBucket: "handwriting-dataset.appspot.com",
  messagingSenderId: "298577631221",
  appId: "1:298577631221:web:809f9650e8c364df61b2bc",
  measurementId: "G-RKGTNCFZS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;