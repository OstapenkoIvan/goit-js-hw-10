export default class CountriesApiService {
  constructor() {}

  // async fetchCountries(name) {
  //   try {
  //     const response = await fetch(
  //       `https://restcountries.com/v3.1/name/${name}?fields=languages,name,capital,population,flags`
  //     );
  //     const parsed = await this.responseParse(response);
  //     return parsed;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // responseParse(data) {
  //   if (!data.ok) {
  //     throw new Error();
  //   }
  //   return data.json();
  // }

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
