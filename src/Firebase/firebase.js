// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, get, child } from 'firebase/database';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	getRedirectResult,
	signOut,
	GoogleAuthProvider,
	onAuthStateChanged,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const provider = new GoogleAuthProvider();

// Initialize the Database

const db = getDatabase(app);

export {
	app as firebase,
	ref,
	getDatabase,
	set,
	get,
	child,
	onValue,
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	getRedirectResult,
	signOut,
	GoogleAuthProvider,
	provider,
	onAuthStateChanged,
	db as default,
};
