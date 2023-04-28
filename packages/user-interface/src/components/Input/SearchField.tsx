import React, { MutableRefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import { Button } from "../Button";

interface SearchFieldProps {
 setInputText: (value: string) => void;
}

export function SearchField({ setInputText }: SearchFieldProps) {
 const [isOpen, setIsOpen] = React.useState(false);
 const input = React.useRef() as MutableRefObject<HTMLInputElement>;

 const onIconClick = (e: React.MouseEvent) => {
  setIsOpen(isOpen ? false : true);
  input.current.style.width = isOpen ? "250px" : "44px";
  if (isOpen) input.current.focus();
 };

 let timer = React.useRef<NodeJS.Timeout>();
 const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  clearTimeout(timer.current);
  timer.current = setTimeout(() => {
   setInputText(e.target.value);
  }, 1000);
 };

 return (
  <div className="search-field">
   <input
    type="text"
    className="search-field__input"
    ref={input}
    onChange={onInputChange}
   />
   <div className="search-field__icon" onClick={onIconClick}>
    <FontAwesomeIcon icon={faMagnifyingGlass} />
   </div>
  </div>
 );
}
