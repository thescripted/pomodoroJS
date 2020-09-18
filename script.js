const INITIAL_TIME = 2500; // 1500 seconds = 25 minutes
const SECONDS = 1000; // Develop purposes only. 1000 ms

function formatToTimeString(timeSeconds) {
  let minutes = Math.floor(timeSeconds / 60);
  let seconds = timeSeconds % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${minutes}:${seconds}`;
}
// Called by Timer to update the DOM
function renderTime(time) {
  formatTime = formatToTimeString(time);
  timerView.innerHTML = formatTime;
  document.title = formatTime;
}

class Timer {
  ticker = undefined;
  timeout = undefined;
  clock = INITIAL_TIME;
  running = false;

  start() {
    let self = this;
    this.running = true;
    this.ticker = setInterval(function () {
      if (self.clock < 0) {
        clearInterval(self.ticker);
      }
      self.clock = self.clock - 1;
      renderTime(self.clock);
    }, SECONDS);

    this.timeout = setTimeout(function () {
      clearInterval(self.ticker);
    }, self.clock * SECONDS);
  }

  pause() {
    this.running = false;
    clearInterval(this.ticker);
    clearTimeout(this.timeout);
    renderTime(this.clock);
  }

  reset() {
    this.pause();
    this.clock = INITIAL_TIME;
    renderTime(this.clock);
  }
}

const TIMER_INSTANCE = new Timer(); // One and only instance
const playPauseHandler = function () {
  if (!TIMER_INSTANCE.running) {
    TIMER_INSTANCE.start();
    playButton.innerText = 'Pause';
    body.classList.remove('pauseScreen');
    body.classList.add('playScreen');
  } else {
    TIMER_INSTANCE.pause();
    playButton.innerText = 'Play';
    body.classList.add('pauseScreen');
    body.classList.remove('playScreen');
  }
};
const resetHandler = function () {
  TIMER_INSTANCE.reset();
  playButton.innerText = 'Play';
  body.classList.add('pauseScreen');
  body.classList.remove('playScreen');
};
function initialRender() {
  formatTime = formatToTimeString(INITIAL_TIME);
  timerView.innerText = formatTime;
  playButton.innerText = 'Play';
}

// Render Phase
const timerView = document.getElementById('timer'); // Updated by renderTime()
const playButton = document.getElementById('playPause');
const resetButton = document.getElementById('reset');
const body = document.querySelector('.body');
playButton.addEventListener('click', playPauseHandler);
resetButton.addEventListener('click', resetHandler);

initialRender(); // default set up
