import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { slambookAPI } from '../services/api'

interface Question {
  questionText: string
  fieldType: 'text' | 'long-text' | 'number' | 'date' | 'color'
  isRequired: boolean
}

const FIELD_TYPES = [
  { value: 'text', label: 'Short Text', icon: '✏️' },
  { value: 'long-text', label: 'Long Text', icon: '📝' },
  { value: 'number', label: 'Number', icon: '#️⃣' },
  { value: 'date', label: 'Date', icon: '📅' },
  { value: 'color', label: 'Color', icon: '🎨' },
] as const

function FormBuilder() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    { questionText: '', fieldType: 'text', isRequired: false },
  ])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const addQuestion = () => {
    setQuestions(prev => [...prev, { questionText: '', fieldType: 'text', isRequired: false }])
  }

  const removeQuestion = (index: number) => {
    if (questions.length <= 1) return
    setQuestions(prev => prev.filter((_, i) => i !== index))
  }

  const updateQuestion = (index: number, field: keyof Question, value: string | boolean) => {
    setQuestions(prev => prev.map((q, i) => i === index ? { ...q, [field]: value } : q))
  }

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= questions.length) return
    const newQuestions = [...questions]
    ;[newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]]
    setQuestions(newQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    const validQuestions = questions.filter(q => q.questionText.trim())
    if (validQuestions.length === 0) {
      setError('Add at least one question')
      return
    }

    setSaving(true)
    try {
      await slambookAPI.create({ title, description, questions: validQuestions })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create slambook')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300'>
      {/* Header */}
      <div className='bg-gray-900 border-b-4 border-yellow-400 px-6 py-6'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <div>
            <button onClick={() => navigate('/dashboard')}
              className='text-sm text-yellow-400 font-bold hover:text-yellow-300 mb-2 inline-block'>
              ◄ BACK TO DASHBOARD
            </button>
            <h1 className='text-3xl font-black text-yellow-400 tracking-widest' style={{ fontFamily: '"Press Start 2P", monospace' }}>
              CREATE SLAMBOOK
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='max-w-4xl mx-auto px-6 py-8 space-y-8'>
        {/* Error */}
        {error && (
          <div className='bg-red-900/80 border-4 border-red-400 text-red-300 px-4 py-3 font-bold'>
            ✕ {error}
          </div>
        )}

        {/* Title & Description */}
        <div className='bg-gray-900 border-4 border-cyan-400 p-6'>
          <h2 className='text-xl font-black text-cyan-400 mb-4' style={{ fontFamily: '"Press Start 2P", monospace' }}>DETAILS</h2>
          <div className='space-y-4'>
            <div>
              <label className='text-sm font-bold text-yellow-300 block mb-2'>
                SLAMBOOK TITLE <span className='text-red-400'>*</span>
              </label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='e.g., Batch 2026 Memories'
                className='w-full px-4 py-3 bg-gray-950 border-4 border-yellow-400 text-yellow-100 placeholder-gray-600 font-mono focus:outline-none focus:border-yellow-300'
                required
              />
            </div>
            <div>
              <label className='text-sm font-bold text-yellow-300 block mb-2'>DESCRIPTION</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='A short description for your friends...'
                rows={2}
                className='w-full px-4 py-3 bg-gray-950 border-4 border-yellow-400 text-yellow-100 placeholder-gray-600 font-mono resize-vertical focus:outline-none focus:border-yellow-300'
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className='bg-gray-900 border-4 border-pink-400 p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-black text-pink-400' style={{ fontFamily: '"Press Start 2P", monospace' }}>QUESTIONS [{questions.length}]</h2>
            <button type='button' onClick={addQuestion}
              className='px-4 py-2 bg-green-900 border-3 border-green-400 text-green-200 font-bold hover:bg-green-800 transition-colors text-sm'>
              + ADD QUESTION
            </button>
          </div>

          <div className='space-y-4'>
            {questions.map((q, index) => (
              <div key={index} className='bg-gray-950 border-3 border-gray-700 p-4'>
                <div className='flex items-center gap-2 mb-3'>
                  <span className='text-pink-400 font-black text-sm'>Q{index + 1}</span>
                  <div className='flex-1' />
                  {index > 0 && (
                    <button type='button' onClick={() => moveQuestion(index, 'up')}
                      className='text-yellow-400 font-bold text-sm hover:text-yellow-300 px-1'>▲</button>
                  )}
                  {index < questions.length - 1 && (
                    <button type='button' onClick={() => moveQuestion(index, 'down')}
                      className='text-yellow-400 font-bold text-sm hover:text-yellow-300 px-1'>▼</button>
                  )}
                  {questions.length > 1 && (
                    <button type='button' onClick={() => removeQuestion(index)}
                      className='text-red-400 font-bold text-sm hover:text-red-300 px-1'>✕</button>
                  )}
                </div>

                <input
                  type='text'
                  value={q.questionText}
                  onChange={(e) => updateQuestion(index, 'questionText', e.target.value)}
                  placeholder='Enter your question...'
                  className='w-full px-3 py-2 bg-gray-900 border-3 border-pink-400/50 text-yellow-100 placeholder-gray-600 font-mono text-sm mb-3 focus:outline-none focus:border-pink-400'
                />

                <div className='flex flex-wrap gap-3 items-center'>
                  <div className='flex items-center gap-2'>
                    <label className='text-xs font-bold text-gray-400'>TYPE:</label>
                    <select
                      value={q.fieldType}
                      onChange={(e) => updateQuestion(index, 'fieldType', e.target.value)}
                      className='px-2 py-1 bg-gray-900 border-2 border-gray-600 text-yellow-100 font-mono text-xs focus:outline-none focus:border-yellow-400'
                    >
                      {FIELD_TYPES.map(ft => (
                        <option key={ft.value} value={ft.value}>{ft.icon} {ft.label}</option>
                      ))}
                    </select>
                  </div>

                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={q.isRequired}
                      onChange={(e) => updateQuestion(index, 'isRequired', e.target.checked)}
                      className='accent-pink-400'
                    />
                    <span className='text-xs font-bold text-gray-400'>REQUIRED</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className='flex gap-4'>
          <button type='button' onClick={() => navigate('/dashboard')}
            className='flex-1 py-3 bg-gray-800 border-4 border-gray-600 text-gray-300 font-bold text-lg hover:bg-gray-700 transition-colors'>
            CANCEL
          </button>
          <button type='submit' disabled={saving}
            className='flex-1 py-3 bg-green-900 border-4 border-green-400 text-green-200 font-bold text-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
            {saving ? '[ CREATING... ]' : '[ CREATE SLAMBOOK ]'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormBuilder
