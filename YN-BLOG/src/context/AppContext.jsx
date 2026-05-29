import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../utils/supabase'
import {
  STORAGE_KEYS,
  getFromStorage,
  setToStorage,
  getAllFromStorage,
  addToStorage,
  updateInStorage,
  deleteFromStorage,
  removeFromStorage,
} from '../utils/storage'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionData = getFromStorage(STORAGE_KEYS.ADMIN)
    if (sessionData && sessionData.expiresAt > Date.now()) {
      setUser(sessionData.user)
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || email,
        avatar: data.user.user_metadata?.avatar_url,
      }
      setToStorage(STORAGE_KEYS.ADMIN, { user: userData, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 })
      setUser(userData)
      return userData
    } else {
      const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@ynblog.com'
      const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const userData = {
          id: 'admin',
          email: email,
          name: 'Admin',
          avatar: null,
        }
        setToStorage(STORAGE_KEYS.ADMIN, { user: userData, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 })
        setUser(userData)
        return userData
      }
      throw new Error('Invalid credentials')
    }
  }, [])

  const logout = useCallback(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut()
    }
    removeFromStorage(STORAGE_KEYS.ADMIN)
    setUser(null)
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

const ContentContext = createContext(null)

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

export const ContentProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const [stories, setStories] = useState([])
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = () => {
      setBlogs(getAllFromStorage(STORAGE_KEYS.BLOGS))
      setStories(getAllFromStorage(STORAGE_KEYS.STORIES))
      setTweets(getAllFromStorage(STORAGE_KEYS.TWEETS))
      setLoading(false)
    }
    loadContent()
  }, [])

  const addBlog = useCallback((blog) => {
    addToStorage(STORAGE_KEYS.BLOGS, blog)
    setBlogs(getAllFromStorage(STORAGE_KEYS.BLOGS))
  }, [])

  const updateBlog = useCallback((id, updates) => {
    updateInStorage(STORAGE_KEYS.BLOGS, id, updates)
    setBlogs(getAllFromStorage(STORAGE_KEYS.BLOGS))
  }, [])

  const deleteBlog = useCallback((id) => {
    deleteFromStorage(STORAGE_KEYS.BLOGS, id)
    setBlogs(getAllFromStorage(STORAGE_KEYS.BLOGS))
  }, [])

  const addStory = useCallback((story) => {
    addToStorage(STORAGE_KEYS.STORIES, story)
    setStories(getAllFromStorage(STORAGE_KEYS.STORIES))
  }, [])

  const updateStory = useCallback((id, updates) => {
    updateInStorage(STORAGE_KEYS.STORIES, id, updates)
    setStories(getAllFromStorage(STORAGE_KEYS.STORIES))
  }, [])

  const deleteStory = useCallback((id) => {
    deleteFromStorage(STORAGE_KEYS.STORIES, id)
    setStories(getAllFromStorage(STORAGE_KEYS.STORIES))
  }, [])

  const addTweet = useCallback((tweet) => {
    addToStorage(STORAGE_KEYS.TWEETS, tweet)
    setTweets(getAllFromStorage(STORAGE_KEYS.TWEETS))
  }, [])

  const updateTweet = useCallback((id, updates) => {
    updateInStorage(STORAGE_KEYS.TWEETS, id, updates)
    setTweets(getAllFromStorage(STORAGE_KEYS.TWEETS))
  }, [])

  const deleteTweet = useCallback((id) => {
    deleteFromStorage(STORAGE_KEYS.TWEETS, id)
    setTweets(getAllFromStorage(STORAGE_KEYS.TWEETS))
  }, [])

  return (
    <ContentContext.Provider value={{
      blogs,
      stories,
      tweets,
      loading,
      addBlog,
      updateBlog,
      deleteBlog,
      addStory,
      updateStory,
      deleteStory,
      addTweet,
      updateTweet,
      deleteTweet,
    }}>
      {children}
    </ContentContext.Provider>
  )
}
