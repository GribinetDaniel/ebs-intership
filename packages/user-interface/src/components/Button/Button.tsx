import React from 'react';
import './index.scss';
interface ButtonProps {
  text: string;
  type: string;
  style?: any;
  onClick?: (e: React.SyntheticEvent) => void;
}

export function Button({ text, type, onClick, style }: ButtonProps) {
  let className = 'button';
  if (type) className += ` button--${type}`;
  return (
    <button className={className} style={style} onClick={onClick}>
      {text}
    </button>
  );
}
