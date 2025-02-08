import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { enableMultiTabIndexedDbPersistence, getDocs, getFirestore } from "firebase/firestore";
import { doc, collection, getDoc, addDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { GenreRatings, Interests, Author, User, Book } from "./user";
import { randomUUID } from "crypto";

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
    await setDoc(doc(db, 'writers', writerID), writerData)
}

export async function getWriterData(writerID: string): Promise<Author> {
    let docRef = await getDoc(doc(db, 'writers', writerID))
    if (!docRef.exists()) { return Promise.reject() }
    else { return (docRef.data() as Author) }
}

export async function getAllWriters() {
    return (await getDocs(collection(db, "writers"))).docs.map((doc) => ({ doc: doc.data(), id: doc.id}))
}

export async function updateMatchedAuthor(userID: string, writerID: string) {
    await updateDoc(doc(db, 'users', userID), {
        matchedAuthor: writerID,
        followers: arrayUnion(userID)
    })
}

export async function addStoryRequest(fromID: string, fromName: string, toID: string, request: string) {
    await updateDoc(doc(db, 'writers', toID), {
        queue: arrayUnion({
            id: randomUUID(),
            fromID: fromID,
            fromName: fromName,
            prompt: request
        })
    })
}

export async function getStoryRequests(writerID: string) {
    return (await getDoc(doc(db, 'writers', writerID))).data()?.queue ?? []
}

export async function pushBookToUser(userID: string, book: Book) {
    await updateDoc(doc(db, 'users', userID), {
        books: arrayUnion(book)
    })
}

export async function deleteRequest(authorID: string, queueID: string) {
    const docSnap = await getDoc(doc(db, 'writers', authorID));
    
    // Find the element to remove
    const arrayField = (docSnap.data() ?? {})["queue"]

    const elementToRemove = arrayField.find((item: { id: string; }) => item.id === queueID);
    
    await updateDoc(doc(db, 'writers', authorID), {
        queue: arrayRemove(elementToRemove)
    });
}