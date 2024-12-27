// Selectors
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const slideInterval = 3000;

// Show the current slide
function showSlide(index) {
    // Ensure index is within bounds
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    // Move the carousel
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Show the next slide
function nextSlide() {
    showSlide(currentIndex + 1);
}

// Show the previous slide
function prevSlide() {
    showSlide(currentIndex - 1);
}

// Event Listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide functionality
let autoSlide = setInterval(nextSlide, slideInterval);

// Pause auto-slide on interaction
[prevBtn, nextBtn].forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval); // Resume auto-slide
    });
});
