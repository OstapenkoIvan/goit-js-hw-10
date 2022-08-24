import './css/styles.css';
import CountriesApiService from './fetchCountries.js';
import lodash from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const countriesApiService = new CountriesApiService();

refs.searchEl.addEventListener('input', lodash(searchCountry, 300));

function searchCountry(evt) {
  let name = evt.target.value.trim();

  if (!name) {
    clearHtml();
    return;
  }

  countriesApiService
    .fetchCountries(name)
    // .then(obj => console.log(obj))
    .then(obj => addCountries(obj))
    .catch(error => noCountryAlert());
}

function addCountries(obj) {
  if (obj.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  clearHtml();

  if (obj.length >= 2 && obj.length < 10) {
    addSmallCountryNames(obj);
  }

  if (obj.length === 1) {
    addLargeCountryName(obj);
  }
}

function clearHtml() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function noCountryAlert() {
  Notify.failure('There is no such country');
  return;
}

function addSmallCountryNames(arr) {
  arr.map(({ flags: { svg }, name: { official } }) =>
    refs.countryList.insertAdjacentHTML(
      'beforeend',
      `<li class="thumb thumb__margin"><img class='flag-img' src=${svg} alt="Country flag" width="40px"><span>${official}</span></li>`
    )
  );
}

function addLargeCountryName(arr) {
  const countryCapital = arr[0].capital.join('');
  const countryName = arr[0].name.official;
  const countryFlag = arr[0].flags.svg;
  const countryPopulation = arr[0].population;
  const countryLanguages = Object.values(arr[0].languages).join(', ');

  refs.countryList.innerHTML = `<li><div class="thumb thumb__large-margin"><img class='flag-img' src=${countryFlag} alt="Country flag" width="40px"><span class='country-name'>${countryName}</span></div>
  <p class="main-text">Capital: <span class="secondary-text">${countryCapital}</span></p>
  <p class="main-text">Population: <span class="secondary-text">${countryPopulation}</span></p>
  <p class="main-text">Languages: <span class="secondary-text">${countryLanguages}</span></p></li>`;
}
