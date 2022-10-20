class Game {
  phrases = ['Fried Chicken', 'New York', 'Cookie Jar', 'Hello World', 'Miami'];
  constructor() {
    this.missed = 0;
    this.lives = 5;
    this.activePhrase = null;
  }

  getRandomPhrase() {
    const phrases = this.phrases;
    const phraseIdx = Math.floor(phrases.length * Math.random());
    return phrases[phraseIdx];
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    let startScreen = document.getElementById('overlay');
    startScreen.style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    phrase = new Phrase(this.activePhrase);
    phrase.addPhraseToDisplay();

    let playAgain = startGameBtn.innerText == 'Play Again';
    game.resetGameBoard(playAgain); //Game Board will reset if player wants to play again
  }

  handleInteraction(button) {
    const isButton = button.tagName == 'BUTTON';

    if (isButton) {
      //before we validate input, we want to make sure the parameter was a button element
      let letter = button.innerText;
      button.disabled = true;

      if (phrase.checkLetter(letter)) {
        // statement is true if player found a letter
        phrase.showMatchedLetter(letter);
        button.classList.add('chosen');
      } else {
        // if player did not find letter we'll run the following
        this.removeLife();
        button.classList.add('wrong');
      }

      if (this.checkForWin()) {
        // show gameOver overlay if player won game
        this.gameOver(true);
      }
    } else {
      //if parameter was not a button element, we'll go try and find the corresponding button element(if any).
      this.findButtonElement(button);
    }
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */
  checkForWin() {
    let remainingCharacters = phraseContainer.querySelectorAll('li.hide');
    return remainingCharacters.length == 0;
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    let heartIcons = document.querySelectorAll('.tries img');

    heartIcons[this.missed].src = 'images/lostHeart.png';
    this.missed += 1;

    let gameLose = this.missed == this.lives;
    if (gameLose) {
      this.gameOver(false);
    }
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    let startScreen = document.getElementById('overlay');
    let gameOverMsg = startScreen.querySelector('#game-over-message');

    startScreen.style.display = '';
    startGameBtn.innerText = 'Play Again';

    if (gameWon) {
      startScreen.className = 'win';
      gameOverMsg.innerText = 'Way to go!🤠';
    } else {
      startScreen.className = 'lose';
      gameOverMsg.innerText = "Maybe next time, here's a taco for now🌮";
    }
  }

  /**
   * Game Board resets if player wants to play again
   */
  resetGameBoard(playAgain) {
    if (playAgain) {
      let keyStrokes = keyboard.querySelectorAll('button');
      keyStrokes.forEach((key) => {
        key.disabled = false;
        key.className = 'key';
      });

      let heartIcons = document.querySelectorAll('.tries img');
      heartIcons.forEach((heart) => {
        heart.src = 'images/liveHeart.png';
      });
    }
  }

  /**
   * if player input was not a button element, this will find a corresponding button element(if any).
   */
  findButtonElement(param) {
    const letter = param?.toLowerCase();
    const isLetter = /^[a-z]$/.test(letter);

    if (isLetter) {
      const keyboardBtnElement = keyboard
        .querySelectorAll('button.key')
        .filter((btn) => btn.innerText === letter);

      if (
        !keyboardBtnElement.classList.contains('chosen') &&
        !keyboardBtnElement.classList.contains('wrong')
      ) {
        this.handleInteraction(keyboardBtnElement);
      }
    }
  }
}
