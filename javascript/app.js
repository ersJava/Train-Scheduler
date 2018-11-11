console.log("hello");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBmTwMkKg_ZjfyqNwnQP2oZddkGctcOYK4",
    authDomain: "train-scheduler-ec37c.firebaseapp.com",
    databaseURL: "https://train-scheduler-ec37c.firebaseio.com",
    projectId: "train-scheduler-ec37c",
    storageBucket: "train-scheduler-ec37c.appspot.com",
    messagingSenderId: "210757766884"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

//Initial Values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    //Grabbed values from text boxes
    trainName = $("#usr-train").val().trim();
    destination = $("#usr-des").val().trim();
    frequency = $("#usr-freq").val().trim();
    firstTrainTime = $("#usr-time").val().trim();

    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });
});

dataRef.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().joinDate);

    $("#full-member-list").append("<div class='well'><span class='Train-name'> " +
        childSnapshot.val().trainName +
        " </span><span class='Desination-name'> " + childSnapshot.val().destination +
        " </span><span class='Frequency-log'> " + childSnapshot.val().frequency +
        " </span><span class='First-log'> " + childSnapshot.val().firstTrainTime +
        " </span></div>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#Train-Name-display").text(snapshot.val().trainName);
    $("#Destination-display").text(snapshot.val().destination);
    $("#Frequency-display").text(snapshot.val().frequency);
    $("#Next-Arrival-display").text(snapshot.val().firstTrainTime);
  
});


// Basically just have the starter code and firebase set up. Will need to keep working on it :( 
