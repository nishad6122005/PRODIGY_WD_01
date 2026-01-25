let startTime = 0;
let elapsed = 0;
let timerInterval;

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function timeToString(time) {
  const hrs = Math.floor(time / 3600000);
  const mins = Math.floor((time % 3600000) / 60000);
  const secs = Math.floor((time % 60000) / 1000);

  const formattedHrs = hrs.toString().padStart(2, "0");
  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");

  return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
}

function start() {
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(() => {
    elapsed = Date.now() - startTime;
    display.textContent = timeToString(elapsed);
  }, 1000);
}

function pause() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  elapsed = 0;
  display.textContent = "00:00:00";
  lapsList.innerHTML = "";
}

function lap() {
  const li = document.createElement("li");
  li.textContent = timeToString(elapsed);
  lapsList.appendChild(li);
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
