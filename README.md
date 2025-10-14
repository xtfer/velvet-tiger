# Velvet Labs Website

A clean, minimal 1-page website for Velvet Labs - a technology studio and venture foundry building innovative software companies across healthcare, cloud infrastructure, and frontier technology.

🌐 **Live Demo**: [https://velvetlabs.dev](https://velvetlabs.dev) *(placeholder)*

## ✨ Features

- **Modern Design**: Clean, minimal design with professional aesthetics
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices  
- **Performance Focused**: Fast loading with optimized assets and minimal dependencies
- **SEO Optimized**: Complete meta tags, structured data, and semantic HTML
- **Contact Form**: Functional contact form with validation and success/error handling
- **Smooth Animations**: Subtle fade-in and scroll-triggered animations
- **Accessibility**: WCAG AA compliant with proper focus management and keyboard navigation

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with accessibility best practices
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Inter Font**: Modern, readable typography from Google Fonts
- **Heroicons**: Clean, minimal SVG icons
- **Formspree**: Contact form handling service

## 🚀 Local Development

### Prerequisites

- Python 3.x (for local server)
- Modern web browser
- Text editor/IDE

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd velvet
   ```

2. **Start local development server**
   ```bash
   python3 -m http.server 8000
   ```

3. **View the site**
   Open your browser to `http://localhost:8000`

### Project Structure

```
velvet/
├── index.html          # Main HTML file
├── main.js             # JavaScript for interactivity
├── README.md           # This file
└── .git/               # Git repository (if initialized)
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

The site uses a neutral color palette defined in Tailwind classes:

- **Primary**: `bg-black`, `text-black` (main brand color)
- **Background**: `bg-white`, `bg-gray-50` (section backgrounds)  
- **Text**: `text-gray-900`, `text-gray-600` (headings and body)
- **Accents**: `border-gray-200`, `hover:bg-gray-800` (subtle UI elements)

### Typography

Using Inter font family with these weights:
- Light (300) - subtle text
- Regular (400) - body text  
- Medium (500) - emphasis
- Semibold (600) - headings
- Bold (700) - strong emphasis

### Content Updates

Key sections to customize:

1. **Hero Section** (lines 93-97): Main headline and description
2. **About Section** (lines 115-117): Company overview
3. **Portfolio Projects** (lines 194-240): Update with your actual projects
4. **Contact Form** (line 257): Replace with your Formspree endpoint

## 🔧 Performance & SEO

### Performance Features

- ✅ Tailwind CSS via CDN (no build step required)
- ✅ Deferred JavaScript loading
- ✅ Optimized font loading with `font-display: swap`
- ✅ Preconnect to external domains
- ✅ Minimal HTTP requests
- ✅ Lazy loading ready (for images when added)

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For questions or support, please contact:
- **Email**: [contact@velvetlabs.dev](mailto:contact@velvetlabs.dev) *(update with actual email)*
- **Website**: [https://velvetlabs.dev](https://velvetlabs.dev)

---

**Velvet Labs** - Building the future, one venture at a time. 🚀