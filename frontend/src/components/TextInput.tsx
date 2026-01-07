import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
}: TextInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={name} className='text-sm font-bold text-yellow-300 pixel-font tracking-wide'>
        {label} {required && <span className='text-red-400'>*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className='px-3 py-2 bg-gray-900 border-4 border-yellow-400 text-yellow-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 font-mono text-sm'
        style={{imageRendering: 'pixelated'}}
      />
    </div>
  );
}
