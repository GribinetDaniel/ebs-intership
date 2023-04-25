import React from "react";
import { ErrorMessage } from "../ErrorMessage";
import "./index.scss";

export interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  label?: string;
  disabled?: boolean;
}

export function Input({
  type,
  value,
  placeholder,
  name,
  onChange,
  errors,
  label,
  disabled,
}: InputProps) {
  let className = 'input';
  errors && (className += ' error');
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        className={className}
        onChange={onChange}
        disabled={disabled}
      />
      {errors && <ErrorMessage error={errors} />}
    </div>
  );
}
