import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyB5CI1SmQYBTa4SE9XrBbsXX7QpDsFUrlo",
    authDomain: "final-project-6d44e.firebaseapp.com",
    databaseURL: "https://final-project-6d44e.firebaseio.com",
    projectId: "final-project-6d44e",
    storageBucket: "final-project-6d44e.appspot.com",
    messagingSenderId: "237838470572",
    appId: "1:237838470572:web:1e8f7586aecd5bebdcfe09"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;