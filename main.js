// Velvet Labs - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Submit form via fetch (fallback to regular form submission if needed)
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
            .catch(error => {
                showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Show form status messages
    function showMessage(message, type) {
        if (formMessages) {
            formMessages.innerHTML = `
                <div class="p-4 rounded-lg ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                    ${message}
                </div>
            `;
            formMessages.classList.remove('hidden');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                formMessages.classList.add('hidden');
            }, 5000);
        }
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-up animation
    const animateElements = document.querySelectorAll('.animate-fade-up');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
    
    // Add mobile menu toggle (if needed for smaller screens)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;
    mobileMenuButton.className = 'md:hidden p-2 rounded-md hover:bg-gray-100';
    mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
    
    // Insert mobile menu button
    const nav = document.querySelector('nav .flex');
    if (nav) {
        nav.appendChild(mobileMenuButton);
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg hidden';
        mobileMenu.innerHTML = `
            <div class="px-4 py-2 space-y-1">
                <a href="#about" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">About</a>
                <a href="#capabilities" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Capabilities</a>
                <a href="#portfolio" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Portfolio</a>
                <a href="#contact" class="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Contact</a>
            </div>
        `;
        
        document.querySelector('header').appendChild(mobileMenu);
        
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Add subtle parallax effect to hero section (optional)
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.getElementById('hero');
        
        if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
});

// Add keyboard accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.md\\:hidden.absolute');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});