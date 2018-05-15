// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_BOiijKJRM_Eh96SnoU8ASVPW7iYdVZE",
    authDomain: "trains-ff422.firebaseapp.com",
    databaseURL: "https://trains-ff422.firebaseio.com",
    projectId: "trains-ff422",
    storageBucket: "",
    messagingSenderId: "778550952540"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = '';
  var destination = '';
  var firstTrain = 0;
  var frequency = 0;
  


$("#submit").on("click", function(event){
    event.preventDefault();

        trainName = $('#trainName-input').val().trim();
        destination = $('#destination-input').val().trim();
        firstTrain = $('#firstTrainTime-input').val().trim();
        frequency = $('#frequency-input').val().trim();

            database.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequency
           });
        });

     

database.ref().on('child_added', function(childSnapshot){
            
            console.log(childSnapshot.val().trainName);
            console.log(childSnapshot.val().frequency);
            console.log(childSnapshot.val().firstTrain);
            console.log(childSnapshot.val().destination);

            // $("#trainlist").append("<div class='well'><span class='trainName'> " + childSnapshot.val().trainName +
            // " </span><span class='trainFrequency'> " + childSnapshot.val().frequency +
            // " </span><span class='firstTrain'> " + childSnapshot.val().firstTrain +
            // " </span><span class='destination'> " + childSnapshot.val().destination + 
            // " </span></div>");

            var tFrequency = $('#frequency-input').val().trim();
            var firstTime = $('#firstTrainTime-input').val().trim();
        


            // change
            trainName = childSnapshot.val().trainName;
            destination = childSnapshot.val().destination;
            firstTrain = childSnapshot.val().firstTime;
            frequency = childSnapshot.val().frequency;

    
        
                // First Time (pushed back 1 year to make sure it comes before current time)
                var firstTimeConverted = moment(firstTime, "HH").subtract(1, "years");
                console.log(firstTimeConverted);
            
                // Current Time
                var currentTime = moment();
                console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
            
                // Difference between the times
                var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
                console.log("DIFFERENCE IN TIME: " + diffTime);
            
                // Time apart (remainder)
                var tRemainder = diffTime % frequency;
                console.log(tRemainder);
            
                // Minute Until Train
                var tMinutesTillTrain = frequency - tRemainder;
                console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
            
                // Next Train
                var nextTrain = moment().add(tMinutesTillTrain, "minutes");
                console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
        
            $("#train-table > tbody").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
            frequency + "</td><td>" + nextTrain.format("hh:mm")+ "</td><td>" + tMinutesTillTrain + "</td></tr>");

            
                                                // change next train format
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });









    




// //   train api code
//   $(function() {
//     var params = {
//         "api_key": "6a19baa7a6fa402394a5a568c5fc42e9",
//         // Request parameters
//     };
  
//     $.ajax({
//         url: "https://api.wmata.com/TrainPositions/TrainPositions?contentType={contentType}&" + $.param(params),
//         type: "GET",
//     })
//     .done(function(data) {
//         alert("success");
//     })
//     .fail(function() {
//         alert("error");
//     });
// });

