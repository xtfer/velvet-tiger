// Velvet Tiger — Web Components (editorial light)
class ServiceCard extends HTMLElement {
    constructor() {
        super();
        this.originalContent = null;
    }

    static get observedAttributes() {
        return ['title', 'icon', 'description'];
    }

    connectedCallback() {
        if (!this.originalContent) {
            requestAnimationFrame(() => {
                this.originalContent = Array.from(this.children)
                    .map(child => child.innerHTML)
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
        const description = this.getAttribute('description') || '';

        this.innerHTML = `
            <div class="animate-fade-up h-full flex flex-col section-rule pt-8">
                <h3 class="font-display text-xl font-semibold text-ink mb-3">${title}</h3>
                <p class="text-ink-muted leading-relaxed mb-5">
                    ${description}
                </p>
                <ul class="text-ink-muted space-y-2 mt-auto">
                    ${this.originalContent || ''}
                </ul>
            </div>
        `;
    }
}

class ServiceItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.textContent;
        this.innerHTML = `
            <li class="flex items-start gap-2 text-sm leading-relaxed">
                <span class="text-accent mt-1.5 shrink-0" aria-hidden="true">—</span>
                <span>${text}</span>
            </li>
        `;
    }
}

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
            <div class="section-rule pt-8 animate-fade-up">
                <h3 class="font-display text-xl font-semibold text-ink mb-3">${title}</h3>
                <p class="text-ink-muted mb-4 leading-relaxed">
                    ${description}
                </p>
                <div class="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-sm text-ink-faint">
                    ${tags}
                </div>
                <a href="${link}" class="link-underline">Learn more <span aria-hidden="true">→</span></a>
            </div>
        `;
    }
}

class TechTag extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.textContent;
        this.innerHTML = `<span class="tag-quiet">${text}</span>`;
    }
}

class CapabilityCard extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['title', 'icon', 'description', 'number'];
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
        const number = this.getAttribute('number') || '';

        this.innerHTML = `
            <div class="animate-fade-up">
                ${number ? `<span class="block font-display text-sm text-accent mb-3 tracking-widest">${number}</span>` : ''}
                <h3 class="font-display text-lg font-semibold text-ink mb-2">${title}</h3>
                <p class="text-ink-muted text-sm leading-relaxed">${description}</p>
            </div>
        `;
    }
}

class CtaButton extends HTMLElement {
    constructor() {
        super();
        this._label = null;
    }

    static get observedAttributes() {
        return ['href', 'variant'];
    }

    connectedCallback() {
        if (this._label === null) {
            this._label = this.textContent.trim();
        }
        this.render();
    }

    attributeChangedCallback() {
        if (this._label !== null) {
            this.render();
        }
    }

    render() {
        const href = this.getAttribute('href') || '#';
        const variant = this.getAttribute('variant') || 'primary';
        const text = this._label || this.textContent.trim();
        let className = 'btn-primary';
        if (variant === 'secondary') className = 'btn-secondary';
        if (variant === 'link') className = 'btn-link';

        this.innerHTML = `<a href="${href}" class="${className}">${text}</a>`;
    }
}

class SectionHeader extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['title', 'subtitle', 'align'];
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
        const align = this.getAttribute('align') || 'left';
        const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

        this.innerHTML = `
            <div class="mb-12 md:mb-16 ${alignClass}">
                <h2 class="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">${title}</h2>
                ${subtitle ? `<p class="mt-4 text-lg text-ink-muted max-w-2xl ${align === 'center' ? 'mx-auto' : ''} leading-relaxed">${subtitle}</p>` : ''}
            </div>
        `;
    }
}

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
                <label for="${id}" class="block text-sm font-medium text-ink mb-2">
                    ${label}${required ? ' <span class="text-accent">*</span>' : ''}
                </label>
                ${inputElement}
            </div>
        `;
    }
}

class FeatureList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('title') || '';
        const items = Array.from(this.children).map(child => {
            const text = child.textContent;
            return `
                <li class="flex items-start gap-2 text-sm leading-relaxed">
                    <span class="text-accent mt-1.5 shrink-0" aria-hidden="true">—</span>
                    <span>${text}</span>
                </li>
            `;
        }).join('');

        this.innerHTML = `
            ${title ? `<h4 class="font-display text-lg font-semibold text-ink mb-3">${title}</h4>` : ''}
            <ul class="text-ink-muted space-y-2">
                ${items}
            </ul>
        `;
    }
}

customElements.define('service-card', ServiceCard);
customElements.define('service-item', ServiceItem);
customElements.define('portfolio-card', PortfolioCard);
customElements.define('tech-tag', TechTag);
customElements.define('capability-card', CapabilityCard);
customElements.define('cta-button', CtaButton);
customElements.define('section-header', SectionHeader);
customElements.define('form-input', FormInput);
customElements.define('feature-list', FeatureList);

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
