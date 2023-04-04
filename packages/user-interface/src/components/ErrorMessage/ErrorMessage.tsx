import React from 'react';
import './index.scss';
export interface ErrorMessageProps {
  error?: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return <p className='error-message'>{error}</p>;
}
