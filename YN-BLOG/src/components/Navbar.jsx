import { Link, useLocation } from 'react-router-dom'
import { Home, FileText, BookOpen, Twitter, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/blog', icon: FileText, label: 'Blog' },
  { path: '/stories', icon: BookOpen, label: 'Stories' },
  { path: '/tweets', icon: Twitter, label: 'Tweets' },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold tracking-tight hover:text-gray-300 transition-colors">
            YN-BLOG
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-surface text-white'
                      : 'text-secondary hover:text-white hover:bg-surface-hover'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:text-white hover:bg-surface-hover transition-all duration-200"
            >
              <User size={18} />
              Admin
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-secondary hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-surface text-white'
                      : 'text-secondary hover:text-white hover:bg-surface-hover'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-secondary hover:text-white hover:bg-surface-hover transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={18} />
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
