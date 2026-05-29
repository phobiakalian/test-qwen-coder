import { useContent } from '../context/AppContext'
import StoryCard from '../components/StoryCard'

export default function StoriesPage() {
  const { stories } = useContent()

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Stories</h1>
          <p className="text-secondary">Creative narratives and long-form content</p>
        </div>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-secondary">No stories yet. Start writing!</p>
          </div>
        )}
      </div>
    </div>
  )
}
