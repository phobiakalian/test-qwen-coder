# YN-BLOG

A modern, minimalist static blog platform built with Vite + React and Tailwind CSS, designed for GitHub Pages deployment.

## Features

- **Dark Mode Design**: Ultra-minimalist dark theme with elegant typography
- **Blog Section**: Articles and news with reading time indicators
- **Stories Section**: Creative narratives and long-form content
- **Tweets Section**: Twitter/X-style microblogging feed
- **Admin Panel**: Protected dashboard for content management
- **LocalStorage Fallback**: Works without database configuration
- **Supabase Integration**: Optional backend for authentication and data persistence

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Markdown**: marked
- **Database (Optional)**: Supabase

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/YN-BLOG.git
cd YN-BLOG

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Admin Credentials (for localStorage mode)
VITE_ADMIN_EMAIL=admin@ynblog.com
VITE_ADMIN_PASSWORD=your_secure_password
```

### Default Admin Credentials (if no env vars set)

- Email: `admin@ynblog.com`
- Password: `admin123`

**⚠️ Change these defaults before deploying!**

## Project Structure

```
YN-BLOG/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions deployment workflow
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── BlogCard.jsx
│   │   ├── StoryCard.jsx
│   │   └── TweetCard.jsx
│   ├── context/            # React Context providers
│   │   └── AppContext.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── StoriesPage.jsx
│   │   ├── TweetsPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── BlogEditorPage.jsx
│   │   ├── StoryEditorPage.jsx
│   │   └── TweetEditorPage.jsx
│   ├── utils/              # Utility functions
│   │   ├── supabase.js
│   │   ├── helpers.js
│   │   └── storage.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Go to Repository Settings → Pages to configure your custom domain

### Manual Setup

1. Go to Repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will deploy automatically on push to `main`

### Required Secrets for GitHub Actions

Configure these in Repository Settings → Secrets and variables → Actions:

- `VITE_SUPABASE_URL` (optional)
- `VITE_SUPABASE_ANON_KEY` (optional)
- `VITE_ADMIN_EMAIL`
- `VITE_ADMIN_PASSWORD`

## Supabase Setup (Optional)

For persistent data and proper authentication:

1. Create a project at [supabase.com](https://supabase.com)
2. Enable Email/Password authentication
3. Create tables for blogs, stories, and tweets
4. Add your credentials to environment variables

## Content Management

### Accessing Admin Panel

1. Navigate to `/admin`
2. Login with your credentials
3. Use the dashboard to:
   - Create/Edit/Delete blog posts
   - Create/Edit/Delete stories
   - Create/Edit/Delete tweets
   - View all content in one place

### Data Storage

- **Without Supabase**: Data stored in browser's LocalStorage
- **With Supabase**: Data persisted in cloud database

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  background: '#0a0a0a',
  surface: '#121212',
  // ... more colors
}
```

### Fonts

Update `index.html` to change Google Fonts imports.

## License

MIT License - feel free to use this template for your personal blog!

## Support

For issues or questions, please open an issue on GitHub.
