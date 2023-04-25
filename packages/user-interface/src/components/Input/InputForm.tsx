import React from 'react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import { User, Post } from '../../types';
import { ErrorMessage } from '../ErrorMessage';

type InputFormProps = {
  register: UseFormRegister<Post>;
  required: boolean;
  error: FieldError | undefined;
  name: Path<Post>;
  errorMessage: string;
};

export function InputForm({
  register,
  required,
  error,
  name,
  errorMessage,
}: InputFormProps) {
  let className = 'input';
  error && (className += ' error');
  return (
    <div>
      <input {...register(name, { required })} className={className} />
      {error && <ErrorMessage error={errorMessage} />}
    </div>
  );
}
