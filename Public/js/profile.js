document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('token'); // Asumsi token disimpan di sessionStorage

    fetch('/api/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Tampilkan data di halaman profil
    })
    .catch(error => console.error('Error:', error));
});