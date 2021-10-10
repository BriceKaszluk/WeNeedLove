// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRCV-4lEDJPTG197HOEDOOX_K1f3zQzQw",
  authDomain: "weneedlove.firebaseapp.com",
  projectId: "weneedlove",
  storageBucket: "weneedlove.appspot.com",
  messagingSenderId: "764719826365",
  appId: "1:764719826365:web:f2a9be2d7033b9a559bed4",
  measurementId: "G-WMRZ98WS3M"
};

const analytics = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}

export { analytics };