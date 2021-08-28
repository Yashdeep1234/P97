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

var username = localStorage.getItem("User");
var roomNAME = localStorage.getItem("Room_name");
function getData() {
    firebase.database().ref("/" + roomNAME).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();


function send() {
    var message = document.getElementById("Message").value;
    firebase.database().ref(roomNAME).push({
        like: 0,
        name: username,
        message: message
    })
}

function updateLike(msg) {
    var bID = msg;
    likes = document.getElementById(bID).value;
    updatedLIKES = Number(likes) + 1;
    firebase.database().ref(roomNAME).child(bID).update({
        like: updatedLIKES
    });
}