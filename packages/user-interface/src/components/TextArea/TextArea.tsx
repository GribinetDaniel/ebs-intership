import React from "react";
import { ErrorMessage } from "../ErrorMessage";
import "./index.scss";

interface TextAreaProps {
 error?: string;
 value?: string;
 name: string;
 disabled?: boolean;
 onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({
 error,
 value,
 name,
 disabled,
 onChange,
}: TextAreaProps) {
 let className = "textarea";
 if (error) className += " error";

 return (
  <>
   <textarea
    name={name}
    onChange={onChange}
    className={className}
    value={value}
    disabled={disabled}
   ></textarea>
   {error && <ErrorMessage error={error} />}
  </>
 );
}
