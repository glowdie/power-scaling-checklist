// settings, adding this to make sure the code pushes

let p1newName = document.getElementById("p1name").value;
let p1newCol = document.getElementById("p1col").value;
let p2newName = document.getElementById("p2name").value;
let p2newCol = document.getElementById("p2col").value;
let tossCol = document.getElementById("tiecol").style.backgroundColor;

function set() {
	p1newName = document.getElementById("p1name").value;
	p1newCol = document.getElementById("p1col").value;
	p2newName = document.getElementById("p2name").value;
	p2newCol = document.getElementById("p2col").value;
	tossCol = document.getElementById("tiecol").style.backgroundColor;
	
    document.getElementById("player1name").innerHTML = p1newName;
    document.getElementById("player2name").innerHTML = p2newName;
    document.getElementById("player1").style.color = p1newCol;
    document.getElementById("player2").style.color = p2newCol;
    document.getElementById("player1bar").style.backgroundColor = p1newCol;
    document.getElementById("player2bar").style.backgroundColor = p2newCol;
	
	for (let i = 0; i < winner.length; i++) {
		switch(winner[i]) {
			case 1:
				document.getElementById("winner" + (i+1)).style.backgroundColor = p1newCol;
				break;
			case 2:
				document.getElementById("winner" + (i+1)).style.backgroundColor = p2newCol;
		}
	}
	
	updateScores();
}

function reset() {
    location.reload();
}

// checklist
const categories = [
    "Strength",
    "Speed",
    "Durability",
    "Offense",
    "Defense",
    "IQ",
    "Battle IQ",
    "Potential",
    "Experience",
    "Agility",
    "Skills",
    "Attack Potency"
];

const weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let winner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //0 for tie, 1 for p1, 2 for p2
let scores = [0, 0]; //player1score, player2score
let totalWeights = 0;

for (let i = 0; i < weights.length; i++) {
    totalWeights += weights[i];
}

const toWin = Math.floor(totalWeights / 2) + 1;
document.getElementById("threshold").innerHTML = toWin;

// create cells
const tabId = document.getElementById("checklist-main");
for (let i = 1; i <= categories.length; i++) {
    var row = tabId.insertRow(-1);
    var cats = row.insertCell(0);
	cats.innerHTML = categories[i-1] + " (" + weights[i-1] + ")";
	cats.id = "category" + i;
    var wins = row.insertCell(1);
	wins.id = "winner" + i;
	wins.style.backgroundColor = tossCol;
	wins.addEventListener("click", () => changeWin(i));
}

function updateScores() {
	scores[0] = 0;
	scores[1] = 0;
	for (var i = 0; i < winner.length; i++) {
		switch(winner[i]) {
			case 1:
				scores[0] += weights[i];
				break;
			case 2:
				scores[1] += weights[i];
		}
	}
	let p1length = 100 * (scores[0] / totalWeights);
	let p2length = 100 * (scores[1] / totalWeights);
	player1bar.style.width = p1length + "%";
	p1score.innerHTML = scores[0];
	player2bar.style.width = p2length + "%";
	p2score.innerHTML = scores[1];
	
	if (scores[0] < toWin && scores[1] < toWin) {
		overallW.innerHTML = "No winner";
	} else {
		if (scores[0] > scores[1]) {
			//p1 win
			overallW.innerHTML = p1newName + " wins! (";
			let mov = (scores[0]-scores[1])/totalWeights * 100;
			if (mov >= 80) {
				overallW.innerHTML += "neg diff";
			} else if (mov >= 60) {
				overallW.innerHTML += "no diff";
			} else if (mov >= 40) {
				overallW.innerHTML += "low diff";
			} else if (mov >= 20) {
				overallW.innerHTML += "mid diff";
			} else {
				overallW.innerHTML += "high diff";
			}
			overallW.innerHTML += ")";
		} else {
			//p2 win
			overallW.innerHTML = p2newName + " wins! (";
			let mov = (scores[1]-scores[0])/totalWeights * 100;
			if (mov >= 80) {
				overallW.innerHTML += "neg diff";
			} else if (mov >= 60) {
				overallW.innerHTML += "no diff";
			} else if (mov >= 40) {
				overallW.innerHTML += "low diff";
			} else if (mov >= 20) {
				overallW.innerHTML += "mid diff";
			} else {
				overallW.innerHTML += "high diff";
			}
			overallW.innerHTML += ")";
		}
	}
}

function changeWin(x) {
	winner[x-1]++;
	winner[x-1] %= 3;
	
	let col = "#000000";
	
	switch(winner[x-1]) {
		case 0:
			col = tossCol;
			break;
		case 1:
			col = p1newCol;
			break;
		case 2:
			col = p2newCol;
	}
	document.getElementById("winner" + x).style.backgroundColor = col;
	updateScores();
}