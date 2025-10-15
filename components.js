// Velvet Labs - Web Components
// Custom elements for reusable UI components
class ServiceCard extends HTMLElement {
    constructor() {
        super();
        this.originalContent = null;
    }

    static get observedAttributes() {
        return ['title', 'icon', 'description'];
    }

    connectedCallback() {
        // Wait for children to render, then capture their innerHTML
        if (!this.originalContent) {
            requestAnimationFrame(() => {
                this.originalContent = Array.from(this.children)
                    .map(child => child.innerHTML) // Get the rendered content, not the element
                    .join('');
                this.render();
            });
            return;
        }
        this.render();
    }

    attributeChangedCallback() {
        if (this.originalContent !== null) {
            this.render();
        }
    }

    render() {
        const title = this.getAttribute('title') || '';
        const icon = this.getAttribute('icon') || '';
        const description = this.getAttribute('description') || '';

        this.innerHTML = `
            <div class="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-gray-200/50 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-300 animate-fade-up">
                <div class="flex items-center mb-6">
                    <div class="w-12 h-12 bg-gradient-sunset rounded-lg flex items-center justify-center mr-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-900">${title}</h3>
                </div>
                <p class="text-gray-600 mb-4 leading-relaxed">
                    ${description}
                </p>
                <ul class="text-gray-600 space-y-2">
                    ${this.originalContent || ''}
                </ul>
            </div>
        `;
    }
}
// Service List Item Component
class ServiceItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.textContent;
        this.innerHTML = `
            <li class="flex items-start">
                <span class="text-sunset-500 mr-2 mt-1">•</span>
                <span>${text}</span>
            </li>
        `;
    }
}

// Portfolio Card Component
class PortfolioCard extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['title', 'description', 'link'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || '';
        const description = this.getAttribute('description') || '';
        const link = this.getAttribute('link') || '#contact';
        const tags = Array.from(this.children).map(child => child.outerHTML).join('');

        this.innerHTML = `
            <div class="bg-white/90 backdrop-blur-sm rounded-lg border border-shocking-200/50 overflow-hidden hover:shadow-xl hover:shadow-shocking-200/20 transition-all duration-300 animate-fade-up">
                <div class="p-6 border-l-4 border-shocking-500">
                    <h3 class="text-xl font-semibold text-shocking-800 mb-3">${title}</h3>
                    <p class="text-shocking-700 mb-4">
                        ${description}
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${tags}
                    </div>
                    <a href="${link}" class="text-shocking-600 hover:text-shocking-500 font-medium text-sm">Learn More →</a>
                </div>
            </div>
        `;
    }
}

// Technology Tag Component
class TechTag extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.textContent;
        this.innerHTML = `
            <span class="px-3 py-1 bg-shocking-100 text-shocking-700 text-sm rounded-full">${text}</span>
        `;
    }
}

// Capability Card Component
class CapabilityCard extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['title', 'icon', 'description'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || '';
        const icon = this.getAttribute('icon') || '';
        const description = this.getAttribute('description') || '';

        this.innerHTML = `
            <div class="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-shocking-200/50 hover:shadow-xl hover:shadow-shocking-200/20 transition-all duration-300 animate-fade-up">
                <div class="w-12 h-12 bg-gradient-shocking rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-shocking-800 mb-2">${title}</h3>
                <p class="text-shocking-700">${description}</p>
            </div>
        `;
    }
}

// CTA Button Component
class CtaButton extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['href', 'variant'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const href = this.getAttribute('href') || '#';
        const variant = this.getAttribute('variant') || 'primary';
        const text = this.textContent;
        const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

        this.innerHTML = `
            <a href="${href}" class="${className}">
                ${text}
            </a>
        `;
    }
}

// Section Header Component
class SectionHeader extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['title', 'subtitle'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';

        this.innerHTML = `
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-semibold text-gradient mb-4">${title}</h2>
                ${subtitle ? `<p class="text-lg text-gray-600 max-w-3xl mx-auto">${subtitle}</p>` : ''}
            </div>
        `;
    }
}

// Form Input Component
class FormInput extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['label', 'type', 'name', 'required', 'rows'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const label = this.getAttribute('label') || '';
        const type = this.getAttribute('type') || 'text';
        const name = this.getAttribute('name') || '';
        const required = this.hasAttribute('required') ? 'required' : '';
        const rows = this.getAttribute('rows');
        const id = `form-${name}`;

        let inputElement;
        if (type === 'textarea') {
            inputElement = `<textarea id="${id}" name="${name}" rows="${rows || 6}" ${required} 
                           class="form-input"></textarea>`;
        } else {
            inputElement = `<input type="${type}" id="${id}" name="${name}" ${required} 
                           class="form-input">`;
        }

        this.innerHTML = `
            <div>
                <label for="${id}" class="block text-sm font-medium text-shocking-700 mb-2">
                    ${label} ${required ? '*' : ''}
                </label>
                ${inputElement}
            </div>
        `;
    }
}

// Feature List Component
class FeatureList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('title') || '';
        const items = Array.from(this.children).map(child => {
            const text = child.textContent;
            return `
                <li class="flex items-start">
                    <span class="text-sunset-500 mr-2 mt-1">•</span>
                    <span>${text}</span>
                </li>
            `;
        }).join('');

        this.innerHTML = `
            ${title ? `<h4 class="text-lg font-semibold text-gray-900 mb-3">${title}</h4>` : ''}
            <ul class="text-gray-600 space-y-2">
                ${items}
            </ul>
        `;
    }
}

// Register all custom elements
customElements.define('service-card', ServiceCard);
customElements.define('service-item', ServiceItem);
customElements.define('portfolio-card', PortfolioCard);
customElements.define('tech-tag', TechTag);
customElements.define('capability-card', CapabilityCard);
customElements.define('cta-button', CtaButton);
customElements.define('section-header', SectionHeader);
customElements.define('form-input', FormInput);
customElements.define('feature-list', FeatureList);

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ServiceCard,
        ServiceItem,
        PortfolioCard,
        TechTag,
        CapabilityCard,
        CtaButton,
        SectionHeader,
        FormInput,
        FeatureList
    };
}