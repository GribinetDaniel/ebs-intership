import { useFetchCities } from '../../hooks/useFetchCities';
import './index.scss';
import '../../index.css';

export interface AutocompleteProps {
  className?: string;
  cityInput: any;
  // onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Autocomplete({ className, cityInput }: AutocompleteProps) {
  const { uniqueCities } = useFetchCities();
  function autocomplete() {
    let input = document.getElementById('cityInput') as HTMLInputElement;
    let div = document.getElementById('cityDiv');
    input?.addEventListener('input', function (this: any) {
      closeList();

      if (!this.value) return;

      let suggestions = document.createElement('div');
      suggestions.setAttribute('id', 'suggestions');
      div?.appendChild(suggestions);

      for (let i = 0; i < uniqueCities.length; i++) {
        if (uniqueCities[i].toUpperCase().includes(input.value.toUpperCase())) {
          let suggestion = document.createElement('div');
          suggestion.setAttribute('id', 'sugestion');
          suggestion.innerHTML = uniqueCities[i];
          suggestion.addEventListener('click', function () {
            cityInput(suggestion.innerHTML);
            input!.value = suggestion.innerHTML;
            closeList();
          });
          suggestion.style.cursor = 'pointer';
          suggestions.appendChild(suggestion);
        }
      }

      function closeList() {
        let suggestions = document.getElementById('suggestions');
        if (suggestions) suggestions?.parentNode?.removeChild(suggestions);
      }
    });
  }
  autocomplete();
  return (
    <div id='cityDiv'>
      <input type='text' className={className} id='cityInput' />
    </div>
  );
}
