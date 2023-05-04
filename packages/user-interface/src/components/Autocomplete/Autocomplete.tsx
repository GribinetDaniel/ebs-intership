import React from "react";
import { useFetchCities } from "../../hooks/useFetchCities";
import { Input } from "../Input";
import _ from "lodash";
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
  return element.name.toUpperCase().includes(city.toUpperCase());
 });

 let regions = matchingCities.map(elem => elem.region);
 regions = regions.filter((item, pos) => {
  return regions.indexOf(item) === pos;
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
   {isOpen && (
    <div className="suggestions">
     {regions.map(region => (
      <>
       <div className="region">{region}</div>
       {matchingCities.map(
        elem =>
         elem.region === region && (
          <div className="suggestion" onClick={cityClicked}>
           {elem.name}
          </div>
         )
       )}
      </>
     ))}
    </div>
   )}
  </div>
 );
}
