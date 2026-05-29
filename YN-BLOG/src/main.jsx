import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, ContentProvider } from './context/AppContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
