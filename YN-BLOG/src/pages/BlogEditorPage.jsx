import { useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useContent, useAuth } from '../context/AppContext'
import { generateId } from '../utils/helpers'
import { ArrowLeft, Save, X } from 'lucide-react'

export default function BlogEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { blogs, addBlog, updateBlog } = useContent()

  const existingBlog = id ? blogs.find(b => b.id === id) : null

  const [formData, setFormData] = useState({
    title: existingBlog?.title || '',
    excerpt: existingBlog?.excerpt || '',
    content: existingBlog?.content || '',
    image: existingBlog?.image || '',
    category: existingBlog?.category || 'Blog',
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (existingBlog) {
        updateBlog(id, formData)
      } else {
        addBlog({
          id: generateId(),
          author: { name: user?.name || 'Admin', username: 'admin', verified: true },
          ...formData,
        })
      }
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error saving blog:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {existingBlog ? 'Edit Blog Post' : 'New Blog Post'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-secondary mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Enter blog title..."
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-secondary mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="input-field min-h-[100px]"
              placeholder="Brief description..."
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-secondary mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input-field min-h-[300px] font-mono text-sm"
              placeholder="Write your blog content here (Markdown supported)..."
              rows={12}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-secondary mb-2">
              Image URL (optional)
            </label>
            <input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-secondary mb-2">
              Category
            </label>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
              placeholder="e.g., Technology, Life, News"
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving...' : existingBlog ? 'Update Post' : 'Publish Post'}
            </button>
            <Link
              to="/admin/dashboard"
              className="btn-secondary flex items-center gap-2"
            >
              <X size={18} />
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
