import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AppContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import StoriesPage from './pages/StoriesPage'
import TweetsPage from './pages/TweetsPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import BlogEditorPage from './pages/BlogEditorPage'
import StoryEditorPage from './pages/StoryEditorPage'
import TweetEditorPage from './pages/TweetEditorPage'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/blog" element={<><Navbar /><BlogPage /></>} />
        <Route path="/stories" element={<><Navbar /><StoriesPage /></>} />
        <Route path="/tweets" element={<><Navbar /><TweetsPage /></>} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/new"
          element={
            <ProtectedRoute>
              <BlogEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/edit/:id"
          element={
            <ProtectedRoute>
              <BlogEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stories/new"
          element={
            <ProtectedRoute>
              <StoryEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stories/edit/:id"
          element={
            <ProtectedRoute>
              <StoryEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tweets/new"
          element={
            <ProtectedRoute>
              <TweetEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tweets/edit/:id"
          element={
            <ProtectedRoute>
              <TweetEditorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
