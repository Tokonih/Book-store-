import React from 'react';

// If InputWithValidationProps is defined in another file, import it instead of redefining
export interface InputWithValidationProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  message?: string;
  isFocused?: boolean;
  handleSubmit: number;
  isNewPassword: boolean;
}

export default function InputWithValidation({
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  message,
  isFocused,
  handleSubmit,
  isNewPassword,
}: InputWithValidationProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {id[0].toUpperCase() + id.slice(1)}
      </label>
      <input
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 ${
          message ? 'border-red-700' : 'focus:ring-green-600 focus:border-green-600'
        }`}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={isFocused}
      />
     
      {message && <p className="text-sm text-red-700 mt-1">{message}</p>}
    </div>
  );
}
