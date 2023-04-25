import React from 'react';
import './index.scss';
interface ButtonProps {
  text: string;
  type: string;
  style?: any;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ text, type, onClick, style, disabled }: ButtonProps) {
  let className = 'button';
  if (type) className += ` button--${type}`;
  return (
    <button
      className={className}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? (
        <div className='loading'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        text
      )}
    </button>
  );
}
