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
var f = 0;

function signup() {
  var Email = document.getElementById("email");
  var Pass = document.getElementById("password");
  var repass = document.getElementById("repassword");
  if (Pass.value == repass.value) {
    const newuser = firebase
      .auth()
      .createUserWithEmailAndPassword(Email.value, Pass.value);
    alert("Account Created Successfully");
    f = 1;
  } else {
    alert("Password Mismatch");
    document.getElementById("password").reset();
    document.getElementById("repassword").reset();
  }

  if (f == 1) {
    db.collection("Admin")
      .doc(Email.value)
      .set({
        name: document.getElementById("uname").value,
        address: document.getElementById("Address").value,
        mobile: document.getElementById("mobile").value,
        password: Pass.value,
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    console.log("Data entered Successfully");
  }
}
