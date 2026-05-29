import { useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useContent, useAuth } from '../context/AppContext'
import { generateId } from '../utils/helpers'
import { ArrowLeft, Save, X, Twitter } from 'lucide-react'

export default function TweetEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { tweets, addTweet, updateTweet } = useContent()

  const existingTweet = id ? tweets.find(t => t.id === id) : null

  const [formData, setFormData] = useState({
    content: existingTweet?.content || '',
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (existingTweet) {
        updateTweet(id, formData)
      } else {
        addTweet({
          id: generateId(),
          content: formData.content,
          author: {
            name: user?.name || 'Admin',
            username: 'admin',
            verified: true,
          },
          likes: existingTweet?.likes || 0,
          retweets: existingTweet?.retweets || 0,
          replies: existingTweet?.replies || 0,
        })
      }
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error saving tweet:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {existingTweet ? 'Edit Tweet' : 'New Tweet'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-secondary mb-2">
              Tweet Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input-field min-h-[150px] resize-none"
              placeholder="What's happening?"
              maxLength={280}
              rows={6}
              required
            />
            <div className="flex justify-end mt-2">
              <span className={`text-xs ${formData.content.length > 260 ? 'text-orange-500' : 'text-muted'}`}>
                {formData.content.length}/280
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <button
              type="submit"
              disabled={saving || !formData.content.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving...' : existingTweet ? 'Update Tweet' : 'Post Tweet'}
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
