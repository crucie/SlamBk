import React, { useState, useEffect } from 'react'
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
  description: string
  questions: Question[]
  slug: string
}

function PublicForm() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [slambook, setSlambook] = useState<SlambookData | null>(null)
  const [loading, setLoading] = useState(true)
  const [fillerName, setFillerName] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return
    slambookAPI.getPublic(slug)
      .then(({ data }) => setSlambook(data.data))
      .catch(() => setError('Slambook not found or is no longer active'))
      .finally(() => setLoading(false))
  }, [slug])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!slambook || !fillerName.trim()) return
    setSubmitting(true)
    setError('')
    try {
      await entryAPI.submit(slambook._id, { fillerName, answers })
      setSubmitted(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  const renderInput = (q: Question) => {
    const value = answers[q._id] || ''
    const common = 'w-full px-4 py-3 bg-gray-950 border-4 border-yellow-400 text-yellow-100 placeholder-gray-600 font-mono focus:outline-none focus:border-yellow-300'
    
    switch (q.fieldType) {
      case 'long-text':
        return (
          <textarea
            value={value}
            onChange={(e) => handleAnswerChange(q._id, e.target.value)}
            placeholder='Type your answer...'
            rows={3}
            className={`${common} resize-vertical`}
            required={q.isRequired}
          />
        )
      case 'number':
        return (
          <input type='number' value={value}
            onChange={(e) => handleAnswerChange(q._id, e.target.value)}
            placeholder='Enter a number...'
            className={common} required={q.isRequired}
          />
        )
      case 'date':
        return (
          <input type='date' value={value}
            onChange={(e) => handleAnswerChange(q._id, e.target.value)}
            className={common} required={q.isRequired}
          />
        )
      case 'color':
        return (
          <div className='flex gap-3 items-center'>
            <input type='color' value={value || '#ff6b9d'}
              onChange={(e) => handleAnswerChange(q._id, e.target.value)}
              className='w-14 h-14 border-4 border-yellow-400 bg-gray-950 cursor-pointer'
            />
            <input type='text' value={value}
              onChange={(e) => handleAnswerChange(q._id, e.target.value)}
              placeholder='or type a color name...'
              className={`flex-1 ${common}`}
            />
          </div>
        )
      default: // text
        return (
          <input type='text' value={value}
            onChange={(e) => handleAnswerChange(q._id, e.target.value)}
            placeholder='Type your answer...'
            className={common} required={q.isRequired}
          />
        )
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-950 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-5xl animate-spin inline-block'>⟳</div>
          <p className='text-yellow-400 font-bold mt-4'>LOADING SLAMBOOK...</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>
        <div className='max-w-md w-full text-center'>
          <div className='bg-gray-900 border-4 border-green-400 p-8'>
            <div className='text-6xl mb-4'>🎉</div>
            <h2 className='text-2xl font-black text-green-400 mb-4' style={{ fontFamily: '"Press Start 2P", monospace' }}>
              SUBMITTED!
            </h2>
            <p className='text-yellow-300 font-bold mb-6'>
              Your answers have been recorded. Thanks for filling out this slambook!
            </p>
            <button onClick={() => navigate('/auth')}
              className='w-full py-3 bg-pink-900 border-4 border-pink-400 text-pink-200 font-bold text-lg hover:bg-pink-800 transition-all hover:scale-105'>
              ★ CREATE YOUR OWN SLAMBK! ★
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!slambook) {
    return (
      <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>
        <div className='bg-gray-900 border-4 border-red-400 p-8 text-center max-w-md'>
          <div className='text-5xl mb-4'>😢</div>
          <h2 className='text-2xl font-black text-red-400 mb-4' style={{ fontFamily: '"Press Start 2P", monospace' }}>NOT FOUND</h2>
          <p className='text-yellow-300 font-bold'>{error || 'This slambook does not exist or is no longer active.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300'>
      {/* Header */}
      <div className='bg-gray-900 border-b-4 border-pink-400 px-6 py-6'>
        <div className='max-w-2xl mx-auto text-center'>
          <p className='text-pink-400 text-sm font-bold mb-1'>YOU'VE BEEN INVITED TO FILL</p>
          <h1 className='text-3xl font-black text-yellow-400 tracking-widest' style={{ fontFamily: '"Press Start 2P", monospace' }}>
            {slambook.title.toUpperCase()}
          </h1>
          {slambook.description && (
            <p className='text-yellow-300/60 text-sm mt-2 font-bold'>{slambook.description}</p>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto px-6 py-8 space-y-6'>
        {/* Error */}
        {error && (
          <div className='bg-red-900/80 border-4 border-red-400 text-red-300 px-4 py-3 font-bold'>
            ✕ {error}
          </div>
        )}

        {/* Your Name */}
        <div className='bg-gray-900 border-4 border-cyan-400 p-5'>
          <label className='text-sm font-bold text-cyan-400 block mb-2'>
            YOUR NAME <span className='text-red-400'>*</span>
          </label>
          <input
            type='text'
            value={fillerName}
            onChange={(e) => setFillerName(e.target.value)}
            placeholder="What's your name?"
            className='w-full px-4 py-3 bg-gray-950 border-4 border-cyan-400 text-yellow-100 placeholder-gray-600 font-mono focus:outline-none focus:border-cyan-300'
            required
          />
        </div>

        {/* Questions */}
        {slambook.questions.map((q, index) => (
          <div key={q._id} className='bg-gray-900 border-4 border-yellow-400/50 p-5'>
            <label className='text-sm font-bold text-yellow-400 block mb-3'>
              <span className='text-pink-400 mr-2'>Q{index + 1}.</span>
              {q.questionText}
              {q.isRequired && <span className='text-red-400 ml-1'>*</span>}
            </label>
            {renderInput(q)}
          </div>
        ))}

        {/* Submit */}
        <button type='submit' disabled={submitting}
          className='w-full py-4 bg-green-900 border-4 border-green-400 text-green-200 font-bold text-xl hover:bg-green-800 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'>
          {submitting ? '[ SUBMITTING... ]' : '[ SUBMIT MY ANSWERS ]'}
        </button>
      </form>
    </div>
  )
}

export default PublicForm
