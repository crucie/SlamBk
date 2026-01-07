import React, { useEffect, useState } from 'react'
import { TextInput } from '../../components/TextInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { ColorInput } from '../../components/ColorInput'

interface SlamProps {
  setCurrentPage?: (page: string) => void
}

function Slam({ setCurrentPage }: SlamProps) {

  const [draftData, setDraftData] = useState({
    fullName: '',
    nickName: '',
    dob: '',
    address: '',
    contactNum: '',
    email: '',
    favoriteColor: '',
    favoriteMovie: '',
    favoriteSong: '',
    bestMemoryWithMe: '',
    oneWordForMe: '',
    adviceForMe: '',
    crushName: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('userForm');
    if (savedData) {
      setDraftData(JSON.parse(savedData));
      console.log("data loaded from localStorage:", JSON.parse(savedData));
    }
  }, []);

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value}  = e.target;
    setDraftData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save delay for animation effect
    setTimeout(() => {
      localStorage.setItem('userForm', JSON.stringify(draftData));
      console.log("data saved to localStorage:", draftData);
      setIsSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 500);
  };

  return (
    <div className='min-h-screen bg-gray-950 text-yellow-300'>
      {/* Success Toast */}
      {saveSuccess && (
        <div className='fixed top-4 left-1/2 -translate-x-1/2 bg-green-900 border-4 border-green-400 text-green-300 px-4 py-3 flex items-center gap-2 z-50 font-bold'>
          <div className='text-lg'>▓</div>
          <span>Draft saved!</span>
        </div>
      )}

      {/* Header */}
      <div className='bg-gray-900 border-b-4 border-yellow-400 px-6 py-6'>
        {setCurrentPage && (
          <button className='px-4 py-2 bg-red-900 border-3 border-red-400 text-red-200 font-bold hover:bg-red-800 mb-4 text-sm' onClick={() => setCurrentPage('home')}>
            ◄ BACK
          </button>
        )}
        <h1 className='text-5xl font-black text-yellow-400 tracking-widest pixel-font'>SLAMBK</h1>
        <p className='text-yellow-300 text-sm mt-2 font-bold tracking-wide'>[ A Digital Slam Book ]</p>
      </div>

      {/* Form Container */}
      <form className='max-w-4xl mx-auto px-6 py-8' onSubmit={handleSaveDraft}>
        
        {/* Basic Information */}
        <div className='mb-8 bg-gray-900 border-4 border-cyan-400 p-4'>
          <div className='flex items-center gap-2 mb-4'>
            <h2 className='text-2xl font-black text-cyan-400 tracking-wide pixel-font'>BASIC INFO</h2>
            <div className='flex-1 border-t-2 border-cyan-400'></div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <TextInput
              label='Full Name'
              name='fullName'
              value={draftData.fullName}
              onChange={handleChange}
              placeholder='Enter your full name'
              required
            />
            
            <TextInput
              label='Nickname'
              name='nickName'
              value={draftData.nickName}
              onChange={handleChange}
              placeholder='Enter your nickname'
            />
            
            <TextInput
              label='Date of Birth'
              name='dob'
              type='date'
              value={draftData.dob}
              onChange={handleChange}
              required
            />
            
            <TextInput
              label='Address'
              name='address'
              value={draftData.address}
              onChange={handleChange}
              placeholder='Enter your address'
              required
            />
            
            <TextInput
              label='Contact Number'
              name='contactNum'
              type='tel'
              value={draftData.contactNum}
              onChange={handleChange}
              placeholder='Enter your contact number'
              required
            />
            
            <TextInput
              label='Email'
              name='email'
              type='email'
              value={draftData.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>
        </div>

        {/* Favorites */}
        <div className='mb-8 bg-gray-900 border-4 border-pink-400 p-4'>
          <div className='flex items-center gap-2 mb-4'>
            <h2 className='text-2xl font-black text-pink-400 tracking-wide pixel-font'>FAVORITES</h2>
            <div className='flex-1 border-t-2 border-pink-400'></div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <ColorInput
              label='Favorite Color'
              name='favoriteColor'
              value={draftData.favoriteColor}
              onChange={handleChange}
              placeholder='e.g., Blue'
            />
            
            <TextInput
              label='Favorite Movie'
              name='favoriteMovie'
              value={draftData.favoriteMovie}
              onChange={handleChange}
              placeholder='e.g., Inception'
            />
            
            <TextInput
              label='Favorite Song'
              name='favoriteSong'
              value={draftData.favoriteSong}
              onChange={handleChange}
              placeholder='e.g., Bohemian Rhapsody'
            />
          </div>
        </div>

        {/* Personal Messages */}
        <div className='mb-8 bg-gray-900 border-4 border-green-400 p-4'>
          <div className='flex items-center gap-2 mb-4'>
            <h2 className='text-2xl font-black text-green-400 tracking-wide pixel-font'>MESSAGES</h2>
            <div className='flex-1 border-t-2 border-green-400'></div>
          </div>
          
          <TextAreaInput
            label='Best Memory With Me'
            name='bestMemoryWithMe'
            value={draftData.bestMemoryWithMe}
            onChange={(e) => setDraftData(prev => ({...prev, bestMemoryWithMe: e.target.value}))}
            placeholder='Share your best memory...'
            rows={4}
          />
          
          <div className='mt-4'>
            <TextInput
              label='One Word For Me'
              name='oneWordForMe'
              value={draftData.oneWordForMe}
              onChange={handleChange}
              placeholder='Describe me in one word'
            />
          </div>
          
          <div className='mt-4'>
            <TextAreaInput
              label='Advice For Me'
              name='adviceForMe'
              value={draftData.adviceForMe}
              onChange={(e) => setDraftData(prev => ({...prev, adviceForMe: e.target.value}))}
              placeholder='Share your advice...'
              rows={4}
            />
          </div>
          
          <div className='mt-4'>
            <TextInput
              label='Crush Name'
              name='crushName'
              value={draftData.crushName}
              onChange={handleChange}
              placeholder='(Optional)'
            />
          </div>
        </div>

        {/* Buttons */}
        <div className='flex gap-4 mt-8'>
          <button 
            type='submit' 
            className={`flex-1 px-6 py-3 bg-blue-900 border-4 border-blue-400 text-blue-200 font-bold text-lg hover:bg-blue-800 transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : 'active:bg-blue-700'}`}
            disabled={isSaving}
          >
            {isSaving ? '...SAVING...' : '[ SAVE DRAFT ]'}
          </button>
          <button 
            type='button' 
            className='flex-1 px-6 py-3 bg-green-900 border-4 border-green-400 text-green-200 font-bold text-lg hover:bg-green-800 transition-colors active:bg-green-700'
            onClick={() => alert('Form will be submitted to backend')}
          >
            [ SUBMIT ]
          </button>
        </div>
      </form>
    </div>
  )
}

export default Slam