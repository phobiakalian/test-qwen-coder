const STORAGE_KEYS = {
  BLOGS: 'yn_blog_posts',
  STORIES: 'yn_stories',
  TWEETS: 'yn_tweets',
  ADMIN: 'yn_admin_session',
}

export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('Error writing to localStorage:', error)
    return false
  }
}

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from localStorage:', error)
    return false
  }
}

export const getAllFromStorage = (key) => {
  const data = getFromStorage(key)
  return Array.isArray(data) ? data : []
}

export const addToStorage = (key, item) => {
  const items = getAllFromStorage(key)
  items.unshift({ ...item, createdAt: new Date().toISOString() })
  return setToStorage(key, items)
}

export const updateInStorage = (key, id, updates) => {
  const items = getAllFromStorage(key)
  const index = items.findIndex(item => item.id === id)
  if (index === -1) return false
  items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() }
  return setToStorage(key, items)
}

export const deleteFromStorage = (key, id) => {
  const items = getAllFromStorage(key)
  const filtered = items.filter(item => item.id !== id)
  return setToStorage(key, filtered)
}

export { STORAGE_KEYS }
