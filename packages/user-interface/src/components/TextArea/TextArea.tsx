import React from 'react';
import './index.scss';

export function TextArea({ error, value, className, name, onChange }: any) {
  if (error) className += ' error';

  return (
    <textarea
      name={name}
      onChange={onChange}
      className={className}
      value={value}
    ></textarea>
  );
}
