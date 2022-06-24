import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, deleteDoc, setDoc, updateDoc, getDoc, getDocs, arrayUnion, arrayRemove, onSnapshot, query, orderBy, limit, where, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, deleteUser, setPersistence, browserSessionPersistence, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBLz1uBoRIWVqcTPt6NwLl31gQUUAMVfR8",
  authDomain: "product-feedback-app-b98f2.firebaseapp.com",
  projectId: "product-feedback-app-b98f2",
  storageBucket: "product-feedback-app-b98f2.appspot.com",
  messagingSenderId: "143179462489",
  appId: "1:143179462489:web:a9eec0082fb143bf133e48"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, db, getFirestore, collection, doc, addDoc, deleteDoc, setDoc, updateDoc, getDoc, getDocs, arrayUnion, arrayRemove, onSnapshot, query, orderBy, limit, where, Timestamp, getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, deleteUser, setPersistence, browserSessionPersistence, facebookProvider, googleProvider, githubProvider }