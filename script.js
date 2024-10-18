// settings

const p1newName = document.getElementById("p1name").value;
const p1newCol = document.getElementById("p1col").value;
const p2newName = document.getElementById("p2name").value;
const p2newCol = document.getElementById("p2col").value;
const tossCol = document.getElementById("tiecol").value;

function set() {
    document.getElementById("player1name").innerHTML = p1newName;
    document.getElementById("player2name").innerHTML = p2newName;
    document.getElementById("player1").style.color = p1newCol;
    document.getElementById("player2").style.color = p2newCol;
    document.getElementById("player1bar").style.backgroundColor = p1newCol;
    document.getElementById("player2bar").style.backgroundColor = p2newCol;
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
for (var i = 1; i <= categories.length; i++) {
    var row = tabId.insertRow(-1);
    var cats = row.insertCell(0);
    var wins = row.insertCell(1);
}