const firebaseConfig = {
      apiKey: "AIzaSyAPFTA246vQml-M7AckGmTKsImPA9l3lxw",
      authDomain: "kwitter-bdb32.firebaseapp.com",
      databaseURL: "https://kwitter-bdb32-default-rtdb.firebaseio.com",
      projectId: "kwitter-bdb32",
      storageBucket: "kwitter-bdb32.appspot.com",
      messagingSenderId: "164421058260",
      appId: "1:164421058260:web:9a17bcf4e9944258cc4541",
      measurementId: "G-NT4Q79SC5K"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

document.getElementById("Welcome_User").innerHTML = "Welcome " + localStorage.getItem("User");
getData();

function Addroom() {
      var roomname = document.getElementById("ROOM").value;
      firebase.database().ref("/").child(roomname).update(
            {
                  purpose: "Adding room name"
            }
      );
      localStorage.setItem("ROOM_Name", roomname);
      window.location = "kwitter_room.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room name : ", Room_names);
                  var htmlData = "";
                  htmlData = htmlData + '<div class="data" id=' + Room_names + ' onclick="goTochat(this.id)">' + "#" + Room_names + '</div> <hr>';
                  document.getElementById("output").innerHTML += htmlData;
                  //End code
            });
      });
}
getData();

function LogOut() {
      localStorage.removeItem("User");
      window.location = "index.html";
}

function goTochat(name) {
      localStorage.setItem("Room_name", name);
      window.location = "CHATroom.html"
}