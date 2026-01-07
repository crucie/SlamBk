import React, { useState } from 'react'
import { TextInput } from '../../components/TextInput'

function Auth() {
  const [authState, setAuthState] = useState<'login' | 'signup' | 'forgot'>('login')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [forgotData, setForgotData] = useState({ emailOrUsername: '' })
  const [resetMessage, setResetMessage] = useState('')

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupData(prev => ({ ...prev, [name]: value }))
  }

  const handleForgotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForgotData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt:', loginData)
    alert('Login functionality coming soon!')
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    console.log('Signup attempt:', signupData)
    alert('Signup functionality coming soon!')
  }

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Password reset for:', forgotData)
    setResetMessage(`Reset link sent to ${forgotData.emailOrUsername}!`)
    setTimeout(() => {
      setResetMessage('')
      setAuthState('login')
    }, 3000)
  }

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300 flex items-center justify-center px-4'>
      {/* Success Message */}
      {resetMessage && (
        <div className='fixed top-4 left-1/2 -translate-x-1/2 bg-green-900 border-4 border-green-400 text-green-300 px-4 py-3 flex items-center gap-2 z-50 font-bold'>
          <div className='text-lg'>▓</div>
          <span>{resetMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8 border-b-4 border-yellow-400 pb-6'>
          <h1 className='text-5xl font-black text-yellow-400 tracking-widest pixel-font mb-2'>SLAMBK</h1>
          <p className='text-yellow-300 text-sm font-bold tracking-wide'>[ Retro Memory Book ]</p>
        </div>

        {/* Tab Navigation */}
        <div className='grid grid-cols-2 gap-2 mb-6'>
          <button
            onClick={() => {
              setAuthState('login')
              setResetMessage('')
            }}
            className={`py-3 border-4 font-bold text-lg transition-colors ${
              authState === 'login'
                ? 'bg-cyan-900 border-cyan-400 text-cyan-300'
                : 'bg-gray-900 border-gray-400 text-gray-400 hover:bg-gray-800'
            }`}
          >
            [ LOGIN ]
          </button>
          <button
            onClick={() => {
              setAuthState('signup')
              setResetMessage('')
            }}
            className={`py-3 border-4 font-bold text-lg transition-colors ${
              authState === 'signup'
                ? 'bg-cyan-900 border-cyan-400 text-cyan-300'
                : 'bg-gray-900 border-gray-400 text-gray-400 hover:bg-gray-800'
            }`}
          >
            [ SIGNUP ]
          </button>
        </div>

        {/* Login Form */}
        {authState === 'login' && (
          <form onSubmit={handleLogin} className='bg-gray-900 border-4 border-cyan-400 p-6 space-y-4'>
            <h2 className='text-2xl font-black text-cyan-400 tracking-wide pixel-font mb-6'>LOGIN</h2>
            
            <TextInput
              label='Email / Username'
              name='email'
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder='user@example.com'
              required
            />
            
            <TextInput
              label='Password'
              name='password'
              type='password'
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder='••••••••'
              required
            />

            <button
              type='submit'
              className='w-full py-3 bg-blue-900 border-4 border-blue-400 text-blue-200 font-bold text-lg hover:bg-blue-800 transition-colors active:bg-blue-700 mt-6'
            >
              [ LOGIN ]
            </button>

            <button
              type='button'
              onClick={() => setAuthState('forgot')}
              className='w-full py-2 border-2 border-yellow-400 text-yellow-300 font-bold hover:bg-yellow-900 transition-colors text-sm'
            >
              FORGOT PASSWORD?
            </button>
          </form>
        )}

        {/* Signup Form */}
        {authState === 'signup' && (
          <form onSubmit={handleSignup} className='bg-gray-900 border-4 border-pink-400 p-6 space-y-4'>
            <h2 className='text-2xl font-black text-pink-400 tracking-wide pixel-font mb-6'>SIGNUP</h2>
            
            <TextInput
              label='Username'
              name='username'
              value={signupData.username}
              onChange={handleSignupChange}
              placeholder='your_username'
              required
            />
            
            <TextInput
              label='Email'
              name='email'
              type='email'
              value={signupData.email}
              onChange={handleSignupChange}
              placeholder='user@example.com'
              required
            />
            
            <TextInput
              label='Password'
              name='password'
              type='password'
              value={signupData.password}
              onChange={handleSignupChange}
              placeholder='••••••••'
              required
            />

            <TextInput
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              placeholder='••••••••'
              required
            />

            <button
              type='submit'
              className='w-full py-3 bg-green-900 border-4 border-green-400 text-green-200 font-bold text-lg hover:bg-green-800 transition-colors active:bg-green-700 mt-6'
            >
              [ CREATE ACCOUNT ]
            </button>
          </form>
        )}

        {/* Forgot Password Form */}
        {authState === 'forgot' && (
          <form onSubmit={handleForgot} className='bg-gray-900 border-4 border-orange-400 p-6 space-y-4'>
            <h2 className='text-2xl font-black text-orange-400 tracking-wide pixel-font mb-6'>RESET PASSWORD</h2>
            
            <p className='text-yellow-300 text-sm font-bold mb-4'>
              Enter your email or username to receive a password reset link.
            </p>
            
            <TextInput
              label='Email or Username'
              name='emailOrUsername'
              value={forgotData.emailOrUsername}
              onChange={handleForgotChange}
              placeholder='user@example.com or username'
              required
            />

            <button
              type='submit'
              className='w-full py-3 bg-orange-900 border-4 border-orange-400 text-orange-200 font-bold text-lg hover:bg-orange-800 transition-colors active:bg-orange-700 mt-6'
            >
              [ SEND RESET LINK ]
            </button>

            <button
              type='button'
              onClick={() => setAuthState('login')}
              className='w-full py-2 border-2 border-yellow-400 text-yellow-300 font-bold hover:bg-yellow-900 transition-colors text-sm'
            >
              BACK TO LOGIN
            </button>
          </form>
        )}

        {/* Footer Info */}
        <div className='mt-8 text-center text-xs text-gray-400 border-t-4 border-gray-700 pt-6'>
          <p className='font-bold tracking-wide'>[ 16-BIT ARCADE EDITION ]</p>
          <p className='mt-2'>Your memories, your way.</p>
        </div>
      </div>
    </div>
  )
}

export default Auth