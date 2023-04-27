import React from "react";
import { FieldError, Path, UseFormRegister } from "react-hook-form";
import { User, Post } from "../../types";
import { ErrorMessage } from "../ErrorMessage";

type InputFormProps = {
 register: UseFormRegister<Post>;
 required?: boolean;
 error?: FieldError | undefined;
 name: Path<Post>;
 errorMessage?: string;
 disabled?: boolean;
 type?: string;
 style?: any;
 onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputForm({
 register,
 required,
 error,
 name,
 errorMessage,
 disabled,
 style,
 type,
 onChange,
}: InputFormProps) {
 let className = "input";
 error && (className += " error");
 return (
  <>
   <input
    {...register(name, { required })}
    className={className}
    disabled={disabled}
    style={style}
    type={type}
    onChange={onChange}
   />
   {error && <ErrorMessage error={errorMessage} />}
  </>
 );
}
