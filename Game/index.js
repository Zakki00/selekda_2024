let timer = 30;
const timerElement = document.getElementById('timer');

function updateTimer() {
    if (timer > 0) {
        timer--;
        timerElement.textContent = timer;
    } else {
        clearInterval(timerInterval);
        alert('Game Over');
    }
}

const timerInterval = setInterval(updateTimer, 1000);
