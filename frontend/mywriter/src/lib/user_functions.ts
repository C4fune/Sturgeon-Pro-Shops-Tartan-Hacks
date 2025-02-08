import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { doc, collection, getDoc, addDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { GenreRatings, Interests, Author } from "./user";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0GbjYsCTJbMiR6JWf_WlsiuadUiNanAE",
    authDomain: "mywriter-22f57.firebaseapp.com",
    projectId: "mywriter-22f57",
    storageBucket: "mywriter-22f57.firebasestorage.app",
    messagingSenderId: "579849807458",
    appId: "1:579849807458:web:14119097e37a121fac933b",
    measurementId: "G-V6BTWWF490"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function register(userID: string, username: string) {
    await setDoc(doc(db, 'users', userID), {
        username: username,
        books: [],
    })
}

export async function addOnboardingData(userID: string, interests: Interests) {
    await updateDoc(doc(db, 'users', userID), {
        interests: interests,
        onboarding: true
    })
}

export async function getUserData(username: string) {
    return (await getDoc(doc(db, 'users', username))).data()
}

export async function addWriterOnboardingData(writerID: string, writerData: Author) {
    console.log(writerData)
    await setDoc(doc(db, 'writers', writerID), writerData)
}