import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useContent, useAuth } from '../context/AppContext'
import { generateId } from '../utils/helpers'
import { ArrowLeft, Save, X, Plus, Edit2, Trash2, FileText, BookOpen, Twitter } from 'lucide-react'
import { formatDate } from '../utils/helpers'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { blogs, stories, tweets, deleteBlog, deleteStory, deleteTweet } = useContent()
  const [activeTab, setActiveTab] = useState('all')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const tabs = [
    { id: 'all', label: 'All Content', count: blogs.length + stories.length + tweets.length },
    { id: 'blogs', label: 'Blogs', count: blogs.length },
    { id: 'stories', label: 'Stories', count: stories.length },
    { id: 'tweets', label: 'Tweets', count: tweets.length },
  ]

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Site
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-muted">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-secondary text-sm">
              Logout
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-secondary">Manage your blog posts, stories, and tweets</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'bg-surface text-secondary hover:text-white hover:bg-surface-hover'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="grid gap-4 mb-8">
          {(activeTab === 'all' || activeTab === 'blogs') && blogs.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText size={20} /> Blog Posts
              </h2>
              {blogs.filter(b => activeTab === 'all' || b.type === 'blog').map((blog) => (
                <div key={blog.id} className="card p-4 flex items-center justify-between group">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{blog.title}</h3>
                    <p className="text-sm text-muted mt-1">
                      {formatDate(blog.createdAt)} • {blog.category || 'Blog'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                      className="p-2 text-secondary hover:text-white hover:bg-surface-hover rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="p-2 text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'stories') && stories.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen size={20} /> Stories
              </h2>
              {stories.filter(s => activeTab === 'all' || s.type === 'story').map((story) => (
                <div key={story.id} className="card p-4 flex items-center justify-between group">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{story.title}</h3>
                    <p className="text-sm text-muted mt-1">
                      {formatDate(story.createdAt)} • {story.category || 'Story'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/stories/edit/${story.id}`)}
                      className="p-2 text-secondary hover:text-white hover:bg-surface-hover rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteStory(story.id)}
                      className="p-2 text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'tweets') && tweets.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Twitter size={20} /> Tweets
              </h2>
              {tweets.filter(t => activeTab === 'all' || t.type === 'tweet').map((tweet) => (
                <div key={tweet.id} className="card p-4 flex items-center justify-between group">
                  <div className="flex-1 min-w-0">
                    <p className="text-white truncate">{tweet.content}</p>
                    <p className="text-sm text-muted mt-1">{formatDate(tweet.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/tweets/edit/${tweet.id}`)}
                      className="p-2 text-secondary hover:text-white hover:bg-surface-hover rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteTweet(tweet.id)}
                      className="p-2 text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {((activeTab === 'blogs' && blogs.length === 0) ||
            (activeTab === 'stories' && stories.length === 0) ||
            (activeTab === 'tweets' && tweets.length === 0) ||
            (activeTab === 'all' && blogs.length === 0 && stories.length === 0 && tweets.length === 0)) && (
            <div className="card p-12 text-center">
              <p className="text-secondary mb-4">No content yet. Start creating!</p>
            </div>
          )}
        </div>

        <div className="fixed bottom-8 right-8 flex flex-col gap-3">
          <Link
            to="/admin/tweets/new"
            className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:bg-surface-hover transition-colors shadow-lg"
            title="New Tweet"
          >
            <Twitter size={24} />
          </Link>
          <Link
            to="/admin/stories/new"
            className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:bg-surface-hover transition-colors shadow-lg"
            title="New Story"
          >
            <BookOpen size={24} />
          </Link>
          <Link
            to="/admin/blog/new"
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors shadow-lg"
            title="New Blog Post"
          >
            <Plus size={24} />
          </Link>
        </div>
      </div>
    </div>
  )
}
