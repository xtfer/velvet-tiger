# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

Velvet is a small, static, single-page marketing site for Velvet Tiger, built with Tailwind CSS, vanilla JavaScript, and Web Components. The site is served from a compiled `dist/` directory using `live-server` and is designed to be deployable as static assets.

## Commands

All commands below assume Node.js >= 18 and the project root as the working directory.

### Install dependencies

```bash path=null start=null
npm install
```

`package-lock.json` is checked in; prefer `npm` over other package managers to avoid desynchronizing the lockfile.

### Development server (watch mode)

Runs Tailwind, JavaScript, HTML, and image watchers plus a dev server on port 8080, serving from `dist/`.

```bash path=null start=null
npm run dev
# or equivalently
npm start
```

What this does under the hood:
- Ensures `dist/` exists (`prebuild`)
- Copies `index.html` and the `images/` directory into `dist/`
- Builds CSS once (`css:build` → Tailwind from `src/input.css` to `dist/style.css`)
- Starts concurrent watchers:
  - `css:watch`: Tailwind rebuilds `dist/style.css` on changes
  - `js:watch`: esbuild watches `components.js` and `main.js` and outputs bundles to `dist/components.js` and `dist/main.js`
  - `html:watch`: copies `index.html` to `dist/index.html` on change
  - `images:watch`: keeps `dist/images` in sync with `images/`
  - `serve`: `live-server dist --port=8080 --host=localhost --open=/ --wait=200`

### Build static assets

Generates a production-ready static bundle in `dist/`.

```bash path=null start=null
npm run build
```

This will:
- Compile Tailwind CSS from `src/input.css` to `dist/style.css` (minified)
- Bundle and minify `components.js` and `main.js` into IIFE bundles in `dist/` using esbuild
- Run `scripts/build.mjs` to:
  - Write `dist/index.html` based on the root `index.html` (with legacy support for path rewrites)
  - Recursively copy `images/` to `dist/images` if it exists

### Preview built site

Builds the site and serves the compiled `dist/` directory via `live-server`.

```bash path=null start=null
npm run preview
```

This is the best approximation of how the static assets will behave when deployed.

### Tests

There is currently no automated test suite configured. The default `npm test` script is a placeholder that exits with an error. To add tests in the future, first introduce a test runner (e.g., Vitest or Jest) and update the `test` script accordingly; there is no existing convention here yet.

### Linting / formatting

No JavaScript/TypeScript linter or formatter is configured. Tailwind is used purely for CSS generation; there is no additional lint step around it. If you introduce ESLint, Prettier, or similar tooling, also add corresponding `npm run` scripts so future agents can rely on them.

## Code architecture

### Top-level structure

- `index.html` is the single entry point and contains all page sections (hero, about, capabilities, services, portfolio, people, contact) wired together with Tailwind utility classes and custom elements.
- `components.js` defines and registers all Web Components used in the markup.
- `main.js` holds non-component page behavior: navigation, form handling, scroll-based animations, and mobile navigation.
- `tailwind.config.js` configures Tailwind content scanning, theme extensions, and animations.
- `scripts/build.mjs` is a small Node script that assembles the deployable `dist/` directory (HTML plus static assets).
- `dist/` is build output and should be treated as ephemeral/generated.

### Styling and Tailwind pipeline

- Tailwind sources are expected in `src/input.css`, compiled to `dist/style.css` via the `css:*` scripts.
- `tailwind.config.js` declares content paths including `index.html`, `dist/index.html`, `components.js`, `main.js`, and any templates under `src/` so that unused classes can be purged.
- The theme extends Tailwind with:
  - Custom `sunset` and `rose` color palettes used for gradients and accents
  - Background images for gradient utilities (e.g., `bg-gradient-sunset`)
  - Keyframe animations (`fadeIn`, `fadeUp`, `float`) and corresponding utility classes (e.g., `animate-fade-up`)

When working on styling, modify `src/input.css` and Tailwind config rather than editing `dist/style.css` directly.

### Web Components (`components.js`)

`components.js` defines a set of custom elements that encapsulate the visual patterns used across the page. They are registered globally with `customElements.define(...)` so they can be used directly in `index.html`.

Key components:

- **`<service-card>` / `ServiceCard`**
  - Attributes: `title`, `icon` (an SVG path `d` string), `description`.
  - On first connect, it captures the rendered content of its child elements (typically `<service-item>` entries), stores their inner HTML in `originalContent`, and then replaces its own inner HTML with a Tailwind-styled card template that injects that captured list.
  - Subsequent attribute changes simply re-render using the stored `originalContent`.

