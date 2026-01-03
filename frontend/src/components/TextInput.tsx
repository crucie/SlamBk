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
    <div className='form-group'>
      <label htmlFor={name}>
        {label} {required && <span className='required'>*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className='form-input'
      />
    </div>
  );
}
