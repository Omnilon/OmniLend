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
    // To use a remote clip, set data-src on the video element (direct .mp4 only).
    const provided = video.getAttribute('data-src');
    const source = (provided && /\.mp4(\?|$)/i.test(provided)) ? provided : 'media/hero.mp4';
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

// Fluid scroll effects: parallax + progress bar
(() => {
  const progress = document.getElementById('scrollProgress');
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax-y]'));

  const onScroll = () => {
    // Progress
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, window.scrollY / (max || 1)));
      progress.style.width = `${pct * 100}%`;
    }

    // Parallax
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax-y')) || 0.08;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed * -1}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Enhanced reveal classes (fx-*)
document.addEventListener('DOMContentLoaded', () => {
  const fxTargets = document.querySelectorAll('.fx-rise, .fx-clip');
  if (fxTargets.length === 0) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-inview'); io.unobserve(e.target); } });
  }, { threshold: 0.2 });
  fxTargets.forEach(el => io.observe(el));
});

// Testimonials: load from JSON and animate carousel
document.addEventListener('DOMContentLoaded', async () => {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;

  const template = (t) => `
    <article class="t-card fx-rise">
      <div class="t-stars" aria-hidden="true"><span>★★★★★</span></div>
      <span class="sr-only">Rated 5 out of 5</span>
      <p class="t-quote">${t.quote}</p>
      <div class="t-meta">
        <img class="t-avatar" src="${t.avatar}" alt="Portrait of ${t.name}" loading="lazy" />
        <div>
          <strong>${t.name}</strong>
          <span class="t-role">${t.role || ''}</span>
        </div>
      </div>
    </article>
  `;

  const src = track.dataset.src;
  if (src) {
    try {
      const res = await fetch(src);
      if (res.ok) {
        const items = await res.json();
        if (Array.isArray(items) && items.length) {
          track.innerHTML = items.map(template).join('');
        }
      }
    } catch (err) {
      console.warn('Testimonials fetch failed', err);
    }
  }

  const cards = track.querySelectorAll('.t-card');
  if (!cards.length) return;

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'dots';
  dotsWrap.innerHTML = Array.from(cards).map((_,i)=>`<span class="dot${i===0?' active':''}"></span>`).join('');
  track.parentElement.appendChild(dotsWrap);

  const next = document.querySelector('#testimonials .c-next');
  const prev = document.querySelector('#testimonials .c-prev');
  const scrollByCard = (dir) => {
    const card = track.querySelector('.t-card');
    const w = card ? card.getBoundingClientRect().width + 18 : 300;
    track.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  next && next.addEventListener('click', () => scrollByCard(1));
  prev && prev.addEventListener('click', () => scrollByCard(-1));

  let auto = setInterval(() => scrollByCard(1), 6000);
  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => auto = setInterval(() => scrollByCard(1), 6000));

  const dots = dotsWrap.querySelectorAll('.dot');
  const updateDots = () => {
    if (!dots.length) return;
    const cardsArr = Array.from(track.querySelectorAll('.t-card'));
    const center = track.scrollLeft + track.clientWidth / 2;
    let idx = 0;
    let minDelta = Infinity;
    cardsArr.forEach((c, i) => {
      const left = track.scrollLeft + c.offsetLeft + c.getBoundingClientRect().width / 2;
      const delta = Math.abs(left - center);
      if (delta < minDelta) { minDelta = delta; idx = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  };
  track.addEventListener('scroll', updateDots, { passive:true });
  setTimeout(updateDots, 500);
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
    }, { threshold: 0.32, rootMargin: '-25% 0px -50% 0px' });

    sections.forEach(s => io.observe(s));

// Smooth scroll for on-page anchors (fallback if browser default is off)
    const ensureSectionReady = (hash) => {
        const id = (hash || '').replace('#','');
        if (!id) return;
        if (id.toLowerCase() === 'portfolio') {
            document.querySelectorAll('#portfolio img[data-src]').forEach(img => {
                if (!img.src) {
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.addEventListener('load', () => {
                            img.classList.add('is-loaded');
                            const fig = img.closest('figure');
                            if (fig) fig.classList.add('is-loaded');
                        }, { once: true });
                    }
                }
            });
            requestAnimationFrame(() => {
                document.querySelectorAll('#portfolio .fx-rise').forEach(el => {
                    el.classList.add('is-inview');
                });
            });
        }
    };
    navLinks.forEach(a => a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href.startsWith('#')) return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        ensureSectionReady(href);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    window.addEventListener('hashchange', () => ensureSectionReady(location.hash));
    ensureSectionReady(location.hash);
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
