/* script.js */

// Shared UI helpers (kept minimal). Any slideshow code is guarded.

// Optional slideshow support (only runs if .slideshow exists)
(() => {
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) return;

    const slideImages = [];
    const slidesToShow = 3;
    let currentPosition = 0;

    const createSlides = () => {
        slideImages.forEach((imageSrc) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            const img = document.createElement('img');
            img.src = imageSrc;
            img.loading = 'lazy';
            slide.appendChild(img);
            slideshow.appendChild(slide);
        });
    };

    const updateSlidePosition = () => {
        const firstSlide = slideshow.querySelector('.slide');
        if (!firstSlide) return;
        const slideWidth = firstSlide.offsetWidth;
        slideshow.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
    };

    const nextSlide = () => {
        const totalSlides = slideImages.length;
        if (totalSlides === 0) return;
        currentPosition = (currentPosition >= totalSlides - slidesToShow) ? 0 : currentPosition + 1;
        updateSlidePosition();
    };

    let autoInterval;
    const autoSlide = () => {
        clearInterval(autoInterval);
        autoInterval = setInterval(nextSlide, 3000);
    };

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearInterval(autoInterval); else autoSlide();
    });

    createSlides();
    updateSlidePosition();
    autoSlide();
})();
