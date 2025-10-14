# Velvet Labs Website

A clean, minimal 1-page website for Velvet Labs - a technology studio and venture foundry building innovative software companies across healthcare, cloud infrastructure, and frontier technology.

🌐 **Live Demo**: [https://velvetlabs.dev](https://velvetlabs.dev) *(placeholder)*

## ✨ Features

- **Modern Design**: Clean, minimal design with professional aesthetics and subtle gradient accents
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices  
- **Performance Focused**: Fast loading with compiled CSS and minimal dependencies
- **SEO Optimized**: Complete meta tags, structured data, and semantic HTML
- **Contact Form**: Functional contact form with validation and success/error handling
- **Smooth Animations**: Floating gradient orbs and scroll-triggered animations
- **Accessibility**: WCAG AA compliant with proper focus management and keyboard navigation
- **Hero Background**: Professional background image with proper positioning and overlays
- **Custom Components**: Reusable @apply utilities for consistent styling

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with accessibility best practices
- **Tailwind CSS v3**: Utility-first CSS framework with custom build process
- **Custom CSS**: @apply utilities and component classes
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Inter Font**: Modern, readable typography from Google Fonts
- **Heroicons**: Clean, minimal SVG icons
- **Formspree**: Contact form handling service
- **Node.js/NPM**: Build toolchain for CSS compilation

## 🚀 Local Development

### Prerequisites

- **Node.js** (v14 or higher)
- **NPM** (comes with Node.js)
- Python 3.x (for local server)
- Modern web browser
- Text editor/IDE

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd velvet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build CSS (one-time)**
   ```bash
   npm run build
   ```

4. **Start development mode (with CSS watching)**
   ```bash
   # Terminal 1: Start CSS watcher
   npm run dev
   
   # Terminal 2: Start local server
   python3 -m http.server 8000
   ```

5. **View the site**
   Open your browser to `http://localhost:8000`

### Project Structure

```
velvet/
├── src/
│   └── input.css           # Source CSS with @tailwind directives
├── dist/
│   └── style.css           # Compiled CSS output
├── images/
│   └── *.jpg               # Background images
├── index.html              # Main HTML file
├── main.js                 # JavaScript for interactivity
├── tailwind.config.js      # Tailwind configuration
├── package.json            # NPM dependencies and scripts
├── README.md               # This file
└── .git/                   # Git repository
```

### NPM Scripts

```bash
npm run build       # Build CSS for production (minified)
npm run dev         # Watch CSS changes during development
npm run build-css   # Same as dev (watch mode)
```

## 🌐 Deployment

### Deploy to Render (Recommended)

Render is perfect for static sites with zero-config deployment:

1. **Push to GitHub/GitLab**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Render Static Site**
   - Go to [Render Dashboard](https://render.com/dashboard)
   - Click "New" → "Static Site"
   - Connect your repository
   - Configure settings:
     - **Root Directory**: `/` (leave empty)
     - **Build Command**: *(leave empty)*
     - **Publish Directory**: `/` (leave empty)
   - Click "Create Static Site"

3. **Custom Domain** *(optional)*
   - In Render dashboard, go to Settings → Custom Domains
   - Add your domain (e.g., `velvetlabs.dev`)
   - Configure DNS records as instructed

### Alternative Deployment Options

**Netlify**
```bash
# Drag and drop the project folder to Netlify dashboard
# Or connect via Git for automatic deployments
```

**Vercel**
```bash
npm i -g vercel
vercel --prod
```

**GitHub Pages**
```bash
# Enable GitHub Pages in repository Settings
# Set source to main branch / (root)
```

## 📧 Contact Form Setup

The contact form uses Formspree for handling submissions. To set it up:

1. **Create Formspree Account**
   - Visit [formspree.io](https://formspree.io)
   - Create a free account
   - Create a new form

2. **Update Form Action**
   - Replace `YOUR_FORM_ID` in `index.html` line 257 with your Formspree form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

3. **Test the Form**
   - Submit a test message to verify it's working
   - Check your email for the confirmation

## 🎨 Customization

### Colors & Branding

The site uses a clean color palette with subtle gradient accents:

- **Primary**: `bg-black`, `text-black` (main brand color)
- **Background**: `bg-white`, `bg-gray-50` (section backgrounds)  
- **Text**: `text-gray-900`, `text-gray-600` (headings and body)
- **Gradient Accents**: `sunset` (orange) and `rose` (pink) colors
- **Custom Gradients**: 
  - `bg-gradient-sunset` - Orange to pink gradient
  - `bg-gradient-sunset-soft` - Subtle light gradient

### Custom CSS Classes

The project includes reusable @apply utilities in `src/input.css`:

```css
.btn-primary        // Orange-pink gradient buttons
.btn-secondary      // Subtle hover effects  
.text-gradient      // Logo gradient text
.form-input         // Styled form inputs
.card-hover         // Hover animations
.nav-link-active    // Navigation link styles
```

### Typography

Using Inter font family with these weights:
- Light (300) - subtle text
- Regular (400) - body text  
- Medium (500) - emphasis
- Semibold (600) - headings
- Bold (700) - strong emphasis

### CSS Development

1. **Edit source CSS**: Modify `src/input.css`
2. **Add custom utilities**: Use @apply directive for reusable classes
3. **Update colors**: Edit `tailwind.config.js` for color palette changes
4. **Rebuild CSS**: Run `npm run build` after changes

### Content Updates

Key sections to customize:

1. **Hero Section**: Main headline and description
2. **About Section**: Company overview
3. **Portfolio Projects**: Update with your actual projects
4. **Contact Form**: Replace `YOUR_FORM_ID` with your Formspree endpoint
5. **Background Images**: Replace images in `/images/` folder

## 🔧 Performance & SEO

### Performance Features

- ✅ Compiled Tailwind CSS (optimized and minified)
- ✅ Custom @apply utilities for reduced CSS size
- ✅ Deferred JavaScript loading
- ✅ Optimized font loading with `font-display: swap`
- ✅ Preconnect to external domains
- ✅ Minimal HTTP requests
- ✅ Background images with proper positioning
- ✅ Floating elements with CSS animations (no JS)

### SEO Features

- ✅ Complete meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Semantic HTML structure
- ✅ Structured navigation with anchor links
- ✅ Proper heading hierarchy (H1 → H2 → H3)

### Lighthouse Scores (Target)

- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 95
- **SEO**: ≥ 95

## 🧪 Testing

### Development Workflow

1. **CSS Changes**: Edit `src/input.css` and run `npm run dev`
2. **Live Reload**: CSS changes automatically compile
3. **Production Build**: Run `npm run build` before deployment
4. **HTML Changes**: Refresh browser to see updates

### Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

### Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 640px - 1024px  
- Desktop: 1024px+

### Validation

- ✅ HTML5 validation via W3C Validator
- ✅ WCAG AA accessibility compliance
- ✅ Cross-browser testing
- ✅ Mobile-first responsive design
- ✅ CSS compilation testing

## 🏗️ Build Process

### CSS Compilation

The project uses Tailwind CSS v3 with a custom build process:

1. **Source**: `src/input.css` contains @tailwind directives and custom @apply utilities
2. **Config**: `tailwind.config.js` defines custom colors, animations, and plugins
3. **Output**: `dist/style.css` is the compiled, minified CSS file
4. **HTML**: References compiled CSS instead of CDN version

### Deployment Preparation

```bash
# 1. Install dependencies
npm install

# 2. Build production CSS
npm run build

# 3. Verify all files are present
ls -la dist/style.css

# 4. Deploy to static host
# (Upload all files including dist/ folder)
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Make changes to `src/input.css` for styling updates
5. Build CSS (`npm run build`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📧 Support

For questions or support, please contact:
- **Email**: [contact@velvetlabs.dev](mailto:contact@velvetlabs.dev) *(update with actual email)*
- **Website**: [https://velvetlabs.dev](https://velvetlabs.dev)

---

**Velvet Labs** - Building the future, one venture at a time. 🚀