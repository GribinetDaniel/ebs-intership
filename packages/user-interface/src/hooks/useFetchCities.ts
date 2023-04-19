import { useQuery } from "react-query";
import axios from "axios";
import _ from "lodash";

export function useFetchCities() {
 const { data } = useQuery("cities", () => {
  return axios.get("https://main-api.posta.md/nomenclatures/cities");
 });

 let cities: Array<{ name: string; region: string }> = [];

 data?.data.results.map((elem: any) => {
  cities.push({ name: elem.name, region: elem.region.name });
 });

 const uniqueCities = _.uniqBy(cities, "name");

 return {
  uniqueCities,
 };
}
