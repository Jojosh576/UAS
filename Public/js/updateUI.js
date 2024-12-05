window.onload = function() {
    // Periksa status login dari localStorage atau session
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        var signInButton = document.querySelector('.sign-in-button');
        signInButton.textContent = 'Profile'; // Ubah teks menjadi Profile
        signInButton.href = '/profile.html'; // Ubah href jika perlu
    }
}
// updateUI.js

// Fungsi untuk memeriksa status login
function checkLoginStatus() {
    // Simulasi status login, ganti dengan logika sesungguhnya
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Fungsi untuk mengupdate UI berdasarkan status login
function updateSignInButton() {
    const signInButton = document.getElementById('signInButton');
    if (checkLoginStatus()) {
        signInButton.textContent = 'Profile';
        signInButton.href = '/profile.html';
    }
}

// Memanggil fungsi update saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateSignInButton);