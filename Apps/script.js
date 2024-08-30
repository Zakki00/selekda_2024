document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');

    // Fade out the welcome screen after 1 second
    setTimeout(() => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 1000);
    }, 1000);
});
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let selectedColor = 'black';  // Warna default adalah hitam

const colorButtons = document.querySelectorAll('.color-btn');

colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedColor = e.target.dataset.color;
    });
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];  // Simpan posisi awal saat mouse ditekan
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;  // Jika tidak menggambar, keluar dari fungsi

    ctx.strokeStyle = selectedColor;  // Gunakan warna yang dipilih
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);  // Mulai dari posisi terakhir
    ctx.lineTo(e.offsetX, e.offsetY);  // Gambar garis ke posisi baru
    ctx.stroke();  // Gambar garis

    // Perbarui posisi terakhir dengan posisi baru
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
