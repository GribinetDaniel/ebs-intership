import { ErrorMessage } from '../ErrorMessage';
import './index.scss';

export interface InputProps {
  type?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  label?: string;
  classNameLabel?: string;
}

export function Input({
  type,
  id,
  value,
  placeholder,
  name,
  onChange,
  className,
  errors,
  label,
  classNameLabel,
}: InputProps) {
  errors && (className += ' error');
  return (
    <div>
      <label className={classNameLabel}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        name={name}
        className={className}
        onChange={onChange}
      />
      {errors && <ErrorMessage error={errors} />}
    </div>
  );
}
