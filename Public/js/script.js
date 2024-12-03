document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', function() {
        searchButton.style.display = 'none';
        searchInput.style.display = 'inline-block';
        searchInput.focus();
    });

    searchInput.addEventListener('blur', function() {
        if (searchInput.value.trim() === '') {
            searchInput.style.display = 'none';
            searchButton.style.display = 'inline-block';
        }
    });

    // Kode untuk slideshow
    const slideshowContainer = document.getElementById('slideshow-container');
    const slides = [
        { image: 'Trend.jpg', text: 'Temukan Gaya Fashion Terbaru' },
        { image: 'yukata.jpg', text: 'Koleksi Musim Panas yang Trendy' },
        { image: 'Ring.jpeg', text: 'Aksesori untuk Gaya Anda' },
        { image: 'Food.jpeg', text:'Tips Kesehatan untuk menjaga tubuh' }
    ];
    let currentSlideIndex = 0;

    function createSlideElement(slide) {
        const slideElement = document.createElement('div');
        slideElement.style.backgroundImage = `url('image/${slide.image}')`;
        slideElement.style.backgroundPosition = 'center 20%'; // Mengubah posisi background
        slideElement.classList.add('slide');
        
        const textElement = document.createElement('h2');
        textElement.classList.add('slide-text');
        textElement.textContent = slide.text;
        
        slideElement.appendChild(textElement);
        return slideElement;
    }

    function showNextSlide() {
        const currentSlide = slideshowContainer.querySelector('.slide.active');
        const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        const nextSlide = createSlideElement(slides[nextSlideIndex]);
        
        slideshowContainer.appendChild(nextSlide);
        
        // Trigger reflow
        nextSlide.offsetWidth;
        
        nextSlide.classList.add('active');
        if (currentSlide) {
            currentSlide.classList.add('prev');
            setTimeout(() => {
                slideshowContainer.removeChild(currentSlide);
            }, 1000); // Sesuaikan dengan durasi transisi CSS
        }
        
        currentSlideIndex = nextSlideIndex;
    }

    // Inisialisasi slideshow
    showNextSlide();
    setInterval(showNextSlide, 5000); // Ganti slide setiap 5 detik

    // Fungsi modal untuk fashion cards
    const fashionCards = document.querySelectorAll('.fashion-card');
    const modal = document.getElementById('fashionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close');

    fashionCards.forEach(card => {
        const cardContent = card.querySelector('.card-content');

        cardContent.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const imageSrc = card.querySelector('img').src;
            const description = this.querySelector('.description').textContent;

            modalTitle.textContent = title;
            modalImage.src = imageSrc;
            modalDescription.textContent = description;

            modal.style.display = 'block';
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    const scrollLinks = document.querySelectorAll('.scroll-link');
  
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scroll ke bawah
            header.style.top = `-${headerHeight}px`;
        } else {
            // Scroll ke atas
            header.style.top = '0';
        }
        
        lastScrollTop = scrollTop;
    });
});