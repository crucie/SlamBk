import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '../../components/TextInput'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'

function Auth() {
  const [authState, setAuthState] = useState<'login' | 'signup'>('login')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await authAPI.login(loginData)
      login(data.data.accessToken, data.data.user)
      setSuccessMsg('Login successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match!')
      setLoading(false)
      return
    }
    try {
      const { data } = await authAPI.signup(signupData)
      login(data.data.accessToken, data.data.user)
      setSuccessMsg('Account created! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300 flex items-center justify-center px-4'>
      {/* Success Toast */}
      {successMsg && (
        <div className='fixed top-4 left-1/2 -translate-x-1/2 bg-green-900 border-4 border-green-400 text-green-300 px-6 py-3 flex items-center gap-2 z-50 font-bold animate-pulse'>
          <span>✓</span>
          <span>{successMsg}</span>
        </div>
      )}

      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8 border-b-4 border-yellow-400 pb-6'>
          <h1 className='text-5xl font-black text-yellow-400 tracking-widest mb-2' style={{ fontFamily: '"Press Start 2P", monospace' }}>SLAMBK</h1>
          <p className='text-yellow-300 text-sm font-bold tracking-wide'>[ Retro Memory Book ]</p>
        </div>

        {/* Tab Navigation */}
        <div className='grid grid-cols-2 gap-2 mb-6'>
          <button
            onClick={() => { setAuthState('login'); setError('') }}
            className={`py-3 border-4 font-bold text-lg transition-all duration-200 ${
              authState === 'login'
                ? 'bg-cyan-900 border-cyan-400 text-cyan-300 scale-105'
                : 'bg-gray-900 border-gray-600 text-gray-400 hover:bg-gray-800 hover:border-gray-400'
            }`}
          >
            [ LOGIN ]
          </button>
          <button
            onClick={() => { setAuthState('signup'); setError('') }}
            className={`py-3 border-4 font-bold text-lg transition-all duration-200 ${
              authState === 'signup'
                ? 'bg-pink-900 border-pink-400 text-pink-300 scale-105'
                : 'bg-gray-900 border-gray-600 text-gray-400 hover:bg-gray-800 hover:border-gray-400'
            }`}
          >
            [ SIGNUP ]
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-900/80 border-4 border-red-400 text-red-300 px-4 py-3 flex items-center gap-2 mb-6 font-bold'>
            <span className='text-lg'>✕</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        {authState === 'login' && (
          <form onSubmit={handleLogin} className='bg-gray-900 border-4 border-cyan-400 p-6 space-y-4'>
            <h2 className='text-2xl font-black text-cyan-400 tracking-wide mb-6' style={{ fontFamily: '"Press Start 2P", monospace' }}>LOGIN</h2>
            <TextInput label='Email / Username' name='email' value={loginData.email} onChange={handleLoginChange} placeholder='user@example.com' required disabled={loading} />
            <TextInput label='Password' name='password' type='password' value={loginData.password} onChange={handleLoginChange} placeholder='••••••••' required disabled={loading} />
            <button type='submit' disabled={loading}
              className='w-full py-3 bg-blue-900 border-4 border-blue-400 text-blue-200 font-bold text-lg hover:bg-blue-800 transition-colors active:bg-blue-700 mt-6 disabled:opacity-50 disabled:cursor-not-allowed'>
              {loading ? '[ LOGGING IN... ]' : '[ LOGIN ]'}
            </button>
          </form>
        )}

        {/* Signup Form */}
        {authState === 'signup' && (
          <form onSubmit={handleSignup} className='bg-gray-900 border-4 border-pink-400 p-6 space-y-4'>
            <h2 className='text-2xl font-black text-pink-400 tracking-wide mb-6' style={{ fontFamily: '"Press Start 2P", monospace' }}>SIGNUP</h2>
            <TextInput label='Username' name='username' value={signupData.username} onChange={handleSignupChange} placeholder='your_username' required disabled={loading} />
            <TextInput label='Email' name='email' type='email' value={signupData.email} onChange={handleSignupChange} placeholder='user@example.com' required disabled={loading} />
            <TextInput label='Password' name='password' type='password' value={signupData.password} onChange={handleSignupChange} placeholder='••••••••' required disabled={loading} />
            <TextInput label='Confirm Password' name='confirmPassword' type='password' value={signupData.confirmPassword} onChange={handleSignupChange} placeholder='••••••••' required disabled={loading} />
            <button type='submit' disabled={loading}
              className='w-full py-3 bg-green-900 border-4 border-green-400 text-green-200 font-bold text-lg hover:bg-green-800 transition-colors active:bg-green-700 mt-6 disabled:opacity-50 disabled:cursor-not-allowed'>
              {loading ? '[ CREATING ACCOUNT... ]' : '[ CREATE ACCOUNT ]'}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className='mt-8 text-center text-xs text-gray-500 border-t-4 border-gray-800 pt-6'>
          <p className='font-bold tracking-wide'>[ 16-BIT ARCADE EDITION ]</p>
          <p className='mt-2'>Your memories, your way.</p>
        </div>
      </div>
    </div>
  )
}

export default Auth