(function() {
    // ---------- SLIDESHOW DEL HERO ----------
    const slides = document.querySelectorAll('.hero__slide');
    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval;

    function showSlide(index) {
        // Quitar active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        // Activar el slide correspondiente
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    // Iniciar el slideshow automático (5 segundos)
    function startSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Detener si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReducedMotion.matches) {
        startSlideshow();
    }
    prefersReducedMotion.addEventListener('change', (e) => {
        if (e.matches) {
            clearInterval(slideInterval);
        } else {
            startSlideshow();
        }
    });

    // ---------- NAV SCROLL ----------
    const nav = document.getElementById('nav');
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('nav--scrolled', window.scrollY > 30);
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---------- SMOOTH SCROLL FOR NAV LINKS ----------
    document.querySelectorAll('.nav__link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = nav.getBoundingClientRect().height;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---------- REVEAL ON SCROLL ----------
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (el.closest('.gallery-grid')) el.classList.add('gallery-grid__item--visible');
                    else if (el.closest('.about-section')) {
                        if (el.classList.contains('about-section__text')) el.classList.add('about-section__text--visible');
                        if (el.classList.contains('about-section__image-wrapper')) el.classList.add('about-section__image-wrapper--visible');
                    } else if (el.closest('.contact-section')) el.classList.add('contact-form--visible');
                    observer.unobserve(el);
                }
            });
        }, { rootMargin: '0px 0px -40px 0px', threshold: 0.15 });
        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => {
            if (el.closest('.gallery-grid')) el.classList.add('gallery-grid__item--visible');
            else if (el.closest('.about-section')) {
                if (el.classList.contains('about-section__text')) el.classList.add('about-section__text--visible');
                if (el.classList.contains('about-section__image-wrapper')) el.classList.add('about-section__image-wrapper--visible');
            } else if (el.closest('.contact-section')) el.classList.add('contact-form--visible');
        });
    }

    // ---------- LIGHTBOX ----------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-grid__item');

    function openLightbox(imgSrc, altText) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = altText || '';
        lightbox.classList.add('lightbox--open');
        lightbox.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
    }
    function closeLightbox() {
        lightbox.classList.remove('lightbox--open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
    }

    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;
        item.addEventListener('click', () => openLightbox(img.src, img.alt));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(img.src, img.alt);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('lightbox--open')) {
            closeLightbox();
        }
    });

    // ---------- FORMULARIO ----------
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', function() {
        feedback.textContent = 'Enviando… Si es la primera vez, revisa tu correo para confirmar.';
        feedback.classList.add('contact-form__feedback--visible');
        setTimeout(() => {
            feedback.classList.remove('contact-form__feedback--visible');
        }, 8000);
    });
})();
