
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function clickMeCounter(argument) {
	// body...
	counter = counter+1;
	var span = document.getElementById('num');
	span.innerHTML = counter.toString();
};