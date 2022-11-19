// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCvnDZ1V1n3RONQB-uJvclzh60kR_CrLA8",
	authDomain: "einder-d0b2f.firebaseapp.com",
	projectId: "einder-d0b2f",
	storageBucket: "einder-d0b2f.appspot.com",
	messagingSenderId: "129962582303",
	appId: "1:129962582303:web:f8da3fdd30b67794f8902a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export { auth, db };
