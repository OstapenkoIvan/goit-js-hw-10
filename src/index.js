import './css/styles.css';
import CountriesApiService from './css/fetchCountries.js';
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

function addSmallCountryNames(obj) {
  for (let country of obj) {
    refs.countryList.insertAdjacentHTML(
      'beforeend',
      `<li class="thumb thumb__margin"><img class='flag-img' src=${country.flags.svg} alt="Country flag" width="40px"><span>${country.name.official}</span></li>`
    );
  }
  return;
}

function addLargeCountryName(obj) {
  for (let {
    flags: { svg },
    name: { official },
    capital,
    population,
    languages,
  } of obj) {
    refs.countryList.insertAdjacentHTML(
      'beforeend',
      `<li><div class="thumb thumb__large-margin"><img class='flag-img' src=${svg} alt="Country flag" width="40px"><span class='country-name'>${official}</span></div>
      <p class="main-text">Capital: <span class="secondary-text">${capital}</span></p>
      <p class="main-text">Population: <span class="secondary-text">${population}</span></p>
      <p class="main-text">Languages: <span class="secondary-text">${Object.values(
        languages
      )}</span></p></li>
      `
    );
  }
}