- **`<service-item>` / `ServiceItem`**
  - Simple helper that wraps its text content in a bullet-point `<li>` element with consistent styling, used inside `service-card` slots.

- **`<portfolio-card>` / `PortfolioCard`**
  - Attributes: `title`, `description`, `link` (defaults to `#contact`).
  - Collects its children (typically pill-like tags) and injects them into a card layout used in the portfolio grid.

- **`<tech-tag>` / `TechTag`**
  - Wraps its text in a styled pill for technology labels.

- **`<capability-card>` / `CapabilityCard`**
  - Attributes: `title`, `icon`, `description`.
  - Renders a capability/feature card with an icon in a gradient block and descriptive text.

- **`<cta-button>` / `CtaButton`**
  - Attributes: `href`, `variant` (`primary` or anything else interpreted as secondary).
  - Wraps its text in an `<a>` tag with the appropriate button class (`btn-primary` or `btn-secondary`), used for hero and section CTAs.

- **`<section-header>` / `SectionHeader`**
  - Attributes: `title`, `subtitle`.
  - Renders a centered section title with optional subtitle and shared styling; used across all main sections to keep headings consistent.

- **`<form-input>` / `FormInput`**
  - Attributes: `label`, `type`, `name`, optional `rows`, and `required`.
  - Generates a labeled input or textarea (`type="textarea"` switches to a `<textarea>`) with consistent Tailwind classes and an `id` derived from `name`.

- **`<feature-list>` / `FeatureList`**
  - Attribute: optional `title`.
  - Converts its children into a styled `<ul>` of bullet points with a shared heading.

For all these components, the source of truth is `components.js`; `index.html` should only use them declaratively.

### Page behavior (`main.js`)

All non-component interactive behavior lives in `main.js`:

- **Smooth in-page navigation**
  - Attaches click handlers to `a[href^="#"]` links.
  - Prevents default behavior, finds the target section, and scrolls smoothly with a fixed `headerOffset` so content is not hidden beneath the fixed nav bar.

- **Contact form handling**
  - Targets the `#contact-form` element and the `#form-messages` container.
  - On submit, prevents default, validates presence of `name`, `email`, `message`, and validates email using a simple regex.
  - Submits via `fetch` to the `formsubmit.co` endpoint specified in the form `action`, with `Accept: application/json` and `FormData` as the body.
  - Displays success or error messages in `#form-messages`, disables the submit button while the request is in-flight, and restores it afterwards.

- **Scroll-based animations**
  - Uses `IntersectionObserver` with a low threshold to detect when elements with the `.animate-fade-up` class enter the viewport.
  - Before observation, those elements are given inline `opacity` and `transform` values; as they intersect, the script transitions them to visible state, complementing the Tailwind-defined keyframes.

- **Mobile navigation**
  - Dynamically creates a hamburger button (visible only on small screens) and appends it to the main nav bar.
  - Builds a hidden mobile menu container attached to the `header`, containing a vertical list of nav links.
  - Clicking the button toggles the menu’s `hidden` class; clicking any link inside the menu closes it again.
  - A global `keydown` listener closes the mobile menu when `Escape` is pressed.

Any new behavior should either be added here or factored into additional modules that are then bundled via the existing esbuild pipeline.

### Build and deployment pipeline

- **esbuild**
  - `js:build` bundles `components.js` and `main.js` into self-contained IIFE scripts under `dist/`, suitable for direct `<script>` tags in `index.html`.
  - `js:watch` runs esbuild in watch mode for rapid local development.

- **Tailwind CLI**
  - `css:build` and `css:watch` run Tailwind directly via `npx`, using `tailwind.config.js` to determine which classes to generate.

- **Static site assembly (`scripts/build.mjs`)**
  - Uses Node’s `fs` and `path` to:
    - Create `dist/` if needed
    - Write `dist/index.html` based on root `index.html` (includes legacy rewrites for `dist/...` asset paths)
    - Copy the `images/` directory recursively into `dist/images` if present

When deploying, use the contents of `dist/` as the static artifact (e.g., for S3, Netlify, Vercel static hosting, or similar).

### Working with assets and `dist/`

- Treat `dist/` as generated; do not hand-edit files there, as they will be overwritten by the dev/build scripts.
- Source-of-truth files for content and layout are `index.html`, `components.js`, `main.js`, and any assets under `images/` and `src/`.
- Image references in `index.html` assume an `images/` directory at the project root; the build pipeline will mirror that into `dist/images`.
