import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}

export function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  disabled = false,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={name} className='text-sm font-bold text-yellow-300 pixel-font tracking-wide'>
        {label} {required && <span className='text-red-400'>*</span>}
      </label>
      <div className='relative flex items-center w-full'>
        <input
          id={name}
          type={isPasswordField && showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className='w-full px-3 py-2 bg-gray-900 border-4 border-yellow-400 text-yellow-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed pr-10'
          style={{imageRendering: 'pixelated'}}
        />
        {isPasswordField && (
          <button
            type='button'
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 text-yellow-400 hover:text-yellow-300 focus:outline-none'
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
