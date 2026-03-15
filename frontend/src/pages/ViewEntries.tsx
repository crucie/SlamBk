import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { slambookAPI, entryAPI } from '../services/api'

interface Question {
  _id: string
  questionText: string
  fieldType: string
  isRequired: boolean
}

interface SlambookData {
  _id: string
  title: string
  questions: Question[]
}

interface EntryData {
  _id: string
  fillerName: string
  answers: Record<string, string>
  createdAt: string
}

function ViewEntries() {
  const { slambookId } = useParams<{ slambookId: string }>()
  const navigate = useNavigate()

  const [slambook, setSlambook] = useState<SlambookData | null>(null)
  const [entries, setEntries] = useState<EntryData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

  useEffect(() => {
    if (!slambookId) return
    Promise.all([
      slambookAPI.getById(slambookId),
      entryAPI.getBySlambook(slambookId),
    ])
      .then(([sbRes, entryRes]) => {
        setSlambook(sbRes.data.data)
        setEntries(entryRes.data.data)
      })
      .catch((err) => console.error('Failed to load:', err))
      .finally(() => setLoading(false))
  }, [slambookId])

  const accentColors = [
    'border-cyan-400 bg-cyan-900/20',
    'border-pink-400 bg-pink-900/20',
    'border-green-400 bg-green-900/20',
    'border-orange-400 bg-orange-900/20',
    'border-purple-400 bg-purple-900/20',
  ]

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-950 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-5xl animate-spin inline-block'>⟳</div>
          <p className='text-yellow-400 font-bold mt-4'>LOADING ENTRIES...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300'>
      {/* Header */}
      <div className='bg-gray-900 border-b-4 border-yellow-400 px-6 py-6'>
        <div className='max-w-5xl mx-auto'>
          <button onClick={() => navigate('/dashboard')}
            className='text-sm text-yellow-400 font-bold hover:text-yellow-300 mb-2 inline-block'>
            ◄ BACK TO DASHBOARD
          </button>
          <h1 className='text-3xl font-black text-yellow-400 tracking-widest' style={{ fontFamily: '"Press Start 2P", monospace' }}>
            {slambook?.title.toUpperCase() || 'ENTRIES'}
          </h1>
          <p className='text-cyan-400 font-bold text-sm mt-1'>{entries.length} entries received</p>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-5xl mx-auto px-6 py-8'>
        {/* Empty State */}
        {entries.length === 0 && (
          <div className='bg-gray-900 border-4 border-yellow-400 p-12 text-center'>
            <div className='text-6xl mb-4'>📭</div>
            <h3 className='text-xl font-black text-yellow-400 mb-2' style={{ fontFamily: '"Press Start 2P", monospace' }}>NO ENTRIES YET</h3>
            <p className='text-yellow-300 font-bold'>Share your slambook link with friends to get entries!</p>
          </div>
        )}

        {/* Entries List */}
        {entries.length > 0 && (
          <div className='space-y-4'>
            {entries.map((entry, index) => {
              const color = accentColors[index % accentColors.length]
              const isExpanded = selectedEntry === entry._id
              return (
                <div key={entry._id}
                  className={`border-4 ${color} p-5 cursor-pointer transition-all ${isExpanded ? 'scale-[1.01]' : 'hover:scale-[1.005]'}`}
                  onClick={() => setSelectedEntry(isExpanded ? null : entry._id)}
                >
                  {/* Entry Header */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <span className='text-2xl'>👤</span>
                      <div>
                        <h3 className='font-black text-lg tracking-wide' style={{ fontFamily: '"Press Start 2P", monospace' }}>
                          {entry.fillerName.toUpperCase()}
                        </h3>
                        <p className='text-xs text-gray-500 font-mono mt-1'>
                          {new Date(entry.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className='text-yellow-400 font-bold text-xl'>
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </div>

                  {/* Expanded Answers */}
                  {isExpanded && slambook && (
                    <div className='mt-4 pt-4 border-t-2 border-gray-700 space-y-3'>
                      {slambook.questions.map((q) => {
                        const answer = entry.answers[q._id] || '-'
                        return (
                          <div key={q._id} className='bg-gray-950/50 p-3 border-2 border-gray-800'>
                            <p className='text-xs font-bold text-pink-400 mb-1'>{q.questionText}</p>
                            {q.fieldType === 'color' && answer !== '-' ? (
                              <div className='flex items-center gap-2'>
                                <div className='w-6 h-6 border-2 border-yellow-400' style={{ backgroundColor: answer }} />
                                <span className='text-yellow-100 font-mono text-sm'>{answer}</span>
                              </div>
                            ) : (
                              <p className='text-yellow-100 font-mono text-sm'>{answer}</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewEntries
