import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import _debounce from 'lodash.debounce';

const inputEl = document.getElementById('search-box');
const searchListEl = document.querySelector('.country-list');
const infoDivEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', _debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  const searchRequest = e.target.value.trim();
  if (!searchRequest) {
    searchListEl.innerHTML = '';
    infoDivEl.innerHTML = '';
  } else {
    fetchCountries(searchRequest);
    searchListEl.innerHTML = 'Some country list';
    infoDivEl.innerHTML = 'Some info about ech country';
  }
}
