const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: 4,
    color: 'blue'
};

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    updateBall();
    drawBall();

    updateFrame(); // Ini adalah fungsi yang menggerakkan karakter
    requestAnimationFrame(gameLoop);
}

gameLoop(); // Mulai game loop
