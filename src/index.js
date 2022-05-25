import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import _debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const infoDivEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', _debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  const searchRequest = e.target.value.trim();
  if (!searchRequest) {
    countryListEl.innerHTML = '';
    infoDivEl.innerHTML = '';
  } else {
    fetchCountries(searchRequest)
      .then(data => {
        if (data.length > 10) {
          countryListEl.innerHTML = '';
          infoDivEl.innerHTML = '';
          return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
          if (data.length >= 2) {
            countryListEl.innerHTML = '';
            infoDivEl.innerHTML = '';

            const listMarkup = makeListMarkup(data);
            countryListEl.insertAdjacentHTML('beforeend', listMarkup);
          } else {
            countryListEl.innerHTML = '';
            infoDivEl.innerHTML = '';

            const divMarkup = makeDivMarkup(data);
            infoDivEl.insertAdjacentHTML('beforeend', divMarkup);
          }
        }
      })
      .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
  }
}

function makeListMarkup(array) {
  return array
    .map(country => {
      const flag = country.flags.svg;
      const name = country.name.official;

      return `<li class="list-item"><img src=${flag} alt="flag of ${name}" width="40" height="40">${name}</li>`;
    })
    .join('');
}

function makeDivMarkup(array) {
  const country = array[0];

  const flag = country.flags.svg;
  const name = country.name.official;
  const capital = country.capital.join(', ');
  const languages = Object.values(country.languages).join(', ');
  const population = country.population;

  const markup = `
      <h1 class="country-name"><img src=${flag} alt="flag of ${name}" width="60" height="60">${name}</h1>
      <p class="country-descr"><span class="country-index">Capital: </span>${capital}</p>
      <p class="country-descr"><span class="country-index">Population: </span>${population}</p>
      <p class="country-descr"><span class="country-index">Languages: </span>${languages}</p>`;
  return markup;
}
