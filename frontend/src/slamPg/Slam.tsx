import React, { useEffect, useState } from 'react'



function Slam() {

  const [draftData, setDraftData] = useState({
    name: '',
    contact: '',
    nickname: '',
    dob: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('userForm');
    if (savedData) {
      setDraftData(JSON.parse(savedData));
      console.log("data loaded from localStorage:", JSON.parse(savedData));
    }
  }, []);

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value}  = e.target;
    setDraftData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userForm', JSON.stringify(draftData));
    console.log("data saved to localStorage:", draftData);
    alert('Draft saved successfully!');
  };



  return (
    <div className='flex flex-col justify-between '>
      
      <form className='flex flex-col p-4 border justify-evenly' onSubmit={handleSaveDraft}>
        <input
          type='text'
          name='name'
          className='p-2 border'
          placeholder='fullName'
          value={draftData.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='contact'
          className='p-2 border'
          placeholder='Contact'
          value={draftData.contact}
          onChange={handleChange}
        />
        <input
          type='text'
          name='nickname'
          className='p-2 border'
          placeholder='NickName'
          value={draftData.nickname}
          onChange={handleChange}
        />
        <input
          type='text'
          name='dob'
          className='p-2 border'
          placeholder='DateOfBirth'
          value={draftData.dob}
          onChange={handleChange}
        />
        <button type='submit' className=' w-full border p-4'>
          Save Draft
        </button>
      </form>

      


    </div>
  )
}

export default Slam