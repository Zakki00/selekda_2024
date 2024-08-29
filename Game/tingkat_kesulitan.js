// Variabel global untuk tingkat kesulitan
let difficulty = 'medium'; // Bisa diatur ke 'easy', 'medium', atau 'hard'

// Fungsi untuk mengatur kecepatan musuh berdasarkan tingkat kesulitan
function getEnemySpeed() {
    switch (difficulty) {
        case 'easy':
            return 2;  // Kecepatan lambat
        case 'medium':
            return 4;  // Kecepatan sedang
        case 'hard':
            return 6;  // Kecepatan cepat
        default:
            return 4;  // Default kecepatan sedang
    }
}

// AI Musuh: Fungsi untuk menggerakkan musuh
function moveEnemy(enemy) {
    let speed = getEnemySpeed();

    // Logika sederhana untuk mengikuti atau menyerang pemain
    if (player.x > enemy.x) {
        enemy.x += speed;
    } else if (player.x < enemy.x) {
        enemy.x -= speed;
    }

    if (player.y > enemy.y) {
        enemy.y += speed;
    } else if (player.y < enemy.y) {
        enemy.y -= speed;
    }

    // Logika tambahan bisa ditambahkan di sini untuk menyerang, menghindar, dll.
}

// Contoh fungsi game loop di mana AI musuh dipanggil
function gameLoop() {
    // Update posisi musuh
    moveEnemy(enemy);

    // Update logika permainan lainnya
    // ...

    // Render frame berikutnya
    requestAnimationFrame(gameLoop);
}

// Inisialisasi game dan mulai loop
function startGame() {
    // Set tingkat kesulitan dari input pengguna
    difficulty = getSelectedDifficulty();

    // Mulai loop permainan
    gameLoop();
}
