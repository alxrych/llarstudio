document.addEventListener('DOMContentLoaded', () => {
    // ---------- ELEMENTOS ----------
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const cookieBanner = document.getElementById('cookie-banner');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const contactForm = document.getElementById('contact-form');
    const langToggle = document.getElementById('lang-toggle');
    const htmlEl = document.documentElement;

    // ---------- AÑO ----------
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // ---------- MENÚ MÓVIL ----------
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const expanded = nav.classList.contains('open');
        navToggle.setAttribute('aria-expanded', expanded);
        navToggle.setAttribute('aria-label', expanded ? 'Cerrar menú' : 'Abrir menú');
    });
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', false);
                navToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });
    });

    // ---------- SCROLL FADE-IN ----------
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    fadeElements.forEach(el => observer.observe(el));

    // ---------- COOKIES ----------
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
        cookieBanner.setAttribute('aria-hidden', 'false');
    }
    document.getElementById('btn-cookies-accept').addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        cookieBanner.setAttribute('aria-hidden', 'true');
    });
    document.getElementById('btn-cookies-reject').addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'rejected');
        cookieBanner.setAttribute('aria-hidden', 'true');
    });
    document.getElementById('btn-cookies-config').addEventListener('click', () => {
        openLegalModal(getLegalText('cookies').title, getLegalText('cookies').content);
    });
    document.getElementById('btn-cookies-policy').addEventListener('click', () => {
        openLegalModal(getLegalText('cookies').title, getLegalText('cookies').content);
    });

    // ---------- MODALES LEGALES ----------
    function openLegalModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.getAttribute('aria-hidden') === 'false') closeModal();
    });

    document.getElementById('btn-legal-aviso').addEventListener('click', () => {
        const leg = getLegalText('aviso');
        openLegalModal(leg.title, leg.content);
    });
    document.getElementById('btn-legal-privacidad').addEventListener('click', () => {
        const leg = getLegalText('privacidad');
        openLegalModal(leg.title, leg.content);
    });
    document.getElementById('btn-legal-cookies').addEventListener('click', () => {
        const leg = getLegalText('cookies');
        openLegalModal(leg.title, leg.content);
    });
    document.getElementById('btn-legal-terminos').addEventListener('click', () => {
        const leg = getLegalText('terminos');
        openLegalModal(leg.title, leg.content);
    });

    // ---------- TRADUCCIONES ----------
    const translations = {
        es: {
            // Navegación
            nav_philosophy: 'Filosofía',
            nav_collection: 'Colección',
            nav_contact: 'Contacto',
            lang_label: 'EN',
            // Hero
            hero_subtitle: 'Diseño biofílico · Decoración sostenible · Piezas que respiran',
            // Filosofía
            philosophy_label: 'Nuestra filosofía',
            philosophy_title: 'Crear espacios<br>que respiran',
            philosophy_p1: 'En <strong>LLAR STUDIO</strong> creemos que los interiores deben ser una extensión del mundo natural. Trabajamos con materiales sostenibles, pigmentos botánicos, ceras vegetales y fibras vivas para dar forma a piezas que transforman cualquier espacio en un refugio sereno.',
            philosophy_p2: 'Cada creación —desde una acuarela pintada a mano con pigmentos de flores hasta una kokedama esculpida con musgo vivo— nace del diálogo entre la tradición artesanal y el diseño contemporáneo.',
            philosophy_accent: '<em>Shaped by Nature. Moldeado por la naturaleza.</em>',
            // Colección
            collection_label: 'Colección',
            collection_title: 'Productos artesanales',
            product1_name: 'Acuarelas Minimalistas',
            product1_desc: 'Pintadas a mano con pigmentos naturales extraídos de plantas y flores. Cada pieza es única.',
            product2_name: 'Velas de Ceras Vegetales',
            product2_desc: 'Moldeadas a mano con ceras 100% vegetales y aromas botánicos. Sin parafinas ni aditivos sintéticos.',
            product3_name: 'Macetas de Cerámica de Arroz',
            product3_desc: 'Artesanales, increíblemente ligeras, inspiradas en formas orgánicas. Cada pieza es irrepetible.',
            product4_name: 'Kokedama',
            product4_desc: 'Plantas aéreas esculpidas sobre bolas de musgo. Esculturas vivas que purifican y embellecen.',
            buy_button: 'Comprar',
            // Contacto
            contact_label: 'Contacto',
            contact_title: 'Hablemos',
            contact_intro: '¿Tienes un proyecto en mente? ¿Necesitas una pieza personalizada? Escríbenos y te responderemos en menos de 48 horas.',
            form_name: 'Nombre',
            form_email: 'Email',
            form_message: 'Mensaje',
            form_send: 'Enviar mensaje',
            form_note: 'Al enviar, se abrirá tu aplicación de correo predeterminada con los datos del formulario.',
            // Footer
            legal_aviso: 'Aviso Legal',
            legal_privacy: 'Política de Privacidad',
            legal_cookies: 'Política de Cookies',
            legal_terms: 'Términos y Condiciones',
            rights: 'Todos los derechos reservados.',
            footer_credits: 'Diseño biofílico & decoración sostenible · Hecho con cuidado artesanal',
            // Cookies
            cookie_text: 'Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y facilitar pagos seguros. Puedes aceptar todas, rechazarlas o <button type="button" class="cookie-banner__link" id="btn-cookies-config">configurarlas</button>. Más información en nuestra <button type="button" class="cookie-banner__link" id="btn-cookies-policy">Política de Cookies</button>.',
            cookie_config: 'configurarlas',
            cookie_policy: 'Política de Cookies',
            accept: 'Aceptar todas',
            reject: 'Rechazar',
            // Placeholders
            placeholder_name: 'Tu nombre',
            placeholder_email: 'tu@email.com',
            placeholder_message: 'Cuéntanos sobre tu proyecto o consulta...',
        },
        en: {
            nav_philosophy: 'Philosophy',
            nav_collection: 'Collection',
            nav_contact: 'Contact',
            lang_label: 'ES',
            hero_subtitle: 'Biophilic design · Sustainable decor · Pieces that breathe',
            philosophy_label: 'Our philosophy',
            philosophy_title: 'Creating spaces<br>that breathe',
            philosophy_p1: 'At <strong>LLAR STUDIO</strong> we believe interiors should be an extension of the natural world. We work with sustainable materials, botanical pigments, vegetable waxes, and living fibers to shape pieces that transform any space into a serene refuge.',
            philosophy_p2: 'Every creation —from a watercolor painted by hand with flower pigments to a kokedama sculpted with living moss— is born from the dialogue between artisanal tradition and contemporary design.',
            philosophy_accent: '<em>Shaped by Nature. Shaped by Nature.</em>',
            collection_label: 'Collection',
            collection_title: 'Handcrafted pieces',
            product1_name: 'Minimalist Watercolors',
            product1_desc: 'Hand-painted with natural pigments extracted from plants and flowers. Each piece is unique.',
            product2_name: 'Vegetable Wax Candles',
            product2_desc: 'Hand-molded with 100% vegetable waxes and botanical aromas. Free of paraffins and synthetic additives.',
            product3_name: 'Rice Ceramic Planters',
            product3_desc: 'Artisanal, incredibly lightweight, inspired by organic forms. No two pieces are alike.',
            product4_name: 'Kokedama',
            product4_desc: 'Air plants sculpted on moss balls. Living sculptures that purify and beautify.',
            buy_button: 'Buy',
            contact_label: 'Contact',
            contact_title: 'Let’s talk',
            contact_intro: 'Have a project in mind? Need a custom piece? Write to us and we’ll reply within 48 hours.',
            form_name: 'Name',
            form_email: 'Email',
            form_message: 'Message',
            form_send: 'Send message',
            form_note: 'When you send, your default mail application will open with the form data.',
            legal_aviso: 'Legal Notice',
            legal_privacy: 'Privacy Policy',
            legal_cookies: 'Cookie Policy',
            legal_terms: 'Terms & Conditions',
            rights: 'All rights reserved.',
            footer_credits: 'Biophilic design & sustainable decor · Made with artisanal care',
            cookie_text: 'We use own and third-party cookies to improve your experience, analyze traffic and facilitate secure payments. You can accept all, reject or <button type="button" class="cookie-banner__link" id="btn-cookies-config">configure</button>. More info in our <button type="button" class="cookie-banner__link" id="btn-cookies-policy">Cookie Policy</button>.',
            cookie_config: 'configure',
            cookie_policy: 'Cookie Policy',
            accept: 'Accept all',
            reject: 'Reject',
            placeholder_name: 'Your name',
            placeholder_email: 'your@email.com',
            placeholder_message: 'Tell us about your project or inquiry...',
        }
    };

    let currentLang = 'es'; // idioma por defecto

    function translatePage(lang) {
        currentLang = lang;
        htmlEl.setAttribute('lang', lang);
        langToggle.textContent = translations[lang].lang_label;

        // Recorrer todos los elementos con data-translate
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                // Si el texto contiene HTML (como el de cookies o filosofía con <strong>/<em>)
                if (key === 'cookie_text' || key === 'philosophy_p1' || key === 'philosophy_p2' || key === 'philosophy_accent') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Actualizar placeholders (no se traducen con data-translate, usamos atributo placeholder)
        document.getElementById('contact-name').placeholder = translations[lang].placeholder_name;
        document.getElementById('contact-email').placeholder = translations[lang].placeholder_email;
        document.getElementById('contact-message').placeholder = translations[lang].placeholder_message;

        // Actualizar los botones de cookie que están dentro del innerHTML del banner
        // Como reinsertamos el HTML, los listeners se pierden; necesitamos reasignarlos.
        // Para simplificar, volvemos a asignar los listeners del cookie banner cada vez que se traduce.
        reasignCookieListeners();
    }

    function reasignCookieListeners() {
        const acceptBtn = document.getElementById('btn-cookies-accept');
        const rejectBtn = document.getElementById('btn-cookies-reject');
        const configBtn = document.getElementById('btn-cookies-config');
        const policyBtn = document.getElementById('btn-cookies-policy');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'accepted');
                cookieBanner.setAttribute('aria-hidden', 'true');
            });
        }
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'rejected');
                cookieBanner.setAttribute('aria-hidden', 'true');
            });
        }
        if (configBtn) {
            configBtn.addEventListener('click', () => {
                const leg = getLegalText('cookies');
                openLegalModal(leg.title, leg.content);
            });
        }
        if (policyBtn) {
            policyBtn.addEventListener('click', () => {
                const leg = getLegalText('cookies');
                openLegalModal(leg.title, leg.content);
            });
        }
    }

    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        translatePage(newLang);
    });

    // Textos legales bilingües
    function getLegalText(type) {
        const legTexts = {
            es: {
                aviso: {
                    title: 'Aviso Legal',
                    content: `<p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa:</p><h4>Titular</h4><p>LLAR STUDIO<br>Email: alxrych@gmail.com<br>Actividad: Diseño de interiores biofílico y decoración sostenible.</p><h4>Condiciones de uso</h4><p>El acceso a este sitio web implica la aceptación de las presentes condiciones.</p>`
                },
                privacidad: {
                    title: 'Política de Privacidad',
                    content: `<p>De acuerdo con el RGPD y LOPDGDD:</p><h4>Responsable</h4><p>LLAR STUDIO – alxrych@gmail.com</p><h4>Finalidad</h4><p>Atender consultas, gestionar pedidos.</p><h4>Derechos</h4><p>Acceder, rectificar, suprimir, limitar, portar y oponerse.</p>`
                },
                cookies: {
                    title: 'Política de Cookies',
                    content: `<p>Utilizamos cookies propias y de terceros para mejorar la experiencia. Puedes configurarlas en tu navegador.</p>`
                },
                terminos: {
                    title: 'Términos y Condiciones',
                    content: `<h4>1. Objeto</h4><p>Condiciones de compra de productos artesanales.</p><h4>2. Precios y pagos</h4><p>Precios con IVA. Pago mediante PayPal.</p><h4>3. Envíos</h4><p>Se informará durante el proceso de compra.</p>`
                }
            },
            en: {
                aviso: {
                    title: 'Legal Notice',
                    content: `<p>In compliance with Spanish Law 34/2002 (LSSI-CE):</p><h4>Owner</h4><p>LLAR STUDIO<br>Email: alxrych@gmail.com<br>Activity: Biophilic interior design and sustainable decor.</p><h4>Terms of use</h4><p>Access to this website implies acceptance of these conditions.</p>`
                },
                privacidad: {
                    title: 'Privacy Policy',
                    content: `<p>According to GDPR:</p><h4>Controller</h4><p>LLAR STUDIO – alxrych@gmail.com</p><h4>Purpose</h4><p>Handle inquiries and orders.</p><h4>Rights</h4><p>Access, rectification, erasure, restriction, portability, objection.</p>`
                },
                cookies: {
                    title: 'Cookie Policy',
                    content: `<p>We use own and third-party cookies to improve your experience. You can configure them in your browser.</p>`
                },
                terminos: {
                    title: 'Terms & Conditions',
                    content: `<h4>1. Scope</h4><p>Conditions for purchasing handcrafted products.</p><h4>2. Prices & payment</h4><p>Prices include VAT. Payment via PayPal.</p><h4>3. Shipping</h4><p>Will be informed during checkout.</p>`
                }
            }
        };
        return legTexts[currentLang][type] || legTexts['es'][type];
    }

    // Inicializar traducción (español por defecto)
    translatePage('es');
    // Asignar listeners iniciales de cookies
    reasignCookieListeners();

    // ---------- FORMULARIO DE CONTACTO ----------
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        if (!name || !email || !message) return;

        const subject = encodeURIComponent('Consulta desde LLAR STUDIO - ' + name);
        const body = encodeURIComponent(
            `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
        );
        window.location.href = `mailto:alxrych@gmail.com?subject=${subject}&body=${body}`;
    });
});