import { useContent } from '../context/AppContext'
import BlogCard from '../components/BlogCard'
import StoryCard from '../components/StoryCard'
import TweetCard from '../components/TweetCard'
import { FileText, BookOpen, Twitter } from 'lucide-react'

export default function HomePage() {
  const { blogs, stories, tweets } = useContent()

  const recentBlogs = blogs.slice(0, 3)
  const recentStories = stories.slice(0, 2)
  const recentTweets = tweets.slice(0, 5)

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Welcome to YN-BLOG
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            A minimalist platform for articles, stories, and microblog updates.
            Explore thoughts, narratives, and quick updates in one place.
          </p>
        </div>

        {recentTweets.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Twitter className="text-blue-500" size={24} />
                Latest Tweets
              </h2>
              <a href="/tweets" className="text-accent text-sm font-medium hover:underline">
                View all →
              </a>
            </div>
            <div className="space-y-4">
              {recentTweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
              ))}
            </div>
          </section>
        )}

        {recentBlogs.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="text-accent" size={24} />
                Recent Blog Posts
              </h2>
              <a href="/blog" className="text-accent text-sm font-medium hover:underline">
                View all →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}

        {recentStories.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="text-purple-500" size={24} />
                Featured Stories
              </h2>
              <a href="/stories" className="text-accent text-sm font-medium hover:underline">
                View all →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        )}

        {blogs.length === 0 && stories.length === 0 && tweets.length === 0 && (
          <div className="card p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">No content yet</h2>
            <p className="text-secondary mb-6">
              This is a fresh blog. Log in to the admin panel to start creating content.
            </p>
            <a href="/admin" className="btn-primary inline-block">
              Go to Admin Panel
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
