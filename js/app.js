let game;
let phrase;
let phraseContainer = document.getElementById('phrase');
let startGameBtn = document.querySelector('#btn__reset');

startGameBtn.addEventListener('click', () => {
  game = new Game();
  game.startGame();
});

let keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (e) => game.handleInteraction(e.target));
document.addEventListener('keyup', (e) => game.handleInteraction(e.key));

//============================================
//  DISPLAY GRANDMA!
//============================================

const grandmaMessages = [
  'GOOD JOB SON!',
  'IM IMPRESSED!',
  'NICE ONE!',
  'WAY TO GO!',
];
const grandmaMsg = document.querySelector('.grandma-msg');
const grandma = document.getElementById('grandma');
const grandmaVoice = new Audio('../clips/toasty.mp3');

//this will display grandma every time player guessed letter correct
function showGrandma() {
  grandmaVoice.play(); //grandma voice will play
  let randomPicker = Math.floor(Math.random() * grandmaMessages.length); //this will select random index value of messages

  grandmaMsg.innerText = grandmaMessages[randomPicker]; //grandma message will show

  grandma.style.display = 'block'; //grandma will display
  setTimeout(() => (grandma.style.display = 'none'), 1000); //grandma will leave for groceries after congratulating player ;)
}
