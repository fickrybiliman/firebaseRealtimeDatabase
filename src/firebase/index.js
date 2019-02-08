import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAYunvTSe6AzgKxWpvJqBFC0gIlrvXoRtY",
  authDomain: "realtimedatabase-c0205.firebaseapp.com",
  databaseURL: "https://realtimedatabase-c0205.firebaseio.com",
  projectId: "realtimedatabase-c0205",
  storageBucket: "realtimedatabase-c0205.appspot.com",
  messagingSenderId: "798671693501"
};
firebase.initializeApp(config);

export default firebase;