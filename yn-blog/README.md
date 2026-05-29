# YN | BLOG

A modern, high-design personal blog built with Astro, designed for GitHub Pages hosting with automatic deployment via GitHub Actions.

![YN | BLOG](./public/og-image.png)

## ✨ Features

- **Dark Editorial Design** - Professional magazine-style aesthetic with neon yellow accents
- **Fully Responsive** - Mobile-first design that looks great on all devices
- **Dark/Light Mode** - Automatic theme detection with manual toggle
- **Markdown Content** - Write articles in Markdown with front matter metadata
- **Auto Reading Time** - Estimated reading time calculated automatically
- **Tag Filtering** - Browse articles by tags
- **SEO Optimized** - Meta tags, Open Graph, and Twitter cards included
- **Fast Performance** - Zero JavaScript by default, optimized builds
- **GitHub Actions Deploy** - Automatic deployment to GitHub Pages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/username/yn-blog.git
cd yn-blog

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:4321 in your browser
```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 📝 Adding New Articles

1. Create a new file in `src/content/blog/` with format: `your-article-slug.md`

2. Add front matter at the top:

```markdown
---
title: "Your Article Title"
description: "Brief description for SEO and excerpt"
date: 2025-01-15
tags: ["python", "tips"]
author: "YN"
draft: false
---

## Your Content Here

Write your article in Markdown...
```

3. Save and push to main branch - it will auto-deploy!

## 📁 Project Structure

```
yn-blog/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions workflow
├── public/
│   ├── favicon.svg         # Site favicon
│   └── og-image.png        # Social sharing image
├── src/
│   ├── components/
│   │   ├── Navbar.astro    # Navigation bar
│   │   ├── Footer.astro    # Site footer
│   │   └── PostCard.astro  # Article card component
│   ├── content/
│   │   └── blog/           # Markdown articles
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Base HTML template
│   │   └── PostLayout.astro    # Article page layout
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── blog.astro          # All articles page
│   │   ├── about.astro         # About page
│   │   ├── posts/[slug].astro  # Dynamic article pages
│   │   └── tags/[tag].astro    # Tag filter pages
│   └── styles/
│       └── global.css      # Global styles & CSS variables
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## 🎨 Design System

### Colors (Dark Mode)

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-bg` | #0a0a0a | Main background |
| `--color-bg-secondary` | #111111 | Card backgrounds |
| `--color-accent` | #f5e642 | Accent/highlight |
| `--color-text` | #ffffff | Primary text |
| `--color-text-muted` | #a0a0a0 | Secondary text |

### Typography

- **Display**: Bebas Neue (headings, logo)
- **Body**: DM Serif Display (article content)
- **UI**: Inter (navigation, buttons)

## 🔧 Deployment to GitHub Pages

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/yn-blog.git
git push -u origin main
```

### Step 2: Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions**
4. The workflow will run automatically on next push

### Step 3: Access Your Blog

After deployment completes (~2 minutes), your blog will be live at:
`https://username.github.io/yn-blog/`

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 📄 License

MIT License - feel free to use this template for your own blog!

## 🙏 Credits

Built with [Astro](https://astro.build/) - The web framework for content-driven websites.

---

Made with ❤️ by YN
