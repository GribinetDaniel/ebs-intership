import React from "react";
import { useFetchCities } from "../../hooks/useFetchCities";
import { Input } from "../Input";
import "./index.scss";
import "../../index.css";

export interface AutocompleteProps {
 value: string;
 placeholder?: string;
 setValue: (value: string) => void;
}

export function Autocomplete({
 placeholder,
 value,
 setValue,
}: AutocompleteProps) {
 const { uniqueCities } = useFetchCities();
 const [isOpen, setIsOpen] = React.useState(false);
 const [city, setCity] = React.useState(value);

 let matchingCities = uniqueCities.filter(element => {
  return element.toUpperCase().includes(city.toUpperCase());
 });
 const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setCity(event.target.value);
  setValue(event.target.value);
 };
 const cityClicked = (event: React.MouseEvent) => {
  const element = event.target as HTMLElement;
  setValue(element.textContent!);
  setCity(element.textContent!);
  setIsOpen(false);
 };

 return (
  <div className="cityInput">
   <Input
    label="City"
    value={city}
    type="text"
    onClick={() => setIsOpen(true)}
    onChange={handleInput}
    placeholder={placeholder}
   />
   {isOpen && city && (
    <div className="suggestions">
     {matchingCities?.map(city => (
      <div className="suggestion" onClick={cityClicked}>
       {city}
      </div>
     ))}
    </div>
   )}
  </div>
 );
}
