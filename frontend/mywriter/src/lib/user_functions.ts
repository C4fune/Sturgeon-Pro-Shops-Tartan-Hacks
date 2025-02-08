import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { enableMultiTabIndexedDbPersistence, getDocs, getFirestore } from "firebase/firestore";
import { doc, collection, getDoc, addDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { GenreRatings, Interests, Author, User } from "./user";

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

export async function matchUserWithWriter(userID: string) {
    let prompt = "There is a user and some writers. We want to match the user with a writer who suits their needs best. Here is information about the user we want to match with a writer:\n"
    
    let user = (await getDoc(doc(db, 'users', userID))).data() as User
    for (const genre in user.interests.genres) {
        prompt += `\nThe user rated the genre \"${genre}\" a ${(user.interests.genres as any)[genre]} out of 10.`
    }

    prompt += `\n\nThe user rated an excerpt from a thriller that used heart-felt romantic language a ${user.interests.writingOneScore} out of 10.`
    prompt += `\nThe user rated an excerpt from a horror story that used strong, simple language in the style of Albert Camus, especially The Stranger, a ${user.interests.writingTwoScore} out of 10.`
    prompt += `\nThe user rated an excerpt from an adventure novel, using very detailed language in the style of  George R. R. Martin a ${user.interests.writingThreeScore} out of 10.`
    prompt += `\nThe user rated an excerpt from a sci-fi novel that using slightly ominous language in the style of Frank Herbert in the book Dune a ${user.interests.writingFourScore} out of 10.`

    if (user.interests.custom != "") {
        prompt += `\nWhen prompted to say something about themselves or the style of books they prefer, they said: \"${user.interests.custom}\"`
    }

    prompt += `\n\nHere are each of the writers they could be matched with:\n`

    let authorCounter = 1
    const writerQuery = await getDocs(collection(db, "writers"));
    const writers: any = []
    writerQuery.forEach((doc) => {
        let author = doc.data() as Author

        prompt += `\n\nAuthor ${authorCounter}:`
        writers[authorCounter] = { name: author.name, id: doc.id }
        authorCounter += 1

        for (const genre in author.genres) {
            prompt += `\nThis author rated the genre \"${genre}\" a ${(author.genres as any)[genre]} out of 10.`
        }
        for (const sample of author.samples) {
            prompt += `\nHere is one sample of the author's work:\n`
            prompt += sample
        }
        if (author.style != "") {
            prompt += `\nWhen prompted to say something about their style, the author said: \"${author.style}\"`
        }
    });

    prompt += `\n\nWith all of the information about the user and the possible authors, who matches the best with the user? Please respond using ONLY a single number representing the best author.`

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
    });

    const data = await res.json();
    const assistantReply = data.choices?.[0]?.message?.content || "OUT OF API CALLS";

    console.log(prompt)
    console.log(assistantReply)

    const matchedAuthor = writers[parseInt(assistantReply)]

    await updateDoc(doc(db, 'users', userID), {
        matchedAuthor: matchedAuthor.id
    })

    return matchedAuthor;
}