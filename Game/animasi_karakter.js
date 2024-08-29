const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Array untuk menyimpan path gambar gerakan mundur
const frames = [
    'assets/Move Backward_000.png',
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

// Array untuk menyimpan path gambar lompat
const jumpFrames = [
    'GAME_MEDIA/Sprites/Characters/Character 04 - Japan/Jump/Jump_000.png',
    'GAME_MEDIA/Sprites/Characters/Character 04 - Japan/Jump/Jump_001.png',
    'GAME_MEDIA/Sprites/Characters/Character 04 - Japan/Jump/Jump_002.png',
    'GAME_MEDIA/Sprites/Characters/Character 04 - Japan/Jump/Jump_003.png',
    'GAME_MEDIA/Sprites/Characters/Character 04 - Japan/Jump/Jump_004.png'
];

// Array untuk menyimpan objek gambar yang telah dimuat
const images = [];
const jumpImages = [];

let currentFrame = 0;
let jumpCurrentFrame = 0;

const spriteWidth = 64;  // Ganti dengan lebar sprite yang sesuai
const spriteHeight = 64; // Ganti dengan tinggi sprite yang sesuai
let xPos = 100; // Posisi awal karakter pada sumbu x
let yPos = 280; // Posisi awal karakter pada sumbu y
let moveDirectionX = 0; // 1 untuk maju, -1 untuk mundur, 0 untuk diam
let isJumping = false; // Status lompat
let velocityY = 0; // Kecepatan vertikal
const jumpStrength = -15; // Kekuatan lompat (negatif karena arah Y ke atas)
const gravity = 1; // Gaya gravitasi yang mengembalikan karakter ke bawah

// Muat semua gambar gerakan ke dalam array images
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

// Muat semua gambar lompat ke dalam array jumpImages
jumpFrames.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        jumpImages[index] = img;
    };
});

function drawSprite(x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan kanvas
    
    if (isJumping) {
        context.drawImage(jumpImages[jumpCurrentFrame], x, y, spriteWidth, spriteHeight);
    } else {
        context.drawImage(images[currentFrame], x, y, spriteWidth, spriteHeight);
    }
}

function updateFrame() {
    if (moveDirectionX !== 0) {
        currentFrame = (currentFrame + 1) % images.length; // Siklus frame jalan/mundur
        xPos += moveDirectionX * 5; // Gerakkan karakter berdasarkan arah x
    }
    
    if (isJumping) {
        velocityY += gravity; // Tambahkan gravitasi ke kecepatan vertikal
        yPos += velocityY; // Gerakkan karakter berdasarkan kecepatan vertikal
        
        if (yPos >= 280) { // Ketika karakter kembali ke tanah
            yPos = 280;
            isJumping = false; // Selesai lompat
            velocityY = 0; // Reset kecepatan vertikal
            jumpCurrentFrame = 0; // Reset frame lompat saat mendarat
        } else {
            jumpCurrentFrame = (jumpCurrentFrame + 1) % jumpImages.length; // Update frame lompat
        }
    }
    
    drawSprite(xPos, yPos); // Tentukan posisi gambar pada canvas
    requestAnimationFrame(updateFrame); // Panggil updateFrame secara berulang
}

// Mulai game loop setelah semua gambar dimuat
let imagesLoaded = 0;
frames.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frames.length && jumpImages.length === jumpFrames.length) {
            requestAnimationFrame(updateFrame); // Mulai loop animasi setelah semua gambar dimuat
        }
    };
});

// Event listener untuk mengendalikan karakter
document.addEventListener('keydown', function(e) {
    if (e.key === 'd' || e.key === 'D') {
        moveDirectionX = 1; // Gerak ke kanan
    } else if (e.key === 'a' || e.key === 'A') {
        moveDirectionX = -1; // Gerak ke kiri
    } else if (e.key === ' ' && !isJumping) { // Tombol spasi untuk lompat
        isJumping = true;
        velocityY = jumpStrength; // Set kecepatan awal lompat
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'd' || e.key === 'D' || e.key === 'a' || e.key === 'A') {
        moveDirectionX = 0; // Berhenti saat tombol `a` atau `d` dilepas
    }
    currentFrame = 0; // Kembali ke frame pertama (berdiri diam)
});
