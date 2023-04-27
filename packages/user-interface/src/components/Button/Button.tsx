import React from "react";
import "./index.scss";
interface ButtonProps {
 type?: string;
 style?: any;
 onClick?: (e: React.SyntheticEvent) => void;
 children: React.ReactNode;
 disabled?: boolean;
}

export function Button({
 type,
 onClick,
 style,
 children,
 disabled,
}: ButtonProps) {
 let className = "button";
 if (type) className += ` button--${type}`;
 if (disabled)
  children = (
   <div className="loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
   </div>
  );
 return (
  <button
   type="button"
   className={className}
   style={style}
   onClick={onClick}
   disabled={disabled}
  >
   {children}
  </button>
 );
}
