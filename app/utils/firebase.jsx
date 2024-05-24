import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgTg4JYjLOZsmxtWASjgR2Iyhy4KxU0l4",
  authDomain: "code-smith-424018.firebaseapp.com",
  projectId: "code-smith-424018",
  storageBucket: "code-smith-424018.appspot.com",
  messagingSenderId: "562668987227",
  appId: "1:562668987227:web:6c5d5dbb0eca556727307e",
  measurementId: "G-3WXNSWTG2W"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

 
export { auth, googleProvider };
