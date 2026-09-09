import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC72sYBqWf8AmikKObx9roSIopzoUz3ALs",
  authDomain: "task-manger-springboot.firebaseapp.com",
  projectId: "task-manger-springboot",
  storageBucket: "task-manger-springboot.firebasestorage.app",
  messagingSenderId: "833077800638",
  appId: "1:833077800638:web:e42f11b7052011586ef8ef",
  measurementId: "G-PWJ5RD9N5Z"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);

export default app;