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

// Scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
    const revealables = Array.from(document.querySelectorAll('.reveal'));
    if (revealables.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        revealables.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    revealables.forEach(el => observer.observe(el));
});

// Lazy-load portfolio images with a skeleton shimmer
document.addEventListener('DOMContentLoaded', () => {
    const figures = document.querySelectorAll('.gallery-grid figure');
    if (figures.length === 0) return;

    const loadImg = (img, figure) => {
        const src = img.getAttribute('data-src');
        if (!src) return;
        img.src = src;
        img.addEventListener('load', () => {
            img.classList.add('is-loaded');
            figure.classList.add('is-loaded');
        }, { once: true });
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                loadImg(img, entry.target);
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px 0px' });

    figures.forEach(f => io.observe(f));
});
