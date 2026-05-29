import { useState } from 'react'
import { useContent } from '../context/AppContext'
import TweetCard from '../components/TweetCard'
import { Twitter, Send } from 'lucide-react'

export default function TweetsPage() {
  const { tweets, addTweet } = useContent()
  const [newTweet, setNewTweet] = useState('')

  const handlePostTweet = (e) => {
    e.preventDefault()
    if (!newTweet.trim()) return

    addTweet({
      id: Date.now().toString(),
      content: newTweet,
      author: {
        name: 'YN-BLOG',
        username: 'ynblog',
        verified: true,
      },
      likes: 0,
      retweets: 0,
      replies: 0,
    })
    setNewTweet('')
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Twitter className="text-blue-500" size={32} />
            Tweets
          </h1>
          <p className="text-secondary">Microblog updates and quick thoughts</p>
        </div>

        <form onSubmit={handlePostTweet} className="card mb-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              Y
            </div>
            <div className="flex-1">
              <textarea
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-transparent text-white placeholder-muted resize-none focus:outline-none min-h-[100px]"
                maxLength={280}
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className={`text-xs ${newTweet.length > 260 ? 'text-orange-500' : 'text-muted'}`}>
                  {newTweet.length}/280
                </span>
                <button
                  type="submit"
                  disabled={!newTweet.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))
          ) : (
            <div className="card p-12 text-center">
              <p className="text-secondary">No tweets yet. Be the first to post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
