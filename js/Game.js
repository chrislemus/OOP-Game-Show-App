
class Game {
    constructor() {
        this.missed = 0;
        this.lives = 5;
        this.phrases = this.createPhrases();
        this.activePhrase = this.getRandomPhrase();
    }
    /**
     * Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game
     */
    createPhrases() {
        return ["Fired Chicken", "New York", "Cookie Jar", "Hello World", "Miami"]
    }
    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        let phrases = this.phrases
        let phrasePicker = Math.floor( phrases.length * Math.random())
        let randomPhrase = phrases[phrasePicker]
        return {phrase: randomPhrase}
        // phrase = new Phrase(randomPhrase)
    }
    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        let startScreen = document.getElementById("overlay");
        startScreen.style.display = "none";
        phrase = new Phrase(this.activePhrase.phrase);
        phrase.addPhraseToDisplay();
        

        let playAgain = startGameBtn.innerText == "Play Again";
        game.restGameBoard(playAgain); //Game Board will reset if player wants to play again

    }
    handleInteraction(button) { 

        phrase.checkLetter(button);

        let gameWon = this.checkForWin();
        let gameLose = this.missed == this.lives;

        if (gameWon) {
            this.gameOver(true);
        } else if (gameLose) {
            this.gameOver(false);
        }
    }
    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't won
    */
    checkForWin() {
        let hiddenCharacters = phraseContainer.querySelectorAll("li.hide");
        let phraseFound = hiddenCharacters.length == 0;
        if (phraseFound) {
            return true
        } else {
            return false
        }
    }
    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    * "phrase.checkLetter()" will trigger this if condition is met
    */
    removeLife() {
        let heartIcons = document.querySelectorAll(".tries img");
        heartIcons[this.missed].src = "images/lostHeart.png";
        this.missed += 1;
    }
    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        let startScreen = document.getElementById("overlay");
        let gameOverMsg = startScreen.querySelector("#game-over-message");

        startScreen.style.display = "";
        startGameBtn.innerText = "Play Again"

        if(gameWon) {
            startScreen.className = "win";
            gameOverMsg.innerText = "Way to go!🤠"
        } else {
            startScreen.className = "lose";
            gameOverMsg.innerText = "Maybe next time, here's a taco for now🌮"
        }
    }
    /**
    * Game Board resets if player wants to play again
    */
   restGameBoard(playAgain) {
        if (playAgain) {
            let keyStrokes = keyboard.querySelectorAll('button');
            keyStrokes.forEach(key => {
                key.disabled = false;
                key.className = "key";
            });

            let heartIcons = document.querySelectorAll(".tries img");
            heartIcons.forEach(heart => {
                heart.src = "images/liveHeart.png";
            });
        }
   }
   /**
    * this will handle any key pressed
    */
    validateKeyboardKey(key) {
        
        let keyPress = key.toLowerCase();
        let isLetter = /^[a-z]$/.test(keyPress);
        // 1. code will execute if keypress is a letter
        if (isLetter) {
            let keyboardBtnElement;
            let digitalKeyboard = keyboard.querySelectorAll('button.key');
            // 2. get button element that that matches keypress
            digitalKeyboard.forEach(button => {
                if (button.innerText == keyPress) {
                    keyboardBtnElement = button;
                }
            });
            // 3. if button element has not been selected. We'll select the button element
            let letterNotYetSelected = !keyboardBtnElement.classList.contains("chosen") && !keyboardBtnElement.classList.contains("wrong");
            if (letterNotYetSelected) {
                this.handleInteraction(keyboardBtnElement)
            }

        }
    }
};