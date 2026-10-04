// Velvet Tiger — Main JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for in-page navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            e.preventDefault();
            const headerOffset = 72;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Header border on scroll
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
        const updateHeader = () => {
            if (window.scrollY > 24) {
                siteHeader.classList.add('border-paper-border');
                siteHeader.classList.remove('border-transparent');
            } else {
                siteHeader.classList.remove('border-paper-border');
                siteHeader.classList.add('border-transparent');
            }
        };
        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive: true });
    }

    // Contact form handling (submits to Kelpie CRM as JSON)
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();

            // Checkboxes sharing a name are joined as "id1,id2"; empty answers are left out
            const formData = new FormData(contactForm);
            const answers = {};
            for (const key of new Set(formData.keys())) {
                const value = formData.getAll(key).map(v => String(v).trim()).filter(Boolean).join(',');
                if (value) answers[key] = value;
            }

            let valid = true;
            contactForm.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
                if (!answers[field.name]) {
                    showFieldError(field.name, 'This field is required.');
                    valid = false;
                }
            });
            contactForm.querySelectorAll('input[type="email"]').forEach(field => {
                if (answers[field.name] && !isValidEmail(answers[field.name])) {
                    showFieldError(field.name, 'Please enter a valid email address.');
                    valid = false;
                }
            });
            if (!valid) {
                showMessage('Please check the highlighted fields.');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            })
            .then(response => response.json().catch(() => ({})).then(data => {
                if (response.status === 201) {
                    const thanks = document.createElement('p');
                    thanks.className = 'text-lg text-ink';
                    thanks.setAttribute('role', 'status');
                    thanks.textContent = data.thank_you_message || 'Thanks. We will be in touch.';
                    contactForm.replaceWith(thanks);
                    return;
                }

                const error = data.error || {};
                (error.details || []).forEach(detail => {
                    showFieldError(String(detail.field || '').replace(/^answers\./, ''), detail.message);
                });
                showMessage(error.message || 'Sorry, there was an error sending your message. Please try again.');
            }))
            .catch(() => {
                showMessage('Sorry, there was an error sending your message. Please try again.');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }

    function showMessage(message) {
        if (formMessages) {
            const box = document.createElement('div');
            box.className = 'p-4 rounded-md text-sm bg-red-50 text-red-800';
            box.textContent = message;
            formMessages.replaceChildren(box);
            formMessages.classList.remove('hidden');
        }
    }

    function showFieldError(name, message) {
        const el = Array.from(contactForm.querySelectorAll('[data-error-for]'))
            .find(node => node.dataset.errorFor === name);
        if (el) {
            el.textContent = message;
            el.classList.remove('hidden');
        }
    }

    function clearErrors() {
        contactForm.querySelectorAll('[data-error-for]').forEach(el => {
            el.textContent = '';
            el.classList.add('hidden');
        });
        if (formMessages) {
            formMessages.replaceChildren();
            formMessages.classList.add('hidden');
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Scroll-based fade-up animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-fade-up');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        observer.observe(el);
    });

    // Mobile menu
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;
    mobileMenuButton.className = 'md:hidden p-2 -mr-2 rounded-md text-ink hover:bg-paper-muted transition-colors';
    mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
    mobileMenuButton.setAttribute('aria-expanded', 'false');

    const nav = document.querySelector('nav .flex');
    const desktopNav = document.querySelector('[data-desktop-nav]');

    if (nav && desktopNav) {
        nav.appendChild(mobileMenuButton);

        const mobileLinks = Array.from(desktopNav.querySelectorAll('a'))
            .map(link => {
                const href = link.getAttribute('href') || '#';
                const label = link.textContent.trim();
                const currentPage = link.getAttribute('aria-current') === 'page';

                return `
                    <a href="${href}" class="block px-1 py-3 border-b border-paper-border text-base font-medium transition-colors ${currentPage ? 'text-accent' : 'text-ink hover:text-accent'}">${label}</a>
                `;
            })
            .join('');

        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'md:hidden absolute top-16 left-0 right-0 bg-paper border-b border-paper-border hidden';
        mobileMenu.innerHTML = `
            <div class="px-5 sm:px-8 py-2">
                ${mobileLinks}
            </div>
        `;

        document.querySelector('header').appendChild(mobileMenu);

        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        };

        mobileMenuButton.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                closeMenu();
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'true');
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const button = document.querySelector('button[aria-label="Toggle mobile menu"]');
            if (button) button.setAttribute('aria-expanded', 'false');
        }
    }
});
