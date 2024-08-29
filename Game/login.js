document.addEventListener("DOMContentLoaded", function() {
    const playerNameInput = document.getElementById("playerName");
    const playButton = document.getElementById("playButton");

    //fungis unutuk memeriksa apakah inputan sudah terisi
    playerNameInput.addEventListener("input", function() {
        if (playerNameInput.value) {
            playButton.disabled = false;
        } else {
            playButton.disabled = true;
        }
    });


    //fungsi untuk memindahkan ke halaman permainan
    playButton.addEventListener("click", function() {
        const playerName = playerNameInput.value;
        localStorage.setItem("playerName", playerName);
        window.location.href = "index.html";
    });
})