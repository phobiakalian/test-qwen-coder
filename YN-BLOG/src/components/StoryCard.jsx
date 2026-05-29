import { Link } from 'react-router-dom'
import { formatDate, calculateReadingTime } from '../utils/helpers'
import { BookOpen, ArrowRight } from 'lucide-react'

export default function StoryCard({ story }) {
  return (
    <Link to={`/stories/${story.id}`} className="block group">
      <article className="card h-full flex flex-col animate-slide-up">
        {story.image && (
          <div className="relative -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-muted mb-3">
            <span className="px-2 py-1 bg-surface-hover rounded-md flex items-center gap-1">
              <BookOpen size={12} />
              {story.category || 'Story'}
            </span>
            <span>{calculateReadingTime(story.content)} min read</span>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
            {story.title}
          </h3>
          
          <p className="text-secondary text-sm mb-4 line-clamp-3">
            {story.excerpt || story.content?.slice(0, 150)}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <span className="text-xs text-muted">
            {formatDate(story.createdAt)}
          </span>
          <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Read story <ArrowRight size={14} />
          </span>
        </div>
      </article>
    </Link>
  )
}
