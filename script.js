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

// Staggered children support: add incremental transition delays
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.stagger');
    containers.forEach(container => {
        const step = parseFloat(container.getAttribute('data-stagger-step') || '0.06');
        Array.from(container.children).forEach((child, i) => {
            child.style.transitionDelay = `${(i + 1) * step}s`;
        });
    });
});

// Simple parallax for hero text
(() => {
    const heroInner = document.querySelector('.hero .hero-inner[data-parallax]');
    if (!heroInner) return;
    const speed = parseFloat(heroInner.getAttribute('data-parallax')) || 0.1;
    const onScroll = () => {
        const rect = heroInner.getBoundingClientRect();
        const offset = Math.min(40, Math.max(-40, (window.innerHeight - rect.top) * speed * 0.1));
        heroInner.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// Optional hero video: only show once canplay
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('heroVideo');
    if (!video) return;
    // If you add media/hero.mp4 to the repo, it will play automatically.
    // To use a remote clip, set data-src on the video element.
    const source = video.getAttribute('data-src') || 'media/hero.mp4';
    // Create a source element to avoid 404 flashing
    const s = document.createElement('source');
    s.src = source; s.type = 'video/mp4';
    video.appendChild(s);
    const show = () => { video.classList.add('is-visible'); try { video.play(); } catch (_) {} };
    let played = false;
    video.addEventListener('canplay', () => { played = true; show(); }, { once: true });

    // Fallback: if no video can play, swap in a background image
    const imgFallback = video.getAttribute('data-img');
    setTimeout(() => {
        if (!played && imgFallback) {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'hero-image is-visible';
            imgDiv.style.backgroundImage = `url('${imgFallback}')`;
            video.replaceWith(imgDiv);
        }
    }, 1200);
});

// Micro-interactions for buttons: subtle spring on hover/press
document.addEventListener('DOMContentLoaded', () => {
    const press = (el, scale) => { el.style.transform = `scale(${scale})`; };
    document.querySelectorAll('.btn, nav a').forEach(el => {
        el.style.transition = 'transform .18s cubic-bezier(.2,.8,.2,1.4), box-shadow .18s';
        el.addEventListener('mouseenter', () => press(el, 1.03));
        el.addEventListener('mouseleave', () => press(el, 1));
        el.addEventListener('mousedown', () => press(el, 0.98));
        el.addEventListener('mouseup', () => press(el, 1.02));
        el.addEventListener('blur', () => press(el, 1));
    });
});

// Lightbox for portfolio images
document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.gallery-grid img'));
    if (images.length === 0) return;

    // Build overlay
    const overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.innerHTML = `
        <button class="lb-close" aria-label="Close">Ã—</button>
        <button class="lb-prev" aria-label="Previous">â€¹</button>
        <img class="lb-media" alt="" />
        <button class="lb-next" aria-label="Next">â€º</button>
    `;
    document.body.appendChild(overlay);

    const media = overlay.querySelector('.lb-media');
    const closeBtn = overlay.querySelector('.lb-close');
    const prevBtn = overlay.querySelector('.lb-prev');
    const nextBtn = overlay.querySelector('.lb-next');
    let idx = 0;

    const srcOf = (img) => img.getAttribute('data-src') || img.src;
    const show = (i) => {
        idx = (i + images.length) % images.length;
        media.src = srcOf(images[idx]);
        overlay.classList.add('is-open');
    };
    const hide = () => overlay.classList.remove('is-open');
    const next = () => show(idx + 1);
    const prev = () => show(idx - 1);

    images.forEach((img, i) => img.addEventListener('click', () => show(i)));
    closeBtn.addEventListener('click', hide);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) hide(); });
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('is-open')) return;
        if (e.key === 'Escape') hide();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });
});

// Section transitions + sticky nav active state
document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('main.onepage .section'));
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    if (sections.length === 0) return;

    let current = null;
    const setActive = (id) => {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            if (entry.isIntersecting) {
                if (current && current !== entry.target) current.classList.add('section-leave');
                entry.target.classList.remove('section-leave');
                current = entry.target;
                setActive(id);
            }
        });
    }, { threshold: 0.55 });

    sections.forEach(s => io.observe(s));

    // Smooth scroll for on-page anchors (fallback if browser default is off)
    navLinks.forEach(a => a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href.startsWith('#')) return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
});

// Mobile menu toggle
(function(){
  const btn = document.getElementById('menuToggle');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
})();
