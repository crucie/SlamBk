import React, { useEffect, useState } from 'react'
import './Slam.css'
import { TextInput } from '../components/TextInput'
import { TextAreaInput } from '../components/TextAreaInput'
import { ColorInput } from '../components/ColorInput'

function Slam() {

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
    <div className='slam-container'>
      {/* Success Toast */}
      {saveSuccess && (
        <div className='success-toast'>
          <div className='toast-icon'>✓</div>
          <span>Draft saved successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className='slam-header'>
        <h1 className='slam-title'>SlamBk</h1>
        <p className='slam-subtitle'>A Digital Slam Book</p>
      </div>

      {/* Form Container */}
      <form className='slam-form' onSubmit={handleSaveDraft}>
        
        {/* Basic Information */}
        <div className='form-section'>
          <div className='section-header'>
            <h2 className='section-title'>Basic Information</h2>
            <div className='section-divider'></div>
          </div>
          
          <div className='form-grid'>
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
        <div className='form-section'>
          <div className='section-header'>
            <h2 className='section-title'>Favorites</h2>
            <div className='section-divider'></div>
          </div>
          
          <div className='form-grid'>
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
        <div className='form-section'>
          <div className='section-header'>
            <h2 className='section-title'>Personal Messages</h2>
            <div className='section-divider'></div>
          </div>
          
          <TextAreaInput
            label='Best Memory With Me'
            name='bestMemoryWithMe'
            value={draftData.bestMemoryWithMe}
            onChange={(e) => setDraftData(prev => ({...prev, bestMemoryWithMe: e.target.value}))}
            placeholder='Share your best memory...'
            rows={4}
          />
          
          <TextInput
            label='One Word For Me'
            name='oneWordForMe'
            value={draftData.oneWordForMe}
            onChange={handleChange}
            placeholder='Describe me in one word'
          />
          
          <TextAreaInput
            label='Advice For Me'
            name='adviceForMe'
            value={draftData.adviceForMe}
            onChange={(e) => setDraftData(prev => ({...prev, adviceForMe: e.target.value}))}
            placeholder='Share your advice...'
            rows={4}
          />
          
          <TextInput
            label='Crush Name'
            name='crushName'
            value={draftData.crushName}
            onChange={handleChange}
            placeholder='(Optional)'
          />
        </div>

        {/* Buttons */}
        <div className='button-group'>
          <button 
            type='submit' 
            className={`submit-button ${isSaving ? 'saving' : ''}`}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            type='button' 
            className='submit-button-secondary'
            onClick={() => alert('Form will be submitted to backend')}
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default Slam