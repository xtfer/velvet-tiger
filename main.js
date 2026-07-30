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

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(() => {
                showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }

    function showMessage(message, type) {
        if (formMessages) {
            formMessages.innerHTML = `
                <div class="p-4 rounded-md text-sm ${type === 'success' ? 'bg-accent-soft text-accent' : 'bg-red-50 text-red-800'}">
                    ${message}
                </div>
            `;
            formMessages.classList.remove('hidden');

            setTimeout(() => {
                formMessages.classList.add('hidden');
            }, 5000);
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
