const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const newBtn = document.querySelector(".btn-new");
const imgDice = document.querySelector(".dice");
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const playerScore0El = document.querySelector("#score-0");
const playerScore1El = document.querySelector("#score-1");
const playerCurrentScore0 = document.querySelector("#current-0");
const playerCurrentScore1 = document.querySelector("#current-1");

let scores, currentScore, activePlayer, playing;

function init () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    playerScore0El.textContent = 0;
    playerScore1El.textContent = 0;
    playerCurrentScore0.textContent = 0;
    playerCurrentScore1.textContent = 0;
  
    imgDice.src = "img/dice-1.png";
    player0El.classList.remove("player-winner");
    player1El.classList.remove("player-winner");
    player0El.classList.add("player-active");
    player1El.classList.remove("player-active");
};

function generateRandomNum() {
    return Math.floor(Math.random() * 6 + 1);
}
    
function switchPlayer() {
    document.querySelector(`#current-${activePlayer}`).innerText = 0;
    document.querySelector(`.player-${activePlayer}`).classList.remove("player-active");
    currentScore = 0;
    activePlayer = activePlayer ? 0 : 1;
    document.querySelector(`.player-${activePlayer}`).classList.add("player-active");
}
    
function rollTheDice() {
    let diceRandNum = generateRandomNum();

    imgDice.src = `img/dice-${diceRandNum}.png`;

    if (diceRandNum !== 1) {
        currentScore += diceRandNum;
        document.querySelector(`#current-${activePlayer}`).innerText = currentScore;
    } else {
        currentScore = 0;
        switchPlayer();
    }
}

function holdScore() {
    scores[activePlayer] += currentScore;

    document.getElementById(`score-${activePlayer}`).innerText = scores[activePlayer];

    if (scores[activePlayer] >= 40) {
        document.querySelector(`.player-${activePlayer}`).classList.add("player-winner");
        playing = false;
    } else {
        switchPlayer();
    }
}

init();

rollBtn.addEventListener("click", () => {
    if (playing) rollTheDice();
});
    
holdBtn.addEventListener("click", () => {
    if (playing) holdScore();
});

newBtn.addEventListener('click', init);
