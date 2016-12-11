const minsInMs = {
	5: 300000,
	10: 600000,
	15: 900000,
	25: 1500000
}

const pomodoroButton = document.getElementById('pomodoro-button');
const fiveMinuteButton = document.getElementById('five-minute-button');
const tenMinuteButton = document.getElementById('ten-minute-button');
const fifteenMinuteButton = document.getElementById('fifteen-minute-button');
const resetTimeoutButton = document.getElementById('reset-timeout-button');

const currentTimeText = document.getElementById('current-time-text');
const statsLink = document.getElementById('stats-link');
const pomodoroTechniqueLink = document.getElementById('pomodoro-technique-link');



let intervalID;
let intervalMillisecondsLeft = 0;

function resetPanelInterval() {
	setPanelTimeText(0);
	intervalMillisecondsLeft = 0;
	clearInterval(intervalID);
}

function setPanelInterval(milliseconds) {
	resetPanelInterval();

	intervalMillisecondsLeft = milliseconds;
	setPanelTimeText(milliseconds);

	intervalID = setInterval(function() {
		intervalMillisecondsLeft -= 1000;
		setPanelTimeText(intervalMillisecondsLeft);

		if (intervalMillisecondsLeft <= 0) {
			clearInterval(intervalID);
		}
	}, 1000);
}

function setPanelTimeText(milliseconds) {
	currentTimeText.textContent = millisecondsToTimeText(milliseconds);
}

function millisecondsToTimeText(milliseconds) {
	let minutes = parseInt((milliseconds / (1000 * 60)) % 60);
	let seconds = parseInt((milliseconds / 1000) % 60);

	minutes = (minutes < 10) ? '0' + minutes : minutes;
	seconds = (seconds < 10) ? '0' + seconds : seconds;

	return minutes + ':' + seconds;
}



pomodoroButton.addEventListener('click', () => {
	setPanelInterval(minsInMs['25']);
	setBrowserTimer(minsInMs['25']);
});

fiveMinuteButton.addEventListener('click', () => {
	setPanelInterval(minsInMs['5']);
	setBrowserTimer(minsInMs['5']);
});

tenMinuteButton.addEventListener('click', () => {
	setPanelInterval(minsInMs['10']);
	setBrowserTimer(minsInMs['10']);
});

fifteenMinuteButton.addEventListener('click', () => {
	setPanelInterval(minsInMs['15']);
	setBrowserTimer(minsInMs['15']);
});

resetTimeoutButton.addEventListener('click', () => {
	resetPanelInterval();
	resetBrowserTimer();
});

pomodoroTechniqueLink.addEventListener('click', () => {
	openTab('http://pomodorotechnique.com');
});

statsLink.addEventListener('click', () => {
	openTab('../stats/stats.html');
});
