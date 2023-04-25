import React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import './index.scss';

interface TextAreaProps {
  error: string;
  value?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ error, value, name, onChange }: TextAreaProps) {
  let className = 'textarea';
  if (error) className += ' error';

  return (
    <>
      <textarea
        name={name}
        onChange={onChange}
        className={className}
        value={value}
      ></textarea>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
