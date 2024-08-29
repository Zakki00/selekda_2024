const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Array untuk menyimpan path gambar
const frames = [
    'assets/Move Backward_001.png',
    'assets/Move Backward_002.png',
    'assets/Move Backward_003.png',
    'assets/Move Backward_004.png',
    'assets/Move Backward_005.png',
    'assets/Move Backward_006.png',
    'assets/Move Backward_007.png',
    'assets/Move Backward_008.png',
    'assets/Move Backward_009.png'
];

// Array untuk menyimpan objek gambar yang telah dimuat
const images = [];
let currentFrame = 0;
const spriteWidth = 64;  // Ganti dengan lebar sprite yang sesuai
const spriteHeight = 64; // Ganti dengan tinggi sprite yang sesuai
let xPos = 100; // Posisi awal karakter pada sumbu x
let yPos = 100; // Posisi awal karakter pada sumbu y
let moveDirectionX = 0; // 1 untuk maju, -1 untuk mundur, 0 untuk diam
let moveDirectionY = 0; // 1 untuk turun, -1 untuk naik, 0 untuk diam

// Muat semua gambar ke dalam array images
frames.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        images[index] = img;
        if (index === 0) {
            drawSprite(xPos, yPos); // Gambar frame pertama setelah dimuat
        }
    };
});

function drawSprite(x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan kanvas
    context.drawImage(images[currentFrame], x, y, spriteWidth, spriteHeight);
}

function updateFrame() {
    if (moveDirectionX !== 0 || moveDirectionY !== 0) { // Hanya update frame jika ada pergerakan
        currentFrame = (currentFrame + 1) % images.length; // Siklus frame
        xPos += moveDirectionX * 5; // Gerakkan karakter berdasarkan arah x
        yPos += moveDirectionY * 5; // Gerakkan karakter berdasarkan arah y
    }
    drawSprite(xPos, yPos); // Tentukan posisi gambar pada canvas
}

function gameLoop() {
    updateFrame();
    requestAnimationFrame(gameLoop);
}

// Mulai game loop setelah semua gambar dimuat
let imagesLoaded = 0;
frames.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frames.length) {
            gameLoop(); // Mulai loop animasi setelah semua gambar dimuat
        }
    };
});

// Event listener untuk mengendalikan karakter
document.addEventListener('keydown', function(e) {
    if (e.key === 'd' || e.key === 'D') {
        moveDirectionX = 1; // Gerak ke kanan
    } else if (e.key === 'a' || e.key === 'A') {
        moveDirectionX = -1; // Gerak ke kiri
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'd' || e.key === 'D' || e.key === 'a' || e.key === 'A') {
        moveDirectionX = 0; // Berhenti saat tombol `a` atau `d` dilepas
    }
    currentFrame = 0; // Kembali ke frame pertama (berdiri diam)
});
