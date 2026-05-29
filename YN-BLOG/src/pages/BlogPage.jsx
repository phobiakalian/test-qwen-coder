import { useContent } from '../context/AppContext'
import BlogCard from '../components/BlogCard'

export default function BlogPage() {
  const { blogs } = useContent()

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Blog</h1>
          <p className="text-secondary">Articles, news, and thoughts</p>
        </div>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-secondary">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
