
class Phrase{
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        let phrase = this.phrase;
        let className;
        let characterList = "<ul>";
        for (let i = 0; i < phrase.length; i++) {
            let letter = phrase[i];

            if ( letter === " " ) {
                className = "space"
            } else {
                className = "letter hide"
            }

            let li = `<li class="${className}">${letter}</li>`;
            characterList += li;
        }

        characterList += "</ul>";
        phraseContainer.innerHTML = characterList;
    }
    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        if (this.phrase.includes(letter)) { 
            return true
        } else {
            return false
        }    
    }
    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        let letterList = phraseContainer.querySelectorAll(`li.letter.hide`);
        letterList.forEach(li => {
            let letterFound = li.innerText == letter;
            if( letterFound ) {
                showGrandma()
                li.classList.remove("hide");
                li.classList.add("show")
            }
        });
    }
};
