// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPdhhQimSVJ6gbLd_AkVj1WIsakRVo5Ps",
  authDomain: "manufacturer-website-5d7b0.firebaseapp.com",
  projectId: "manufacturer-website-5d7b0",
  storageBucket: "manufacturer-website-5d7b0.appspot.com",
  messagingSenderId: "21654804170",
  appId: "1:21654804170:web:8d266dedf31561a7398633",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
