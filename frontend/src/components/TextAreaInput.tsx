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
    <div className='form-group full-width'>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className='form-textarea'
      />
    </div>
  );
}
