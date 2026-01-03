import React from 'react';

interface ColorInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function ColorInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}: ColorInputProps) {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <div className='color-input-wrapper'>
        <input
          id={name}
          type='text'
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='form-input'
        />
        {value && (
          <div 
            className='color-preview'
            style={{backgroundColor: value}}
          ></div>
        )}
      </div>
    </div>
  );
}
