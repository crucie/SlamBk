import axios from 'axios'
import { useState, useEffect } from 'react'

interface User {
  _id: string
  nickName: string
  fullName: string
  contactNum: string
}

function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    axios.get('/api/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log('found Error: ', error)
      })
  }, [])

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowProfile(false)
  }

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300'>
      {/* Header */}
      <div className='bg-gray-900 border-b-4 border-yellow-400 px-6 py-6'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <div>
            <h1 className='text-5xl font-black text-yellow-400 tracking-widest pixel-font'>SLAMBK</h1>
            <p className='text-yellow-300 text-sm mt-2 font-bold tracking-wide'>[ Memory Gallery ]</p>
          </div>

          {/* Top Right Actions */}
          <div className='flex gap-3 items-center'>
            {/* Create Link Button */}
            <button className='px-6 py-3 bg-cyan-900 border-4 border-cyan-400 text-cyan-200 font-bold hover:bg-cyan-800 transition-colors active:bg-cyan-700'>
              [ CREATE LINK ]
            </button>

            {/* Profile/Auth Button */}
            {isLoggedIn ? (
              <div className='relative'>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className='w-12 h-12 bg-pink-900 border-4 border-pink-400 text-pink-300 font-bold hover:bg-pink-800 transition-colors flex items-center justify-center text-xl'
                >
                  👤
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className='absolute right-0 mt-2 bg-gray-900 border-4 border-pink-400 w-48 z-50'>
                    <button className='w-full px-4 py-2 text-pink-300 font-bold border-b-2 border-pink-400 hover:bg-pink-900 text-left'>
                      [ VIEW PROFILE ]
                    </button>
                    <button
                      onClick={handleLogout}
                      className='w-full px-4 py-3 text-red-300 font-bold hover:bg-red-900 text-left'
                    >
                      [ LOGOUT ]
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoggedIn(true)}
                className='px-6 py-3 bg-green-900 border-4 border-green-400 text-green-200 font-bold hover:bg-green-800 transition-colors active:bg-green-700'
              >
                [ LOGIN ]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Users Grid */}
        <div className='mb-8'>
          <h2 className='text-3xl font-black text-cyan-400 tracking-wide pixel-font mb-6'>
            USERS DIRECTORY [ {users.length} ]
          </h2>

          {/* Users Grid Container */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {users?.map((user: User) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(selectedUser?._id === user._id ? null : user)}
                className={`cursor-pointer transition-all transform hover:scale-105 ${
                  selectedUser?._id === user._id
                    ? 'bg-cyan-900 border-4 border-cyan-300 shadow-lg'
                    : 'bg-gray-900 border-4 border-cyan-400 hover:border-cyan-300'
                }`}
              >
                {/* User Card */}
                <div className='p-4'>
                  {/* Profile Icon */}
                  <div className='text-5xl text-center mb-4 font-bold'>👤</div>

                  {/* User Info */}
                  <div className='text-center space-y-2 border-t-2 border-cyan-400 pt-4'>
                    <h3 className='text-xl font-black text-cyan-300 tracking-wide'>
                      {user.nickName?.toUpperCase() || 'UNKNOWN'}
                    </h3>
                    <p className='text-sm text-yellow-300 font-bold'>
                      {user.fullName || 'N/A'}
                    </p>
                    <p className='text-xs text-green-400 font-mono'>
                      {user.contactNum || 'No Contact'}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  {selectedUser?._id === user._id && (
                    <div className='mt-4 text-center text-yellow-400 font-bold'>
                      ► SELECTED ◄
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className='bg-gray-900 border-4 border-yellow-400 p-8 text-center'>
              <p className='text-2xl font-black text-yellow-400 pixel-font'>NO USERS FOUND</p>
              <p className='text-yellow-300 mt-2'>Start creating slams to see memories here!</p>
            </div>
          )}
        </div>

        {/* Selected User Details */}
        {selectedUser && (
          <div className='bg-gray-900 border-4 border-pink-400 p-8 mt-8'>
            <h3 className='text-3xl font-black text-pink-400 tracking-wide pixel-font mb-6'>
              PROFILE [ {selectedUser.nickName.toUpperCase()} ]
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 border-t-2 border-pink-400 pt-6'>
              <div>
                <p className='text-yellow-400 font-bold text-sm mb-2'>NICKNAME:</p>
                <p className='text-yellow-300 text-lg font-mono'>{selectedUser.nickName}</p>
              </div>

              <div>
                <p className='text-yellow-400 font-bold text-sm mb-2'>FULL NAME:</p>
                <p className='text-yellow-300 text-lg font-mono'>{selectedUser.fullName}</p>
              </div>

              <div>
                <p className='text-yellow-400 font-bold text-sm mb-2'>CONTACT:</p>
                <p className='text-yellow-300 text-lg font-mono'>{selectedUser.contactNum}</p>
              </div>

              <div className='flex gap-2'>
                <button className='flex-1 px-4 py-3 bg-blue-900 border-4 border-blue-400 text-blue-200 font-bold hover:bg-blue-800 transition-colors'>
                  [ ADD MEMORY ]
                </button>
                <button className='flex-1 px-4 py-3 bg-green-900 border-4 border-green-400 text-green-200 font-bold hover:bg-green-800 transition-colors'>
                  [ VIEW MEMORIES ]
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
