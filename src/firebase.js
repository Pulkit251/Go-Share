import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAlK_20KoGSEnzhX1zP__jSqFSRk-t3WaQ",
    authDomain: "go-share-1fc3e.firebaseapp.com",
    projectId: "go-share-1fc3e",
    storageBucket: "go-share-1fc3e.appspot.com",
    messagingSenderId: "1002871428831",
    appId: "1:1002871428831:web:260f21cdbfcd6d412bbb6a",
    measurementId: "G-HK2RZLE7H7"
  };

 firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  db.settings({ ignoreUndefinedProperties: true });


  export{db,storage,auth,provider};