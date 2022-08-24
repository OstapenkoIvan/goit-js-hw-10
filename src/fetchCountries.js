export default class CountriesApiService {
  constructor() {}

  fetchCountries(name) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=languages,name,capital,population,flags`
    ).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
  }
}
