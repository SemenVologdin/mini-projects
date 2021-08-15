const $button = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $gameTime = document.querySelector('#game-time');

console.log($gameTime);

let score = 0;
let isGameStarted = false;
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

function startGame() {
  isGameStarted = true;
  score = 0;
  console.log(score);
  setGameTime();

  $timeHeader.classList.remove('hide');
  $resultHeader.classList.add('hide');
  $game.style.backgroundColor = '#fff';
  $button.classList.add('hide');

  renderBox();

  const interval = setInterval(function () {
    let time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
}

function setGameTime() {
  const time = (+$gameTime.value).toFixed(1);
  $time.textContent = time;
}

function endGame() {
  isGameStarted = false;
  $result.textContent = score;
  $timeHeader.classList.add('hide');
  $resultHeader.classList.remove('hide');
  $button.classList.remove('hide');

  $game.innerHTML = '';
  $game.style.backgroundColor = '#ccc';
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
    renderBox();
    score++;
  }
}

function renderBox() {
  const box = document.createElement('div');
  $game.innerHTML = '';
  box.size = getRandom(30, 50);

  box.style.height = box.style.width = box.size + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = colors[getRandom(0, 6)];
  box.style.top = getRandom(0, 250) + 'px';
  box.style.left = getRandom(0, 250) + 'px';
  box.style.borderRadius = '50%';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

$game.addEventListener('click', handleBoxClick);
$button.addEventListener('click', startGame);
$gameTime.addEventListener('input', setGameTime);
