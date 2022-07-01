import firebase from "firebase";

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyBQdGm4yNWEm89LNRIjRNdJ2tY8OMIUZkg",
        authDomain: "facebook-messanger-43313.firebaseapp.com",
        projectId: "facebook-messanger-43313",
        storageBucket: "facebook-messanger-43313.appspot.com",
        messagingSenderId: "986732319825",
        appId: "1:986732319825:web:a93df6316305eb3ca51470",
        measurementId: "G-DKJXSB1HEH"
    }
);

const db = firebaseApp.firestore()

export { db };