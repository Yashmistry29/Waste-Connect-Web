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

var secondaryAppConfig = {
  apiKey: process.env.API_KEY_2,
  authDomain: process.env.AUTH_DOMAIN_2,
  databaseURL: process.env.DB_URL_2,
  projectId: process.env.P_ID_2,
  storageBucket: process.env.S_BUCKET_2,
  messagingSenderId: process.env.M_S_ID_2,
  appId: process.env.APP_ID_2,
  measurementId: process.env.M_ID_2,
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

var secondaryApp = firebase.initializeApp(secondaryAppConfig, "secondary");

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      alert("logout Successfully");
    })
    .catch(function (error) {
      // An error happened.
      alert(Error);
    });
}

var db = secondaryApp.database();

let wastetype;
let wasterange;
let name;
let add1;
let add2;
let pin;
let city;
let status;

db.ref("users").on("value", function (getdata) {
  console.log(getdata.val());
  let user = getdata.val();

  let keys = Object.keys(user);
  //console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var order = user[k].orders;
    let okeys = Object.keys(order);
    //console.log(okeys);
    for (var j = 0; j < okeys.length; j++) {
      var ok = okeys[j];
      wastetype = order[ok].WasteType;
      wasterange = order[ok].WasteRange;
      add1 = order[ok].AddFirstLine;
      add2 = order[ok].AddSecondLine;
      pin = order[ok].Postal;
      city = order[ok].City;
      status = order[ok].requestStatus;
      var f = 0;
      //console.log(wastetype,wasterange,pin);
      if (status == false || status == "False") {
        f = 1;
        var test = `
                  <div id="get-card">
                  <div id="info">
                    <button class="btn" onclick = closecard()><!i class="fa fa-close" style="color: white;"></i></button>
                    <div class="textmain" id="wastetype">Waste Type: ${wastetype}</div>
                    <div class="textmain" id="wasterange">Waste Range: ${wasterange}</div>
                    <div class="textmain" id="name">UserID: ${k}</div>
                    <div class="textmain" id="add1">Address Line: ${add1} </div>
                    <div class="textmain" id="add2">Address Line 2: ${add2}</div>
                    <div class="textmain" id="pin">Pincode: ${pin}</div>
                    <div class="textmain" id="mob">City.: ${city}</div>
                    <button class="smsbtn" onclick="sendmessage()" id="sms"><a class="example_c" >Send  Message</a></button>
                  </div>
                  </div>`;
        document.getElementById("add-to").innerHTML += test;
      }
      if (f == 1) {
        var statusdata = {
          WasteType: wastetype,
          WasteRange: wasterange,
          AddFirstLine: add1,
          AddSecondLine: add2,
          City: city,
          Postal: pin,
          requestStatus: true,
        };
        var updates = {};
        updates["/users/" + k + "/orders/" + ok + "/"] = statusdata;
        db.ref().update(updates);
      }
    }
  }
});

function sendmessage() {
  let dlist = [
    "Ramesh Patel",
    "Sachin Rajput",
    "Pintu Medha",
    "Anand Raipal",
    "Sushant Bhagat",
    "Piyush Khatri",
  ];
  alert(" Send Message To " + dlist[Math.floor(Math.random() * dlist.length)]);
}

function closecard() {
  var deletecard = document.getElementById("get-card");
  deletecard.parentNode.removeChild(deletecard);
}
