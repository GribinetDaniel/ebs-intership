import React from 'react';
import { useFetchCities } from '../../hooks/useFetchCities';
import './index.scss';
import '../../index.css';

export interface AutocompleteProps {
  className?: string;
  cityInput: (value: string) => void;
}

export function Autocomplete({ className, cityInput }: AutocompleteProps) {
  const { uniqueCities } = useFetchCities();
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  let matchingCities = uniqueCities.filter((element) => {
    return element.toUpperCase().includes(input.toUpperCase());
  });
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const cityClicked = (event: React.MouseEvent<HTMLInputElement>) => {
    const element = event.target as HTMLElement;
    cityInput(element.textContent!);
    setInput(element.textContent!);
    setIsOpen(false);
  };

  return (
    <div id='cityInput'>
      <input
        value={input}
        type='text'
        className={className}
        id='cityInput'
        onClick={() => setIsOpen(true)}
        onChange={handleInput}
      />
      {isOpen && input && (
        <div className='suggestions'>
          {matchingCities?.map((city) => (
            <div className='suggestion' onClick={cityClicked}>
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
