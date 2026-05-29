import { formatRelativeTime } from '../utils/helpers'
import { Heart, Repeat2, MessageCircle, Share } from 'lucide-react'
import { useState } from 'react'

export default function TweetCard({ tweet }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(tweet.likes || 0)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <article className="card p-4 sm:p-6 animate-slide-up">
      <div className="flex gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
            {tweet.author?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white hover:underline cursor-pointer">
              {tweet.author?.name || 'Anonymous'}
            </span>
            {tweet.author?.verified && (
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
              </svg>
            )}
            <span className="text-muted text-sm">@{tweet.author?.username || 'user'}</span>
            <span className="text-muted text-sm">·</span>
            <span className="text-muted text-sm hover:underline cursor-pointer">
              {formatRelativeTime(tweet.createdAt)}
            </span>
          </div>
          
          <p className="mt-2 text-white whitespace-pre-wrap break-words leading-relaxed">
            {tweet.content}
          </p>
          
          {tweet.image && (
            <div className="mt-3 rounded-xl overflow-hidden border border-border">
              <img src={tweet.image} alt="Tweet attachment" className="w-full h-auto max-h-96 object-cover" />
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 max-w-md">
            <button className="flex items-center gap-2 text-muted hover:text-blue-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                <MessageCircle size={18} />
              </div>
              <span className="text-sm">{tweet.replies || 0}</span>
            </button>
            
            <button className="flex items-center gap-2 text-muted hover:text-green-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                <Repeat2 size={18} />
              </div>
              <span className="text-sm">{tweet.retweets || 0}</span>
            </button>
            
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors group ${liked ? 'text-pink-500' : 'text-muted hover:text-pink-500'}`}
            >
              <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
                <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
              </div>
              <span className="text-sm">{likeCount}</span>
            </button>
            
            <button className="flex items-center gap-2 text-muted hover:text-blue-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                <Share size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
