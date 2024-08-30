'use client'
import React from 'react';
import { Input } from '@nextui-org/react';

interface PostSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PostSearchInput: React.FC<PostSearchInputProps> = ({ value, onChange }) => {
  return (
    <Input
      isClearable
      fullWidth
      color='secondary'
      placeholder='Buscar por título...'
      value={value}
      className='mb-4'
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default PostSearchInput;
