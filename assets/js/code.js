// GLOBAL VARIABLES
// =====================================================================

// Arrays and Variables
var wordOptions = ["elbow", "eyelash", "skin", "toe", "shoulder", "tongue", "toenail", "beard"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; // j _ _ _ _
var wrongLetters = [];

// Game Counters
var winCount = 0;
var lossCount = 0;
var GuessesLeft = 9;

// FUNCTIONS (reusable blocks)
// =====================================================================

function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // Populate blanks and successes
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_ ")
    }

    // Change HTML reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

}

function checkLetters(letter) {
    // Check letter exists at all
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    };

    // Where letter, populate blanksAndSuccesses array
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
        // Letter was not found
    } else {
        wrongLetters.push(letter);
        guessesLeft--
    };
};

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Gueses Left: " + guessesLeft);

    // Update HTML to reflect recent info
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    // user won?
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        // Update Win Count in HTML
        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }
    // user lost?
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You Lost!");

        // Update Loss Count in HTML
        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
    }

}
// MAIN PROCESS
// =====================================================================

// Initiates Code (and restart)
startGame();

// Register keyclicks
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
}