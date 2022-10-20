class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /** Display phrase on game board */
  addPhraseToDisplay() {
    const phrase = this.phrase;
    let characterList = '';
    for (let i = 0; i < phrase.length; i++) {
      const character = phrase[i];
      const className = character === ' ' ? 'space' : 'letter hide';
      characterList += `<li class="${className}" value=${character}>${character}</li>`;
    }
    phraseContainer.innerHTML = `<ul>${characterList}</ul>`;
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const letterList = phraseContainer.querySelectorAll(
      `li.letter.hide[value=${letter}]`
    );
    letterList.forEach((li) => {
      li.classList.remove('hide');
      li.classList.add('show');
    });
    showGrandma();
  }
}
