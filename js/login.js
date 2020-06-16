require("dotenv").config();

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.P_ID,
  storageBucket: process.env.S_BUCKET,
  messagingSenderId: process.env.M_S_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.M_ID,
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

var db = firebase.firestore();
function signin() {
  var Email = document.getElementById("email");
  var Pass = document.getElementById("password");
  var dpass;
  var docRef = db.collection("Admin").doc(email.value);
  docRef.get().then(function (doc) {
    if (doc.exists) {
      dpass = doc.data().password;
      if (dpass == Pass.value) {
        firebase.auth().signInWithEmailAndPassword(Email.value, Pass.value);
        alert("Successfully Logged-in");
        window.location = "main.html";
      } else {
        alert("Check Email and Password first");
      }
    } else {
      console.log("No Document Exist....");
    }
  });
}
