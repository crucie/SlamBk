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
    <div className='flex flex-col gap-2'>
      <label htmlFor={name} className='text-sm font-bold text-yellow-300 pixel-font tracking-wide'>{label}</label>
      <div className='flex gap-3 items-center'>
        <input
          id={name}
          type='text'
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='flex-1 px-3 py-2 bg-gray-900 border-4 border-yellow-400 text-yellow-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 font-mono text-sm'
          style={{imageRendering: 'pixelated'}}
        />
        {value && (
          <div 
            className='w-10 h-10 border-4 border-yellow-400 shrink-0'
            style={{backgroundColor: value, imageRendering: 'pixelated'}}
          ></div>
        )}
      </div>
    </div>
  );
}
