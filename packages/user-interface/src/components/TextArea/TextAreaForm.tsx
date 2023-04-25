import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import { Post } from '../../types';
import { ErrorMessage } from '../ErrorMessage';
import './index.scss';

interface TextAreaFormProps {
  register: UseFormRegister<Post>;
  required: boolean;
  error: FieldError | undefined;
  name: Path<Post>;
  errorMessage: string;
}

export function TextAreaForm({
  register,
  required,
  error,
  errorMessage,
  name,
}: TextAreaFormProps) {
  let className = 'textarea';
  error && (className += ' error');
  return (
    <div>
      <textarea
        {...register(name, { required })}
        className={className}
      ></textarea>
      {error && <ErrorMessage error={errorMessage} />}
    </div>
  );
}
