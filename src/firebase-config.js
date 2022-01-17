import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAMhvesKGXk7z1UA3pJHj7mV9IWxdph9L8",
    authDomain: "mappoc-e3a48.firebaseapp.com",
    projectId: "mappoc-e3a48",
    storageBucket: "mappoc-e3a48.appspot.com",
    messagingSenderId: "665320040530",
    appId: "1:665320040530:web:53e2b954e6a3b3addb178b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);



export { storage, app, db };