
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-0a48K8iXKWBGmJpaNX8A9omiH4stU-w",
    authDomain: "train-scheduler-d3623.firebaseapp.com",
    databaseURL: "https://train-scheduler-d3623.firebaseio.com",
    storageBucket: "train-scheduler-d3623.appspot.com",
    messagingSenderId: "651161635148"
  };
  
  firebase.initializeApp(config);

//ref database
var database=firebase.database();

  // var tName = "";
  // var destination = ""; 
  // var firstTrain = 0;
  // var tFrequency = 0;

  $("#submit").on("click", function(event){
	event.preventDefault();

	tName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = moment($("#trainTime").val().trim(), "HH:mm").format("HH:mm");
	tFrequency = $("#frequency").val().trim();
	
	

var obj = {
	
		tName: tName,
		destination: destination,
		tFrequency: tFrequency,
		firstTrain: firstTrain
		
}
database.ref().push(obj);

return false;

});

 database.ref().on("child_added", function(snapshot){
//child_added

	var tName= snapshot.val().tName;
	var destination= snapshot.val().destination;
	var firstTrain= snapshot.val().firstTrain;
	var tFrequency= snapshot.val().tFrequency;



	// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "X").subtract(1, "years");
    


    var currentTime = moment().format("HH:mm");
    

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    

    // remainder
    var tFrequency = parseInt(snapshot.val().tFrequency);
    var tRemainder = diffTime % tFrequency;
    

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    

    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    

    var upcomingTrain = (moment(nextTrain).format("HH:mm"));


   	    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + 
	    	destination + "</td><td>" + tFrequency + "</td><td>" + 
nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");


});
