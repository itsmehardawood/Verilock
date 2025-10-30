
// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBfIme8ZAGW8wSTMjPkXG3dofDnWIc58QE",
//   authDomain: "cardnest-bc5f4.firebaseapp.com",
//   projectId: "cardnest-bc5f4",
//   storageBucket: "cardnest-bc5f4.firebasestorage.app",
//   messagingSenderId: "706687245488",
//   appId: "1:706687245488:web:edbfa35b251dcd7757af75",
//   measurementId: "G-64EM26JYS5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export { RecaptchaVerifier };




import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MSG_ID,
  appId:process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURE_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };

