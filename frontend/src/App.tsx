import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Auth from './pages/auth/Auth'
import Dashboard from './pages/Dashboard'
import FormBuilder from './pages/FormBuilder'
import PublicForm from './pages/PublicForm'
import ViewEntries from './pages/ViewEntries'
import Home from './pages/Home'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center'>
      <div className='text-yellow-400 font-bold text-xl animate-pulse'>LOADING...</div>
    </div>
  )
  return isAuthenticated ? <>{children}</> : <Navigate to='/auth' />
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/s/:slug' element={<PublicForm />} />

      {/* Protected routes */}
      <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path='/create' element={<PrivateRoute><FormBuilder /></PrivateRoute>} />
      <Route path='/entries/:slambookId' element={<PrivateRoute><ViewEntries /></PrivateRoute>} />

      {/* Default redirect */}
      <Route path='*' element={<Navigate to='/dashboard' />} />
    </Routes>
  )
}

export default App
