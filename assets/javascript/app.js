// Initialize Firebase
var config = {
	apiKey: "AIzaSyDnhJQaRUMRgyHNvghcqChp0LGjLBqE6CU",
	authDomain: "fullers-trainscheduler.firebaseapp.com",
	databaseURL: "https://fullers-trainscheduler.firebaseio.com",
	storageBucket: "",
};
firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var destination = "";
var fttime = "";
var frequency = "";

var tFrequency = 3;
var firstTime = "03:30";

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));

$('#submit').on('click', function(event) {
	event.preventDefault();

	console.log('pushed');

	name = $('#trainName').val().trim();
	destination = $('#destination').val().trim();
	fttime = $('#fttime').val().trim();
	firstTime = fttime;
	frequency = $('#frequency').val().trim();
	tFrequency = frequency;

	database.ref().push({
		name: name,
		destination: destination,
		firstTrainTime: fttime,
		frequency: frequency
	})

	$('.form-control').val('');
})

database.ref().on('child_added', function(childSnapshot) {
	name = childSnapshot.val().name;
	destination = childSnapshot.val().destination;
	fttime = childSnapshot.val().fttime;
	nextArrival = moment(nextTrain).format("hh:mm a");
	frequency = childSnapshot.val().frequency;
	minAway = tMinutesTillTrain;


	//Create tr for every train
	var train_tr = $('<tr>');

	//Create td for train data
	var name_td = $('<td>');
	var destination_td = $('<td>');
	var frequency_td = $('<td>');
	var nextArrival_td = $('<td>');
	var minAway_td = $('<td>');
	

	//Add data to td
	name_td.text(name);
	destination_td.text(destination);
	frequency_td.text(frequency);
	nextArrival_td.text(nextArrival);
	minAway_td.text(minAway);

	//Append td to train_tr
	train_tr.append(name_td);
	train_tr.append(destination_td);
	train_tr.append(frequency_td);
	train_tr.append(nextArrival_td);
	train_tr.append(minAway_td);
	

	$('tbody').append(train_tr);
});