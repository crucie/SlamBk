import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { slambookAPI } from '../services/api'

interface SlambookItem {
  _id: string
  title: string
  description: string
  slug: string
  questions: Array<{ questionText: string; fieldType: string; isRequired: boolean }>
  isActive: boolean
  createdAt: string
}

function Dashboard() {
  const [slambooks, setSlambooks] = useState<SlambookItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSlambooks()
  }, [])

  const fetchSlambooks = async () => {
    try {
      const { data } = await slambookAPI.getMine()
      setSlambooks(data.data)
    } catch (err) {
      console.error('Failed to fetch slambooks:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await slambookAPI.delete(id)
      setSlambooks(prev => prev.filter(s => s._id !== id))
      setShowDeleteModal(null)
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const copyLink = (slug: string) => {
    const link = `${window.location.origin}/s/${slug}`
    navigator.clipboard.writeText(link)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  const accentColors = [
    { border: 'border-cyan-400', bg: 'bg-cyan-900/30', text: 'text-cyan-400', hover: 'hover:bg-cyan-900/50' },
    { border: 'border-pink-400', bg: 'bg-pink-900/30', text: 'text-pink-400', hover: 'hover:bg-pink-900/50' },
    { border: 'border-green-400', bg: 'bg-green-900/30', text: 'text-green-400', hover: 'hover:bg-green-900/50' },
    { border: 'border-orange-400', bg: 'bg-orange-900/30', text: 'text-orange-400', hover: 'hover:bg-orange-900/50' },
    { border: 'border-purple-400', bg: 'bg-purple-900/30', text: 'text-purple-400', hover: 'hover:bg-purple-900/50' },
    { border: 'border-yellow-400', bg: 'bg-yellow-900/30', text: 'text-yellow-400', hover: 'hover:bg-yellow-900/50' },
  ]

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300'>
      {/* Copied Toast */}
      {copiedSlug && (
        <div className='fixed top-4 left-1/2 -translate-x-1/2 bg-green-900 border-4 border-green-400 text-green-300 px-6 py-3 flex items-center gap-2 z-50 font-bold animate-pulse'>
          <span>✓</span> Link copied to clipboard!
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'>
          <div className='bg-gray-900 border-4 border-red-400 p-6 max-w-sm w-full'>
            <h3 className='text-xl font-black text-red-400 mb-4' style={{ fontFamily: '"Press Start 2P", monospace' }}>DELETE?</h3>
            <p className='text-yellow-300 mb-6 font-bold'>This action cannot be undone. All entries will be lost.</p>
            <div className='flex gap-3'>
              <button onClick={() => setShowDeleteModal(null)}
                className='flex-1 py-2 bg-gray-800 border-4 border-gray-600 text-gray-300 font-bold hover:bg-gray-700 transition-colors'>
                CANCEL
              </button>
              <button onClick={() => handleDelete(showDeleteModal)}
                className='flex-1 py-2 bg-red-900 border-4 border-red-400 text-red-200 font-bold hover:bg-red-800 transition-colors'>
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className='bg-gray-900 border-b-4 border-yellow-400 px-6 py-6'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-black text-yellow-400 tracking-widest' style={{ fontFamily: '"Press Start 2P", monospace' }}>SLAMBK</h1>
            <p className='text-yellow-300 text-sm mt-2 font-bold tracking-wide'>[ Dashboard ]</p>
          </div>
          <div className='flex gap-3 items-center'>
            <span className='text-cyan-400 font-bold text-sm hidden sm:block'>
              👤 {user?.username?.toUpperCase()}
            </span>
            <button onClick={handleLogout}
              className='px-4 py-2 bg-red-900 border-3 border-red-400 text-red-200 font-bold hover:bg-red-800 transition-colors text-sm'>
              [ LOGOUT ]
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-6 py-8'>
        {/* Action Bar */}
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-black text-cyan-400 tracking-wide' style={{ fontFamily: '"Press Start 2P", monospace' }}>
            MY SLAMBOOKS [{slambooks.length}]
          </h2>
          <button
            onClick={() => navigate('/create')}
            className='px-6 py-3 bg-green-900 border-4 border-green-400 text-green-200 font-bold hover:bg-green-800 transition-all hover:scale-105 active:scale-95'
          >
            + CREATE NEW
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className='text-center py-16'>
            <div className='text-4xl animate-spin inline-block'>⟳</div>
            <p className='text-yellow-400 font-bold mt-4'>LOADING...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && slambooks.length === 0 && (
          <div className='bg-gray-900 border-4 border-yellow-400 p-12 text-center'>
            <div className='text-6xl mb-4'>📖</div>
            <h3 className='text-2xl font-black text-yellow-400 mb-2' style={{ fontFamily: '"Press Start 2P", monospace' }}>NO SLAMBOOKS YET</h3>
            <p className='text-yellow-300 font-bold mb-6'>Create your first slambook and share it with friends!</p>
            <button
              onClick={() => navigate('/create')}
              className='px-8 py-3 bg-green-900 border-4 border-green-400 text-green-200 font-bold hover:bg-green-800 transition-all hover:scale-105'
            >
              + CREATE YOUR FIRST SLAMBOOK
            </button>
          </div>
        )}

        {/* Slambooks Grid */}
        {!loading && slambooks.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {slambooks.map((sb, index) => {
              const color = accentColors[index % accentColors.length]
              return (
                <div key={sb._id} className={`bg-gray-900 border-4 ${color.border} ${color.bg} p-5 flex flex-col transition-all hover:scale-[1.02] hover:shadow-lg`}>
                  {/* Polaroid-style card */}
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-3'>
                      <h3 className={`text-lg font-black ${color.text} tracking-wide`} style={{ fontFamily: '"Press Start 2P", monospace' }}>
                        {sb.title.toUpperCase()}
                      </h3>
                      <span className={`text-xs font-bold px-2 py-1 border-2 ${sb.isActive ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'}`}>
                        {sb.isActive ? 'LIVE' : 'OFF'}
                      </span>
                    </div>
                    {sb.description && (
                      <p className='text-yellow-300/70 text-sm font-bold mb-3'>{sb.description}</p>
                    )}
                    <p className='text-gray-500 text-xs font-mono mb-1'>
                      {sb.questions.length} questions • {new Date(sb.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className='grid grid-cols-3 gap-2 mt-4 border-t-2 border-gray-700 pt-4'>
                    <button onClick={() => navigate(`/entries/${sb._id}`)}
                      className='py-2 bg-blue-900/50 border-2 border-blue-400 text-blue-300 font-bold text-xs hover:bg-blue-900 transition-colors'>
                      ENTRIES
                    </button>
                    <button onClick={() => copyLink(sb.slug)}
                      className='py-2 bg-purple-900/50 border-2 border-purple-400 text-purple-300 font-bold text-xs hover:bg-purple-900 transition-colors'>
                      {copiedSlug === sb.slug ? '✓ COPIED' : 'SHARE'}
                    </button>
                    <button onClick={() => setShowDeleteModal(sb._id)}
                      className='py-2 bg-red-900/50 border-2 border-red-400 text-red-300 font-bold text-xs hover:bg-red-900 transition-colors'>
                      DELETE
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
