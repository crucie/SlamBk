import React from 'react';

interface TextAreaInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

export function TextAreaInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
}: TextAreaInputProps) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <label htmlFor={name} className='text-sm font-bold text-yellow-300 pixel-font tracking-wide'>{label}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className='px-3 py-2 bg-gray-900 border-4 border-yellow-400 text-yellow-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 font-mono text-sm resize-vertical'
        style={{imageRendering: 'pixelated'}}
      />
    </div>
  );
}
