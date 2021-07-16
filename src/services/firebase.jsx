import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAoxaX_GytpDE6qTORTYR--9iZ1MxUCeAw",
    authDomain: "ibl-logs.firebaseapp.com",
    projectId: "ibl-logs",
    storageBucket: "ibl-logs.appspot.com",
    messagingSenderId: "233609573991",
    appId: "1:233609573991:web:62335456188a4c12f746c2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

