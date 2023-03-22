import { useQuery } from 'react-query';
import axios from 'axios';

export function useFetchCities() {
  const { data } = useQuery('cities', () => {
    return axios.get('https://main-api.posta.md/nomenclatures/cities');
  });

  let cities: Array<any> = [];

  data?.data.results.map((elem: any) => cities.push(elem.name));
  const uniqueCities = cities.filter((item, pos) => {
    return cities.indexOf(item) == pos;
  });

  return {
    uniqueCities,
  };
}
