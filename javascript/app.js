// Initialize Firebase
$(document).ready(function () {
    console.log("ready!");

    console.log('test');
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

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
        var tName = snapshot.val().trainName;
        var tDest = snapshot.val().destination;
        var tFreq = snapshot.val().frequency;
        var tTime = snapshot.val().frequency;
        var tMinutes = snapshot.val().frequeny;

        //Time Clock
        const clock = document.getElementById('clock');

        function runningClock() {
            const now = moment();
            const timeClock = now.format('hh:mm:ss A');
            clock.textContent = timeClock;

        }
        setInterval(runningClock, 1000);
        runningClock();

        function A_Train() {
            const tFreqA = document.getElementById('A-Train_Frequency');
            var tFrequency = 1;
            tFreqA.textContent = tFrequency; 

            var firstTime = "03:30";
            
            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            console.log("first time: " + firstTimeConverted);

            // Current Time
            var now = moment();
            console.log("CURRENT TIME: " + moment(now).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % tFrequency;
            console.log(tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = tFrequency - tRemainder;
            const aTrainMinAway = document.getElementById('A-Train_Min-Away');
            aTrainMinAway.textContent = tMinutesTillTrain;

            // Next Train
            const aTrainNextArrival = doucment.getElementById('A-Train_Next-Arrival');
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            aTrainNextArrival.textContent = nextTrain.format("hh:mm");
        }

        A_Train()

// need to write the same function for Seattle Express


        //$('tbody').append(`<tr><td>${tName}<td><tr>`) **Dry code format
        $('tbody').append('<tr><td>' + tName + '</td><td>' + tDest + '</td><td>' + tFreq + '</td><td>' + tTime + '</td><td>' + tMinutes + '</td></tr>')

    });
});


